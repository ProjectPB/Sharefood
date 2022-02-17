import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth, GoogleProvider } from "../../firebase/utils";
import {
  handleUserProfile,
  getCurrentUser,
  handleResetPasswordAPI,
} from "./user.helpers";
import {
  emailSignInStart,
  resetPasswordError,
  resetPasswordStart,
  resetPasswordSuccess,
  signInSuccess,
  signOutUserSuccess,
  signUpError,
  signUpUserStart,
} from "./user.actions";
import { loadAuth, loadHomepage } from "../Loading/loading.actions";
import userTypes from "./user.types";

export function* getSnapshotFromUserAuth(
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

export function* emailSignIn({
  payload: { email, password },
}: ReturnType<typeof emailSignInStart>) {
  const errors = [];
  try {
    yield put(loadAuth(true));
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
    yield put(loadAuth(false));
  } catch (err) {
    errors.push(err.message);
    yield put(loadAuth(false));
    yield put(signUpError(errors));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated(): any {
  try {
    const userAuth: any = yield getCurrentUser();
    yield getSnapshotFromUserAuth(userAuth);
    yield put(loadHomepage());
  } catch (err) {
    // console.log(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    // console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
  payload: { displayName, email, password, passwordConfirm },
}: ReturnType<typeof signUpUserStart>) {
  const errors = [];
  if (displayName.length > 12 || displayName.length < 4) {
    errors.push("Username does not match requirements.");
    yield put(signUpError(errors));
  }
  if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")) {
    errors.push("Invalid email.");
    yield put(signUpError(errors));
  }
  if (
    !password.match(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
  ) {
    errors.push("Password does not match requirements.");
    yield put(signUpError(errors));
  }
  if (password !== passwordConfirm) {
    errors.push("Passwords do not match.");
    yield put(signUpError(errors));
  }

  try {
    if (errors.length === 0) {
      const { user } = yield auth.createUserWithEmailAndPassword(
        email,
        password
      );
      yield put(loadAuth(true));
      const additionalData = { displayName };
      yield getSnapshotFromUserAuth(user, additionalData);
      yield put(loadAuth(false));
    }
  } catch (err) {
    errors.push(err.message);
    yield put(signUpError(errors));
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    // console.log(err.message);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* resetPassword({
  payload: { email },
}: ReturnType<typeof resetPasswordStart>) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
  } catch (err) {
    yield put(resetPasswordError(err));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ]);
}
