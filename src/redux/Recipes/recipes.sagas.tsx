import { takeLatest, call, all, put, takeEvery } from "redux-saga/effects";
import { fetchRecipesStart, setFavoriteRecipes, setFavoriteScrollDistance, setMyRecipes, setMyScrollDistance, setAllRecipes, setAllScrollDistance, setScrollDistanceStart, setUserRecipes, setUserScrollDistance, setRelatedRecipes, setHomeRecentRecipes, setHomePopularRecipes, setHomeScrollDistance } from "./recipes.actions";
import { handleFetchRecipes } from "./recipes.helpers";
import { loadHomePopularRecipes, loadHomeRecentRecipes, loadRecipes, loadRelatedRecipes } from "../Loading/loading.actions";
import { SingleRecipes } from "../../shared/types";
import recipesTypes from "./recipes.types";

export function* fetchRecipes({
  payload,
}: ReturnType<typeof fetchRecipesStart>) {
  try {
    const renderedRecipes: SingleRecipes = yield handleFetchRecipes(payload);
    switch (payload.store) {
      case "homeRecent": {
        yield put(setHomeRecentRecipes(renderedRecipes));
        yield put(loadHomeRecentRecipes(true));
        break;
      }
      case "homePopular": {
        yield put(setHomePopularRecipes(renderedRecipes));
        yield put(loadHomePopularRecipes(true));
        break;
      }
      case "all": {
        yield put(setAllRecipes(renderedRecipes));
        yield put(loadRecipes(true));
        break;
      }
      case "my": {
        yield put(setMyRecipes(renderedRecipes));
        yield put(loadRecipes(true));
        break;
      }
      case "favorite": {
        yield put(setFavoriteRecipes(renderedRecipes));
        yield put(loadRecipes(true));
        break;
      }
      case "user": {
        yield put(setUserRecipes(renderedRecipes));
        yield put(loadRecipes(true));
        break;
      }
      case "related": {
        yield put(setRelatedRecipes(renderedRecipes));
        yield put(loadRelatedRecipes(true));
        break;
      }
      default: {
        break;
      }
    }
  } catch (err) {
    alert(err.message);
  }
}

export function* onFetchRecipesStart() {
  yield takeEvery(recipesTypes.FETCH_RECIPES, fetchRecipes);
}


export function* resetRecipes() {
  try {
    yield put(setHomeRecentRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
    yield put(setHomePopularRecipes({
      data: [],
      queryDoc: null,
      isLastPage: false,
    }));
    yield put(setAllRecipes({
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
      case "home": {
        yield put(setHomeScrollDistance(distance));
        break;
      }
      case "all": {
        yield put(setAllScrollDistance(distance));
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
    yield put(setHomeScrollDistance(0));
    yield put(setAllScrollDistance(0));
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
