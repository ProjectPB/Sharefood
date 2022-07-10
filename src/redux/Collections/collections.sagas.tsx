import { takeLatest, call, all, put } from "redux-saga/effects";
import { fetchBannerDataStart, fetchCollectionStart, setBanner, setCollection } from './collections.actions';
import { handleFetchBanner, handleFetchCollection } from './collections.helpers';
import { loadBanner, loadCollection } from "../Loading/loading.actions";
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

export function* fetchBanner({ payload }: ReturnType<typeof fetchBannerDataStart>) {
  try {
    yield put(loadBanner(false));
    const data: CollectionData[] = yield handleFetchBanner(payload);
    yield put(setBanner(data));
    yield put(loadBanner(true));
  } catch (err) {
    console.log(err);
    yield put(loadBanner(true));
  }
}

export function* onFetchBannerStart() {
  yield takeLatest(collectionTypes.FETCH_BANNER_DATA, fetchBanner);
}

export default function* collectionsSagas() {
  yield all([
    call(onFetchCollectionStart),
    call(onFetchBannerStart),
  ]);
}