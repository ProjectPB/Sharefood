import recipeTypes from "./recipe.types";
import { RecipeData } from "../../shared/types";

const INITIAL_STATE: { recipeData: RecipeData } = {
  recipeData: null,
};

const recipeReducer = (state = INITIAL_STATE, action: { type: string; payload: RecipeData }) => {
  switch (action.type) {
    case recipeTypes.SET_RECIPE_DATA:
      return {
        ...state,
        recipeData: action.payload
      }
    default:
      return state;
  }
};

export default recipeReducer;
