import recipeTypes from "./recipe.types";
import { Comments, RecipeData } from "../../shared/types";

const INITIAL_STATE: { recipeData: RecipeData, comments: Comments } = {
  recipeData: null,
  comments: {
    data: [],
    queryDoc: null,
    isLastPage: false,
  }
};

const recipeReducer = (state = INITIAL_STATE, action: { type: string; payload: RecipeData }) => {
  switch (action.type) {
    case recipeTypes.SET_RECIPE_DATA:
      return {
        ...state,
        recipeData: action.payload
      }
    case recipeTypes.ADD_COMMENT:
      return {
        ...state,
        comments: { ...state.comments, data: [...state.comments.data, action.payload] }
      }
    default:
      return state;
  }
};

export default recipeReducer;
