import recipesTypes from "./recipes.types";

const INITIAL_STATE = {
  recipes: [],
  recipeData: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recipesTypes.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case recipesTypes.SET_RECIPE_DATA:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
};

export default recipesReducer;
