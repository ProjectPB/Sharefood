import { State } from "../../shared/types";
import userTypes from "./user.types";

const INITIAL_STATE: State["user"] = {
  currentUser: null,
  signUpErrors: [],
  passwordErrors: [],
  usernameErrors: [],
  resetPasswordErrors: [],
  deleteAccountErrors: [],
  resetPasswordSuccess: false,
};

const userReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.RESET_PASSWORD_ERRORS:
      return {
        ...state,
        resetPasswordErrors: action.payload,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpErrors: action.payload,
      };
    case userTypes.PASSWORD_ERROR:
      return {
        ...state,
        passwordErrors: action.payload,
      };
    case userTypes.DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        deleteAccountErrors: action.payload,
      };
    case userTypes.USERNAME_ERROR:
      return {
        ...state,
        usernameErrors: action.payload,
      };
    case userTypes.SET_DISPLAY_NAME:
      return {
        ...state,
        currentUser: {
          ...state.currentUser, displayName: action.payload,
        }
      };
    case userTypes.SET_PROFILE_PIC:
      return {
        ...state,
        currentUser: {
          ...state.currentUser, profilePic: action.payload,
        }
      };
    default:
      return state;
  }
};

export default userReducer;
