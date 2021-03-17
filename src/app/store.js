import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebarSlice";
import newRecipeReducer from "../features/newRecipeSlice";

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        newRecipe: newRecipeReducer,
    },
});
