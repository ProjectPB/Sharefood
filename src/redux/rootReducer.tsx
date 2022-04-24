import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import uiReducer from "./UI/ui.reducer";
import recipesReducer from "./Recipes/recipes.reducer";
import loadingReducer from "./Loading/loading.reducer";
import recipeReducer from './Recipe/recipe.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  recipes: recipesReducer,
  loading: loadingReducer,
  recipe: recipeReducer,
});

export default rootReducer;
