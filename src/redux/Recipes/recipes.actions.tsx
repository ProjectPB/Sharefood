import recipesTypes from "./recipes.types";
import { FiltersTypes, SingleRecipes } from "../../shared/types";

export const fetchRecipesStart = (filters: FiltersTypes) => ({
  type: recipesTypes.FETCH_RECIPES,
  payload: filters,
});

export const setHomeRecentRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_HOME_RECENT_RECIPES,
  payload: recipes,
});

export const setHomePopularRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_HOME_POPULAR_RECIPES,
  payload: recipes,
});

export const setAllRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_ALL_RECIPES,
  payload: recipes,
});

export const setMyRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_MY_RECIPES,
  payload: recipes,
});

export const setRelatedRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_RELATED_RECIPES,
  payload: recipes
})

export const setUserRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_USER_RECIPES,
  payload: recipes,
});

export const setFavoriteRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_FAVORITE_RECIPES,
  payload: recipes,
});

export const setCollectionRecipes = (recipes: SingleRecipes) => ({
  type: recipesTypes.SET_COLLECTION_RECIPES,
  payload: recipes,
})

export const resetRecipes = () => ({
  type: recipesTypes.RESET_RECIPES,
})

export const setScrollDistanceStart = (data: { distance: number, store: string }) => ({
  type: recipesTypes.SET_SCROLL_DISTANCE,
  payload: data,
})

export const setHomeScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_HOME_SCROLL_DISTANCE,
  payload: distance
})

export const setAllScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_ALL_SCROLL_DISTANCE,
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

export const setCollectionScrollDistance = (distance: number) => ({
  type: recipesTypes.SET_COLLECTION_SCROLL_DISTANCE,
  payload: distance
})

export const resetScrollDistancesStart = () => ({
  type: recipesTypes.RESET_SCROLL_DISTANCES,
})

export const setTypeFilter = (filter: string) => ({
  type: recipesTypes.SET_TYPE_FILTER,
  payload: filter,
})

export const setSortFilter = (filter: string) => ({
  type: recipesTypes.SET_SORT_FILTER,
  payload: filter,
})

export const setTagFilter = (filter: string) => ({
  type: recipesTypes.SET_TAG_FILTER,
  payload: filter,
})