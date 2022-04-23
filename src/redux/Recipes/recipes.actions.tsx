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

export const setScrollDistanceStart = (data: { distance: number, store: string }) => ({
  type: recipesTypes.SET_SCROLL_DISTANCE,
  payload: data,
})

export const setMainScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_MAIN_SCROLL_DISTANCE,
  payload: distance
})

export const setPopularScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_POPULAR_SCROLL_DISTANCE,
  payload: distance
})

export const setMyScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_MY_SCROLL_DISTANCE,
  payload: distance
})

export const setFavoriteScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_FAVORITE_SCROLL_DISTANCE,
  payload: distance
})

export const resetScrollDistancesStart = () => ({
  type: recipesTypes.RESET_SCROLL_DISTANCES,
})

export const setPopularFilter = (filter: string) => ({
  type: recipesTypes.SET_POPULAR_FILTER,
  payload: filter,
})

export const setRecentFilter = (filter: string) => ({
  type: recipesTypes.SET_RECENT_FILTER,
  payload: filter,
})