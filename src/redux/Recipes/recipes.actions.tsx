import recipesTypes from "./recipes.types";
import { Filters, NewRecipeData, RecipeData, SingleRecipes } from "../../shared/types";

export const createRecipeStart = (data: NewRecipeData) => ({
  type: recipesTypes.CREATE_RECIPE,
  payload: data,
});

export const fetchRecipesStart = (filters: Filters) => ({
  type: recipesTypes.FETCH_RECIPES,
  payload: filters,
});

export const setQueryRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_QUERY_RECIPES,
  payload: recipes,
});

export const setMainRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_MAIN_RECIPES,
  payload: recipes,
});

export const setPopularRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_POPULAR_RECIPES,
  payload: recipes,
});

export const setMyRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_MY_RECIPES,
  payload: recipes,
});

export const setFavoriteRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_FAVORITE_RECIPES,
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

export const resetRecipes = () => ({
  type: recipesTypes.RESET_RECIPES,
})