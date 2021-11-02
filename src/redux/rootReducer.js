import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import uiReducer from "./UI/ui.reducer";
import recipesReducer from "./Recipes/recipes.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  recipes: recipesReducer,
});

export default rootReducer;
