import { takeLatest, call, all, put } from "redux-saga/effects";
import { resetRecipes } from './../Recipes/recipes.actions';
import { changeLanguageStart, setLanguage } from './ui.actions';
import { auth } from "../../firebase/utils";
import uiTypes from "./ui.types";

export function* changeLanguage({ payload }: ReturnType<typeof changeLanguageStart>) {
  try {
    yield put(resetRecipes());
    if (payload === 'english') {
      auth.languageCode = 'en';
    } else {
      auth.languageCode = 'pl'
    }
    yield put(setLanguage(payload));
  } catch (err) {
    // console.log(err);
  }
}

export function* onChangeLanguageStart() {
  yield takeLatest(uiTypes.CHANGE_LANGUAGE, changeLanguage);
}

export default function* uiSagas() {
  yield all([
    call(onChangeLanguageStart),
  ]);
}
