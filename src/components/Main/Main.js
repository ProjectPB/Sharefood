import React from "react";
import Recipe from "../Recipe/Recipe";
import RenderRecipes from "../RenderRecipes/RenderRecipes";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";

function Main({ fetch, recipe }) {
    return (
        <div className="main">
            <Sidebar />
            {fetch && <RenderRecipes fetch={fetch} />}
            {recipe && <Recipe />}
        </div>
    );
}

export default Main;
