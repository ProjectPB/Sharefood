import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from "./User/user.reducer";
import uiReducer from "./UI/ui.reducer";
import recipesReducer from "./Recipes/recipes.reducer";
import loadingReducer from "./Loading/loading.reducer";
import recipeReducer from './Recipe/recipe.reducer';
import collectionsReducer from './Collections/collections.reducer';
import { getPersistConfig } from "redux-deep-persist";

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  recipes: recipesReducer,
  loading: loadingReducer,
  recipe: recipeReducer,
  collections: collectionsReducer,
});

const rootPersistConfig = getPersistConfig({
  key: 'root',
  storage,
  whitelist: ['user.currentUser', 'ui.language'],
  rootReducer,
})

export default persistReducer(rootPersistConfig, rootReducer);
