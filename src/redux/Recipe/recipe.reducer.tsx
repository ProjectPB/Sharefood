import recipeTypes from "./recipe.types";
import { Comments, RecipeData } from "../../shared/types";

const INITIAL_STATE: { recipeData: RecipeData, comments: Comments } = {
  recipeData: null,
  comments: {
    data: [],
    queryDoc: null,
    isLastPage: false,
    amount: 0,
  }
};

const recipeReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case recipeTypes.SET_RECIPE_DATA:
      return {
        ...state,
        recipeData: action.payload,
      }
    case recipeTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }
    case recipeTypes.ADD_STORE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          amount: state.comments.amount + 1,
          data: [{
            id: action.payload.commentId,
            data: action.payload
          }, ...state.comments.data]
        },
      }
    default:
      return state;
  }
};

export default recipeReducer;
