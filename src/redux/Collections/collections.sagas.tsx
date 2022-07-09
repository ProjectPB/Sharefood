import { takeLatest, call, all, put } from "redux-saga/effects";
import { fetchCollectionStart, setCollection } from './collections.actions';
import { handleFetchCollection } from './collections.helpers';
import { loadCollection } from "../Loading/loading.actions";
import { setCollectionRecipes } from "../Recipes/recipes.actions";
import { CollectionData, SingleRecipes } from "../../shared/types";
import collectionTypes from './collections.types';

export function* fetchCollection({ payload }: ReturnType<typeof fetchCollectionStart>) {
  try {
    yield put(loadCollection(false));
    const data: {
      data: CollectionData,
      recipes: SingleRecipes,
    } = yield handleFetchCollection(payload);

    yield put(setCollectionRecipes(data.recipes));;
    yield put(setCollection(data.data));
    yield put(loadCollection(true))
  } catch (err) {
    console.log(err)
    yield put(loadCollection(true))
  }
}

export function* onFetchCollectionStart() {
  yield takeLatest(collectionTypes.FETCH_COLLECTION, fetchCollection);
}

export default function* collectionsSagas() {
  yield all([
    call(onFetchCollectionStart),
  ]);
}