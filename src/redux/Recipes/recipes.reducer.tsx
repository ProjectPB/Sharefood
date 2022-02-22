import recipesTypes from "./recipes.types";
import { Recipes } from "../../shared/types";

const INITIAL_STATE: Recipes = {
  data: [],
  queryDoc: null,
  isLastPage: false,
};

const recipesReducer = (state = INITIAL_STATE, action: { type: string; payload: Recipes }) => {
  switch (action.type) {
    case recipesTypes.SET_RECIPES:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default recipesReducer;
