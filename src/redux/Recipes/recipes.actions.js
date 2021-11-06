import recipesTypes from "./recipes.types";

export const fetchRecipesStart = (filters = {}) => ({
  type: recipesTypes.FETCH_RECIPES,
  payload: filters,
});

export const setRecipes = (recipes) => ({
  type: recipesTypes.SET_RECIPES,
  payload: recipes,
});

export const createRecipeStart = (data) => ({
  type: recipesTypes.CREATE_RECIPE,
  payload: data,
});
