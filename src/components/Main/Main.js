import React from "react";
import RenderRecipes from "../RenderRecipes/RenderRecipes";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";

function Main({ fetch }) {
    return (
        <div className="main">
            <Sidebar />
            <RenderRecipes fetch={fetch} />
        </div>
    );
}

export default Main;
