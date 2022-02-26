import recipesTypes from "./recipes.types";
import { Filters, NewRecipeData, RecipeData, Recipes } from "../../shared/types";

export const createRecipeStart = (data: NewRecipeData) => ({
  type: recipesTypes.CREATE_RECIPE,
  payload: data,
});

export const fetchRecipesStart = (filters: Filters) => ({
  type: recipesTypes.FETCH_RECIPES,
  payload: filters,
});

export const setRecipes = (recipes: Recipes) => ({
  type: recipesTypes.SET_RECIPES,
  payload: recipes,
});

export const fetchRecipeDataStart = (ID: { recipeId: string, userId: string }) => ({
  type: recipesTypes.FETCH_RECIPE_DATA,
  payload: ID,
})

export const setRecipeData = (data: RecipeData) => ({
  type: recipesTypes.SET_RECIPE_DATA,
  payload: data,
})

export const likeRecipeStart = (ID: { userId: string, recipeId: string, data: RecipeData }) => ({
  type: recipesTypes.LIKE_RECIPE,
  payload: ID,
})

export const dislikeRecipeStart = (ID: { userId: string, recipeId: string, data: RecipeData }) => ({
  type: recipesTypes.DISLIKE_RECIPE,
  payload: ID,
})