import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import uiReducer from "./UI/ui.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
});

export default rootReducer;
