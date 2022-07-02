import loadingTypes from "./loading.types";
import { Loading } from "../../shared/types";

const INITIAL_STATE: Loading = {
  recipesLoaded: false,
  recipeDataLoaded: false,
  relatedRecipesLoaded: false,
  authLoading: false,
};

const loadingReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: boolean }
) => {
  switch (action.type) {
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
    case loadingTypes.LOAD_RELATED_RECIPES:
      return {
        ...state,
        relatedRecipesLoaded: action.payload,
      }
    default:
      return state;
  }
};

export default loadingReducer;
