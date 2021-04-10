import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebarSlice";
import newRecipeReducer from "../features/newRecipeSlice";
import userReducer from "../features/userSlice";

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        newRecipe: newRecipeReducer,
        user: userReducer,
    },
});
