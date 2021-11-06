import { takeLatest, call, all, put } from "redux-saga/effects";
import { fetchRecipesStart, setRecipes } from "./recipes.actions";
import { handleCreateRecipe, handleFetchRecipes } from "./recipes.helpers";
import recipesTypes from "./recipes.types";

export function* fetchRecipes({ payload }) {
  try {
    const recipes = yield handleFetchRecipes(payload);
    yield put(setRecipes(recipes));
  } catch (err) {
    console.log(err.message);
  }
}

export function* onFetchRecipesStart() {
  yield takeLatest(recipesTypes.FETCH_RECIPES, fetchRecipes);
}

export function* createRecipe(payload) {
  try {
    const resolve = yield handleCreateRecipe(payload);
    if (resolve) {
      yield put(fetchRecipesStart());
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function* onCreateRecipeStart() {
  yield takeLatest(recipesTypes.CREATE_RECIPE, createRecipe);
}

export default function* recipesSagas() {
  yield all([call(onFetchRecipesStart), call(onCreateRecipeStart)]);
}
