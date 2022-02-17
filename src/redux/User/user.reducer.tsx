import { Credentials, CurrentUser, State } from "../../shared/types";
import userTypes from "./user.types";

const INITIAL_STATE: State["user"] = {
  currentUser: null,
  signUpErrors: [],
  resetPasswordSuccess: false,
  resetPasswordErrors: [],
};

const userReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: Credentials | CurrentUser | string[] | {} }
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
    default:
      return state;
  }
};

export default userReducer;
