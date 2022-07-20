import { takeLatest, call, all, put } from "redux-saga/effects";
import { RecipeData } from "../../shared/types";
import { createRecipeStart, dislikeRecipeStart, fetchRecipeDataStart, likeRecipeStart, setRecipeData } from "./recipe.actions";
import { handleCreateRecipe, handleDislikeRecipe, handleFetchRecipeData, handleLikeRecipe, handleViewRecipe } from "./recipe.helpers";
import { setFavoriteRecipes } from './../Recipes/recipes.actions'
import { loadRecipeData } from "../Loading/loading.actions";
import recipeTypes from "./recipe.types";

export function* fetchRecipeData({ payload }: ReturnType<typeof fetchRecipeDataStart>) {
  try {
    const data: RecipeData = yield handleFetchRecipeData(payload.recipeId, payload.userId);
    yield handleViewRecipe(payload.recipeId);
    yield put(setRecipeData(data));
    yield put(loadRecipeData(true));
  } catch (err) {
    // console.log(err.message) 
  }
}

export function* onFetchRecipeDataStart() {
  yield takeLatest(recipeTypes.FETCH_RECIPE_DATA, fetchRecipeData);
}

export function* createRecipe(payload: ReturnType<typeof createRecipeStart>) {
  try {
    yield handleCreateRecipe(payload);
  } catch (err) {
    console.log(err.message);
  }
}

export function* onCreateRecipeStart() {
  yield takeLatest(recipeTypes.CREATE_RECIPE, createRecipe);
}

export function* likeRecipe({ payload }: ReturnType<typeof likeRecipeStart>) {
  try {
    yield put(setRecipeData({ ...payload.data, liked: true, stats: { ...payload.data.stats, likesQuantity: payload.data.stats.likesQuantity += 1 } }));
    yield handleLikeRecipe(payload.userId, payload.recipeId, payload.data.authorId);
    yield put(setFavoriteRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
  } catch (error) {
    console.log(error.message)
  }
}

export function* onLikeRecipeStart() {
  yield takeLatest(recipeTypes.LIKE_RECIPE, likeRecipe);
}

export function* dislikeRecipe({ payload }: ReturnType<typeof dislikeRecipeStart>) {
  try {
    handleDislikeRecipe(payload.userId, payload.recipeId, payload.data.authorId);
    yield put(setRecipeData({ ...payload.data, liked: false, stats: { ...payload.data.stats, likesQuantity: payload.data.stats.likesQuantity -= 1 } }));
    yield put(setFavoriteRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
  } catch (error) {
    console.log(error.message)
  }
}

export function* onDislikeRecipeStart() {
  yield takeLatest(recipeTypes.DISLIKE_RECIPE, dislikeRecipe);
}

export default function* recipeSagas() {
  yield all([
    call(onCreateRecipeStart),
    call(onFetchRecipeDataStart),
    call(onLikeRecipeStart),
    call(onDislikeRecipeStart),
  ]);
}