import recipesTypes from "./recipes.types";

const INITIAL_STATE = {
  recipes: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recipesTypes.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
};

export default recipesReducer;
