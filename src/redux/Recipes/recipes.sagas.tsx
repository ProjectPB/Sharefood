import { takeLatest, call, all, put } from "redux-saga/effects";
import { createRecipeStart, dislikeRecipeStart, fetchRecipeDataStart, fetchRecipesStart, likeRecipeStart, setFavoriteRecipes, setFavoriteScrollDistance, setMainRecipes, setMainScrollDistance, setMyRecipes, setMyScrollDistance, setPopularRecipes, setPopularScrollDistance, setQueryRecipes, setRecipeData, setScrollDistanceStart } from "./recipes.actions";
import { handleCreateRecipe, handleDislikeRecipe, handleFetchRecipeData, handleFetchRecipes, handleLikeRecipe } from "./recipes.helpers";
import { loadRecipeData, loadRecipes } from "../Loading/loading.actions";
import { NewRecipeData, RecipeData, SingleRecipes } from "../../shared/types";
import recipesTypes from "./recipes.types";

export function* fetchRecipes({
  payload,
}: ReturnType<typeof fetchRecipesStart>) {
  try {
    const renderedRecipes: SingleRecipes = yield handleFetchRecipes(payload);
    switch (payload.store) {
      case "query": {
        if (payload.queryFilter) {
          yield put(setQueryRecipes(renderedRecipes));
        }
        break;
      }
      case "main": {
        yield put(setMainRecipes(renderedRecipes));
        break;
      }
      case "popular": {
        yield put(setPopularRecipes(renderedRecipes));
        break;
      }
      case "my": {
        yield put(setMyRecipes(renderedRecipes));
        break;
      }
      case "favorite": {
        yield put(setFavoriteRecipes(renderedRecipes));
        break;
      }
      default: {
        break;
      }
    }
    yield put(loadRecipes(true));
  } catch (err) {
    console.log(err.message);
    alert(err.message);
  }
}

export function* onFetchRecipesStart() {
  yield takeLatest(recipesTypes.FETCH_RECIPES, fetchRecipes);
}

export function* fetchRecipeData({ payload }: ReturnType<typeof fetchRecipeDataStart>) {
  try {
    const data: RecipeData = yield handleFetchRecipeData(payload.recipeId, payload.userId);
    yield put(setRecipeData(data));
    yield put(loadRecipeData(true));
  } catch (err) {
    // console.log(err.message) 
  }
}

export function* onFetchRecipeDataStart() {
  yield takeLatest(recipesTypes.FETCH_RECIPE_DATA, fetchRecipeData);
}

export function* createRecipe(payload: ReturnType<typeof createRecipeStart>) {
  try {
    const resolve: NewRecipeData = yield handleCreateRecipe(payload);
    if (resolve) {
      yield put(fetchRecipesStart({}));
    }
  } catch (err) {
    // console.log(err.message);
  }
}

export function* onCreateRecipeStart() {
  yield takeLatest(recipesTypes.CREATE_RECIPE, createRecipe);
}

export function* likeRecipe({ payload }: ReturnType<typeof likeRecipeStart>) {
  try {
    yield handleLikeRecipe(payload.userId, payload.recipeId);
    yield put(setRecipeData({ ...payload.data, likesQuantity: payload.data.likesQuantity += 1, liked: true, }))
  } catch (error) {
    console.log(error.message)
  }
}

export function* onLikeRecipeStart() {
  yield takeLatest(recipesTypes.LIKE_RECIPE, likeRecipe);
}

export function* dislikeRecipe({ payload }: ReturnType<typeof dislikeRecipeStart>) {
  try {
    handleDislikeRecipe(payload.userId, payload.recipeId);
    yield put(setRecipeData({ ...payload.data, likesQuantity: payload.data.likesQuantity -= 1, liked: false, }))
  } catch (error) {
    console.log(error.message)
  }
}

export function* onDislikeRecipeStart() {
  yield takeLatest(recipesTypes.DISLIKE_RECIPE, dislikeRecipe);
}

export function* resetRecipes() {
  try {
    yield put(setMainRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
    yield put(setPopularRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
    yield put(setMyRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
    yield put(setFavoriteRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
  } catch (error) {
    console.log(error.message);
  }
}

export function* onResetRecipesStart() {
  yield takeLatest(recipesTypes.RESET_RECIPES, resetRecipes);
}

export function* setScrollDistance({ payload }: ReturnType<typeof setScrollDistanceStart>) {
  try {
    const { store, distance } = payload
    switch (store) {
      case "main": {
        yield put(setMainScrollDistance(distance));
        break;
      }
      case "popular": {
        yield put(setPopularScrollDistance(distance));
        break;
      }
      case "my": {
        yield put(setMyScrollDistance(distance));
        break;
      }
      case "favorite": {
        yield put(setFavoriteScrollDistance(distance));
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    alert(error.message);
  }
}

export function* onSetScrollDistanceStart() {
  yield takeLatest(recipesTypes.SET_SCROLL_DISTANCE, setScrollDistance);
}

export function* resetScrollDistances() {
  try {
    yield put(setMainScrollDistance(0));
    yield put(setPopularScrollDistance(0));
    yield put(setMyScrollDistance(0));
    yield put(setFavoriteScrollDistance(0));
  } catch (error) {
    alert(error.message);
  }
}

export function* onResetScrollDistancesStart() {
  yield takeLatest(recipesTypes.RESET_SCROLL_DISTANCES, resetScrollDistances);
}

export default function* recipesSagas() {
  yield all([
    call(onFetchRecipesStart),
    call(onCreateRecipeStart),
    call(onFetchRecipeDataStart),
    call(onLikeRecipeStart),
    call(onDislikeRecipeStart),
    call(onResetRecipesStart),
    call(onSetScrollDistanceStart),
    call(onResetScrollDistancesStart),
  ]);
}
