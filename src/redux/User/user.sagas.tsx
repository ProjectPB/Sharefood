import { takeLatest, call, all, put } from "redux-saga/effects";
import { auth, GoogleProvider } from "../../firebase/utils";
import {
  handleUserProfile,
  handleResetPasswordAPI,
  validateLogin,
  validateRegister,
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
import { loadAuth } from "../Loading/loading.actions";
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
  const errors: string[] = validateLogin(email, password);
  yield put(signUpError(errors));
  try {
    if (errors.length === 0) {
      yield put(loadAuth(true));
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield getSnapshotFromUserAuth(user);
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
  const errors: string[] = validateRegister(displayName, email, password, passwordConfirm);
  yield put(signUpError(errors));

  try {
    if (errors.length === 0) {
      yield put(loadAuth(true));
      const { user } = yield auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const additionalData = { displayName };
      yield getSnapshotFromUserAuth(user, additionalData);
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
    yield put(loadAuth(false));
  } catch (err) {
    yield put(loadAuth(false));
    yield put(resetPasswordError(err));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ]);
}
