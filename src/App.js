import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import { useDispatch, useSelector } from "react-redux";
import { selectNewRecipeIsOpen } from "./features/newRecipeSlice";

function App() {
    const dispatch = useDispatch();
    const newRecipeIsOpen = useSelector(selectNewRecipeIsOpen);

    return (
        <div className="app">
            {newRecipeIsOpen && <CreateRecipe />}
            <Header />
            <div className="app__main">
                <Sidebar />
                <Main />
            </div>
        </div>
    );
}

export default App;
