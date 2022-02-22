import { takeLatest, call, all, put } from "redux-saga/effects";
import { createRecipeStart, fetchRecipesStart, setRecipes } from "./recipes.actions";
import { handleCreateRecipe, handleFetchRecipes } from "./recipes.helpers";
import { loadRecipes } from "../Loading/loading.actions";
import { NewRecipeData, Recipes } from "../../shared/types";
import recipesTypes from "./recipes.types";

export function* fetchRecipes({
  payload,
}: ReturnType<typeof fetchRecipesStart>) {
  try {
    const recipes: Recipes = yield handleFetchRecipes(payload);
    yield put(setRecipes(recipes));
    yield put(loadRecipes(true));
  } catch (err) {
    console.log(err.message);
  }
}

export function* onFetchRecipesStart() {
  yield takeLatest(recipesTypes.FETCH_RECIPES, fetchRecipes);
}

export function* createRecipe(payload: ReturnType<typeof createRecipeStart>) {
  try {
    const resolve: NewRecipeData = yield handleCreateRecipe(payload);
    if (resolve) {
      yield put(fetchRecipesStart({}));
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
