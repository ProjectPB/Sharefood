import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        sidebarIsOpen: false,
    },
    reducers: {
        openSidebar: (state) => {
            state.sidebarIsOpen = true;
        },
        closeSidebar: (state) => {
            state.sidebarIsOpen = false;
        },
    },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export const selectSidebarIsOpen = (state) => state.sidebar.sidebarIsOpen;

export default sidebarSlice.reducer;
