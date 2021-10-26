import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebarSlice";
import userReducer from "./features/userSlice";

export default configureStore({
    reducer: {
        sidebar: sidebarReducer,
        user: userReducer,
    },
});
