import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebarSlice";

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
    },
});
