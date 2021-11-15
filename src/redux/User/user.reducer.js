import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signUpErrors: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
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
