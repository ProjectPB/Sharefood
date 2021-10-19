import { createSlice } from "@reduxjs/toolkit";

export const newRecipeSlice = createSlice({
    name: "newRecipe",
    initialState: {
        newRecipeIsOpen: false,
    },
    reducers: {
        openNewRecipe: (state) => {
            state.newRecipeIsOpen = true;
        },
        closeNewRecipe: (state) => {
            state.newRecipeIsOpen = false;
        },
    },
});

export const { openNewRecipe, closeNewRecipe } = newRecipeSlice.actions;

export const selectNewRecipeIsOpen = (state) => state.newRecipe.newRecipeIsOpen;

export default newRecipeSlice.reducer;
