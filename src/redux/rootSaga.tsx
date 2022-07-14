import { all, call } from "redux-saga/effects";

import userSagas from "./User/user.sagas";
import recipesSagas from "./Recipes/recipes.sagas";
import recipeSagas from './Recipe/recipe.sagas';
import collectionsSagas from './Collections/collections.sagas'
import uiSagas from './UI/ui.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(recipesSagas), call(recipeSagas), call(collectionsSagas), call(uiSagas)]);
}
