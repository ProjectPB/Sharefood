import recipesTypes from "./recipes.types";
import { Filters, SingleRecipes } from "../../shared/types";

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

export const setUserRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_USER_RECIPES,
  payload: recipes,
});

export const setFavoriteRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_FAVORITE_RECIPES,
  payload: recipes,
});

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

export const setUserScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_USER_SCROLL_DISTANCE,
  payload: distance,
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

export const setPopularTypeFilter = (filter: string) => ({
  type: recipesTypes.SET_POPULAR_TYPE_FILTER,
  payload: filter,
})

export const setPopularStatsFilter = (filter: string) => ({
  type: recipesTypes.SET_POPULAR_STATS_FILTER,
  payload: filter,
})

export const setRecentTypeFilter = (filter: string) => ({
  type: recipesTypes.SET_RECENT_FILTER,
  payload: filter,
})