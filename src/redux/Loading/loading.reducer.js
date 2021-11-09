import loadingTypes from "./loading.types";

const INITIAL_STATE = {
  homepageLoaded: false,
  recipesLoaded: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loadingTypes.LOAD_HOMEPAGE:
      return {
        ...state,
        homepageLoaded: true,
      };
    case loadingTypes.LOAD_RECIPES:
      return {
        ...state,
        recipesLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
