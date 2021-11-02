import recipesTypes from "./recipes.types";

export const fetchRecipesStart = (filters = {}) => ({
  type: recipesTypes.FETCH_RECIPES,
  payload: filters,
});

export const setRecipes = (recipes) => ({
  type: recipesTypes.SET_RECIPES,
  payload: recipes,
});

export const fetchRecipeData = (id) => ({
  type: recipesTypes.FETCH_RECIPE_DATA,
  payload: id,
});

export const setRecipeData = (data) => ({
  type: recipesTypes.SET_RECIPE_DATA,
  payload: data,
});
