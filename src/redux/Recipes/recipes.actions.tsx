import recipesTypes from "./recipes.types";
import { Filters, NewRecipeData, State } from "../../shared/types";

export const fetchRecipesStart = (filters: Filters) => ({
  type: recipesTypes.FETCH_RECIPES,
  payload: filters,
});

export const setRecipes = (recipes: State["recipes"]) => ({
  type: recipesTypes.SET_RECIPES,
  payload: recipes,
});

export const createRecipeStart = (data: NewRecipeData) => ({
  type: recipesTypes.CREATE_RECIPE,
  payload: data,
});
