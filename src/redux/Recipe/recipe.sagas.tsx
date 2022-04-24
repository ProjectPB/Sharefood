import { takeLatest, call, all, put } from "redux-saga/effects";
import { NewRecipeData, RecipeData } from "../../shared/types";
import { createRecipeStart, dislikeRecipeStart, fetchRecipeDataStart, likeRecipeStart, setRecipeData } from "./recipe.actions";
import { handleCreateRecipe, handleDislikeRecipe, handleFetchRecipeData, handleLikeRecipe } from "./recipe.helpers";
import { resetRecipes, setFavoriteRecipes } from './../Recipes/recipes.actions'
import { loadRecipeData } from "../Loading/loading.actions";
import recipeTypes from "./recipe.types";

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
  yield takeLatest(recipeTypes.FETCH_RECIPE_DATA, fetchRecipeData);
}

export function* createRecipe(payload: ReturnType<typeof createRecipeStart>) {
  try {
    const resolve: NewRecipeData = yield handleCreateRecipe(payload);
    if (resolve) {
      yield resetRecipes();
    }
  } catch (err) {
    // console.log(err.message);
  }
}

export function* onCreateRecipeStart() {
  yield takeLatest(recipeTypes.CREATE_RECIPE, createRecipe);
}

export function* likeRecipe({ payload }: ReturnType<typeof likeRecipeStart>) {
  try {
    yield handleLikeRecipe(payload.userId, payload.recipeId);
    yield put(setRecipeData({ ...payload.data, likesQuantity: payload.data.likesQuantity += 1, liked: true, }))
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
    handleDislikeRecipe(payload.userId, payload.recipeId);
    yield put(setRecipeData({ ...payload.data, likesQuantity: payload.data.likesQuantity -= 1, liked: false, }));
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