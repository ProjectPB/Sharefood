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
  handleDeleteAccount,
  handleDeleteUserData,
  handleChangePassword,
  handleUpdateUsername,
} from "./user.helpers";
import {
  changePasswordStart,
  changeProfilePicStart,
  changeUsernameStart,
  checkUserSessionStart,
  deleteAccountError,
  deleteAccountStart,
  emailSignInStart,
  passwordError,
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
  usernameError,
} from "./user.actions";
import { loadAuth, loadDeleteAccount, loadProfilePic, loadUsername } from "../Loading/loading.actions";
import { resetRecipes, setFavoriteRecipes, setMyRecipes } from "../Recipes/recipes.actions";
import userTypes from "./user.types";

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
    // console.log(err);
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
    console.log(err);
    yield put(loadAuth(false));
    yield put(resetPasswordError(err));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* changePassword({ payload: { oldPassword, newPassword, handlePasswordChanged } }: ReturnType<typeof changePasswordStart>) {
  try {
    yield put(loadAuth(true));
    const result: string[] = yield handleChangePassword(oldPassword, newPassword);

    if (result.length > 0) {
      yield put(passwordError(result));
    }

    if (result.length === 0) {
      handlePasswordChanged();
      yield put(passwordError([]));
    }

    yield put(loadAuth(false));
  } catch (error) {
    yield put(loadAuth(false));
    alert(error.message);
  }
}

export function* onChangePasswordStart() {
  yield takeLatest(userTypes.CHANGE_PASSWORD_START, changePassword);
}

export function* changeProfilePic({ payload: { userId, profilePic } }: ReturnType<typeof changeProfilePicStart>) {
  try {
    yield put(loadProfilePic(true));
    const newPic: string = yield handleUpdateProfilePic(userId, profilePic);
    yield put(setProfilePic(newPic));
    yield put(loadProfilePic(false));
    yield put(resetRecipes());
  } catch (error) {
    yield put(loadProfilePic(false));
    alert(error.message);
  }
}

export function* onChangeProfilePicStart() {
  yield takeLatest(userTypes.CHANGE_PROFILE_PIC_START, changeProfilePic);
}

export function* changeUsername({ payload: { userId, username, handleUsernameChanged } }: ReturnType<typeof changeUsernameStart>) {
  try {
    yield put(loadUsername(true));

    const result: string[] = yield handleUpdateUsername(userId, username);
    if (result.length === 0) {
      yield put(setDisplayName(username));
      yield put(usernameError([]));
      handleUsernameChanged();
    } else {
      yield put(usernameError(result));
    }
    yield put(loadUsername(false));
    yield put(resetRecipes());
  } catch (error) {
    yield put(loadUsername(false));
    alert(error.message);
  }
}

export function* onChangeUsernameStart() {
  yield takeLatest(userTypes.CHANGE_USERNAME_START, changeUsername);
}

export function* deleteAccount({ payload }: ReturnType<typeof deleteAccountStart>) {
  try {
    yield put(loadDeleteAccount(true));
    yield handleDeleteAccount();
    yield handleDeleteUserData(payload);
    yield put(loadDeleteAccount(false));
    yield put(signOutUserStart());
    yield put(resetRecipes());
  } catch (error) {
    yield put(loadDeleteAccount(false));
    yield put(deleteAccountError([error.code]));
  }
}

export function* onDeleteAccountStart() {
  yield takeLatest(userTypes.DELETE_ACCOUNT_START, deleteAccount);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onCheckUserSessionStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
    call(onDeleteAccountStart),
    call(onChangePasswordStart),
    call(onChangeProfilePicStart),
    call(onChangeUsernameStart),
  ]);
}
