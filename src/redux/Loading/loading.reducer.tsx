import loadingTypes from "./loading.types";
import { Loading } from "../../shared/types";

const INITIAL_STATE: Loading = {
  recipesLoaded: false,
  recipeDataLoaded: false,
  relatedRecipesLoaded: false,
  authLoading: false,
  homeRecentRecipesLoaded: false,
  homePopularRecipesLoaded: false,
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
    case loadingTypes.LOAD_HOME_RECENT_RECIPES:
      return {
        ...state,
        homeRecentRecipesLoaded: action.payload,
      };
    case loadingTypes.LOAD_HOME_POPULAR_RECIPES:
      return {
        ...state,
        homePopularRecipesLoaded: action.payload,
      }
    default:
      return state;
  }
};

export default loadingReducer;
