import recipesTypes from "./recipes.types";
import { Recipes } from "../../shared/types";

const INITIAL_STATE: Recipes = {
  recipes: {
    data: [],
    queryDoc: null,
    isLastPage: false,
  },
  recipeData: undefined,
};

const recipesReducer = (state = INITIAL_STATE, action: { type: string; payload: Recipes }) => {
  switch (action.type) {
    case recipesTypes.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case recipesTypes.SET_RECIPE_DATA:
      return {
        ...state,
        recipeData: action.payload
      }
    default:
      return state;
  }
};

export default recipesReducer;
