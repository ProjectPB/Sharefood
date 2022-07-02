import loadingTypes from "./loading.types";

export const loadRecipes = (state: boolean) => ({
  type: loadingTypes.LOAD_RECIPES,
  payload: state,
});

export const loadRecipeData = (state: boolean) => ({
  type: loadingTypes.LOAD_RECIPE_DATA,
  payload: state,
});

export const loadAuth = (state: boolean) => ({
  type: loadingTypes.LOAD_AUTH,
  payload: state,
});

export const loadRelatedRecipes = (state: boolean) => ({
  type: loadingTypes.LOAD_RELATED_RECIPES,
  payload: state,
})