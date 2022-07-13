import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth, GoogleProvider } from "../../firebase/utils";
import {
  handleUserProfile,
  handleResetPasswordAPI,
  validateLogin,
  validateRegister,
  updateUserData,
  checkCurrentUser,
  handleUpdateProfilePic,
} from "./user.helpers";
import {
  changeProfilePicStart,
  checkUserSessionStart,
  emailSignInStart,
  resetPasswordError,
  resetPasswordStart,
  resetPasswordSuccess,
  setDisplayName,
  setProfilePic,
  signInSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signUpError,
  signUpUserStart,
} from "./user.actions";
import { loadAuth, loadProfilePic } from "../Loading/loading.actions";
import userTypes from "./user.types";
import { setFavoriteRecipes, setMyRecipes } from "../Recipes/recipes.actions";

export function* fetchDataFromUserAuth(
  user: {},
  additionalData?: { displayName: string }
): any {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });

    const snapshot = yield userRef.get();

    yield put(
      signInSuccess({
        uid: snapshot.uid,
        ...snapshot.data(),
      })
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* checkUserSession({ payload }: ReturnType<typeof checkUserSessionStart>): any {
  try {
    const userAuth = yield checkCurrentUser();
    const userAuthData = { uid: userAuth.uid, displayName: userAuth.displayName, profilePic: userAuth.photoURL }
    const userPersistData = { uid: payload.uid, displayName: payload.displayName, profilePic: payload.profilePic }
    if (!userAuth) {
      yield put(signOutUserStart());
    }
    if (userAuthData.displayName && userAuthData.displayName !== userPersistData.displayName) {
      yield put(setDisplayName(userAuthData.displayName));
      yield updateUserData({ userId: userAuth.uid, key: 'displayName', value: userAuthData.displayName });
    }
    else if (userAuthData.profilePic && userAuthData.profilePic !== userPersistData.profilePic) {
      yield put(setProfilePic(userAuthData.profilePic));
      yield updateUserData({ userId: userAuth.uid, key: 'profilePic', value: userAuthData.profilePic });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onCheckUserSessionStart() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, checkUserSession);
}


export function* emailSignIn({
  payload: { email, password },
}: ReturnType<typeof emailSignInStart>) {
  const errors: string[] = validateLogin(email, password);
  if (errors.length > 0) { yield put(signUpError(errors)) };
  try {
    if (errors.length === 0) {
      yield put(loadAuth(true));
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield fetchDataFromUserAuth(user);
      yield put(loadAuth(false));
    }
  } catch (err) {
    errors.push(err.code);
    console.log(err.message);
    yield put(loadAuth(false));
    yield put(signUpError(errors));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* signUpUser({
  payload: { displayName, email, password, passwordConfirm },
}: ReturnType<typeof signUpUserStart>) {
  const errors: string[] = validateRegister(displayName, email, password, passwordConfirm);
  yield put(signUpError(errors));

  try {
    if (errors.length === 0) {
      yield put(loadAuth(true));
      const { user } = yield auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const additionalData = { displayName: displayName };
      yield fetchDataFromUserAuth(user, additionalData);
      yield put(loadAuth(false));
    }
  } catch (err) {
    errors.push(err.code);
    yield put(signUpError(errors));
    yield put(loadAuth(false));
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield fetchDataFromUserAuth(user);
  } catch (err) {
    // console.log(err.message);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
    yield put(setMyRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
    yield put(setFavoriteRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
  } catch (err) {
    // console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* resetPassword({
  payload: { email },
}: ReturnType<typeof resetPasswordStart>) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
    yield put(loadAuth(false));
  } catch (err) {
    yield put(loadAuth(false));
    yield put(resetPasswordError(err));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* changeProfilePic({ payload: { userId, profilePic } }: ReturnType<typeof changeProfilePicStart>) {
  try {
    yield put(loadProfilePic(true));
    const newPic: string = yield handleUpdateProfilePic(userId, profilePic);
    yield put(setProfilePic(newPic));
    yield put(loadProfilePic(false));
  } catch (error) {
    console.log(error);
  }
}

export function* onChangeProfilePicStart() {
  yield takeLatest(userTypes.CHANGE_PROFILE_PIC_START, changeProfilePic);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onCheckUserSessionStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
    onChangeProfilePicStart(),
  ]);
}
