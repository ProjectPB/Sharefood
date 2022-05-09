import { takeLatest, call, all, put } from "redux-saga/effects";
import { fetchRecipesStart, setFavoriteRecipes, setFavoriteScrollDistance, setMainRecipes, setMainScrollDistance, setMyRecipes, setMyScrollDistance, setPopularRecipes, setPopularScrollDistance, setQueryRecipes, setScrollDistanceStart, setUserRecipes, setUserScrollDistance } from "./recipes.actions";
import { handleFetchRecipes } from "./recipes.helpers";
import { loadRecipes } from "../Loading/loading.actions";
import { SingleRecipes } from "../../shared/types";
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
      case "user": {
        yield put(setUserRecipes(renderedRecipes));
        break;
      }
      default: {
        break;
      }
    }
    yield put(loadRecipes(true));
  } catch (err) {
    alert(err.message);
  }
}

export function* onFetchRecipesStart() {
  yield takeLatest(recipesTypes.FETCH_RECIPES, fetchRecipes);
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
    yield put(setUserRecipes({
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
      case "user": {
        yield put(setUserScrollDistance(distance));
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
    yield put(setUserScrollDistance(0));
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
    call(onResetRecipesStart),
    call(onSetScrollDistanceStart),
    call(onResetScrollDistancesStart),
  ]);
}
