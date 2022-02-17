import loadingTypes from "./loading.types";
import { Loading } from "../../shared/types";

const INITIAL_STATE: Loading = {
  homepageLoaded: false,
  recipesLoaded: false,
  recipeDataLoaded: false,
  authLoading: false,
};

const loadingReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: boolean }
) => {
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
    case loadingTypes.LOAD_RECIPE_DATA:
      return {
        ...state,
        recipeDataLoaded: action.payload,
      };
    case loadingTypes.LOAD_AUTH:
      return {
        ...state,
        authLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
