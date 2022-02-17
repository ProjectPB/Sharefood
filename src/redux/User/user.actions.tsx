import userTypes from "./user.types";
import { CurrentUser, Credentials } from "../../shared/types";

export const emailSignInStart = (userCredentials: Credentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user: CurrentUser) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const signUpUserStart = (userCredentials: Credentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const resetPasswordError = (error: {}) => ({
  type: userTypes.RESET_PASSWORD_ERRORS,
  payload: error,
});

export const resetPasswordStart = (userCredentials: Credentials) => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const signUpError = (error: string[]) => ({
  type: userTypes.SIGN_UP_ERROR,
  payload: error,
});
