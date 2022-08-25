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

export const addCommentStart = (data: { text: string, authorId: string, recipeId: string, profilePic: string, username: string }) => ({
  type: recipeTypes.ADD_COMMENT,
  payload: data,
})

export const addStoreCommentStart = (data: { text: string, authorId: string, profilePic: string, username: string, commentId: string }) => ({
  type: recipeTypes.ADD_STORE_COMMENT,
  payload: data,
})

export const fetchCommentsStart = (filters: any) => ({
  type: recipeTypes.FETCH_COMMENTS,
  payload: filters
})

export const setComments = (comments: any) => ({
  type: recipeTypes.SET_COMMENTS,
  payload: comments,
})