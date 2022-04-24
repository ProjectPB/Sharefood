import recipeTypes from './recipe.types';
import { NewRecipeData, RecipeData } from "../../shared/types";

export const createRecipeStart = (data: NewRecipeData) => ({
  type: recipeTypes.CREATE_RECIPE,
  payload: data,
});

export const fetchRecipeDataStart = (ID: { recipeId: string, userId: string }) => ({
  type: recipeTypes.FETCH_RECIPE_DATA,
  payload: ID,
})

export const setRecipeData = (data: RecipeData) => ({
  type: recipeTypes.SET_RECIPE_DATA,
  payload: data,
})

export const likeRecipeStart = (ID: { userId: string, recipeId: string, data: RecipeData }) => ({
  type: recipeTypes.LIKE_RECIPE,
  payload: ID,
})

export const dislikeRecipeStart = (ID: { userId: string, recipeId: string, data: RecipeData }) => ({
  type: recipeTypes.DISLIKE_RECIPE,
  payload: ID,
})

export const viewRecipeStart = (ID: { recipeId: string, data: RecipeData }) => ({
  type: recipeTypes.VIEW_RECIPE,
  payload: ID
})