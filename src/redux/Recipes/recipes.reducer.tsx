import recipesTypes from "./recipes.types";
import { Recipe, State } from "../../shared/types";

const INITIAL_STATE: { recipes: Recipe[] } = {
  recipes: [],
};

const recipesReducer = (state = INITIAL_STATE, action: { type: string; payload: State["recipes"] }) => {
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
