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

export const checkUserSessionStart = (userData: CurrentUser) => ({
  type: userTypes.CHECK_USER_SESSION,
  payload: userData,
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

export const deleteAccountError = (error: string[]) => ({
  type: userTypes.DELETE_ACCOUNT_ERROR,
  payload: error,
});

export const usernameError = (error: string[]) => ({
  type: userTypes.USERNAME_ERROR,
  payload: error,
});

export const passwordError = (error: string[]) => ({
  type: userTypes.PASSWORD_ERROR,
  payload: error,
});

export const setDisplayName = (displayName: string) => ({
  type: userTypes.SET_DISPLAY_NAME,
  payload: displayName,
})

export const setProfilePic = (profilePic: string) => ({
  type: userTypes.SET_PROFILE_PIC,
  payload: profilePic,
})

export const changeProfilePicStart = (data: { userId: string, profilePic: File }) => ({
  type: userTypes.CHANGE_PROFILE_PIC_START,
  payload: data,
})

export const deleteAccountStart = (id: string) => ({
  type: userTypes.DELETE_ACCOUNT_START,
  payload: id,
})

export const changePasswordStart = (config: { oldPassword: string, newPassword: string, handlePasswordChanged: () => void }) => ({
  type: userTypes.CHANGE_PASSWORD_START,
  payload: config,
})

export const changeUsernameStart = (config: { userId: string, username: string, handleUsernameChanged: () => void }) => ({
  type: userTypes.CHANGE_USERNAME_START,
  payload: config,
})