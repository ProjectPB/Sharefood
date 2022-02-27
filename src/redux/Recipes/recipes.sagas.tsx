import { takeLatest, call, all, put } from "redux-saga/effects";
import { createRecipeStart, dislikeRecipeStart, fetchRecipeDataStart, fetchRecipesStart, likeRecipeStart, setRecipeData, setRecipes } from "./recipes.actions";
import { handleCreateRecipe, handleDislikeRecipe, handleFetchRecipeData, handleFetchRecipes, handleLikeRecipe } from "./recipes.helpers";
import { loadRecipeData, loadRecipes } from "../Loading/loading.actions";
import { NewRecipeData, RecipeData, Recipes } from "../../shared/types";
import recipesTypes from "./recipes.types";

export function* fetchRecipes({
  payload,
}: ReturnType<typeof fetchRecipesStart>) {
  try {
    const recipes: Recipes = yield handleFetchRecipes(payload);
    yield put(setRecipes(recipes));
    yield put(loadRecipes(true));
  } catch (err) {
    // console.log(err.message);
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

export default function* recipesSagas() {
  yield all([call(onFetchRecipesStart), call(onCreateRecipeStart), call(onFetchRecipeDataStart), call(onLikeRecipeStart), call(onDislikeRecipeStart)]);
}
