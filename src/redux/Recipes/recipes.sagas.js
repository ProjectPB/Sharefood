import { takeLatest, call, all, put } from "redux-saga/effects";
import { setRecipes, setRecipeData } from "./recipes.actions";
import { handleFetchRecipes, handleFetchRecipeData } from "./recipes.helpers";
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

export default function* recipesSagas() {
  yield all([call(onFetchRecipesStart)]);
}
