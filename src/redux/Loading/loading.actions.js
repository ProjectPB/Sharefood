import loadingTypes from "./loading.types";

export const loadHomepage = () => ({
  type: loadingTypes.LOAD_HOMEPAGE,
});

export const loadRecipes = (state) => ({
  type: loadingTypes.LOAD_RECIPES,
  payload: state,
});
