import React from "react";
import Recipe from "../Recipe";
import RenderRecipes from "../RenderRecipes";
import Sidebar from "../Sidebar";
import "./styles.css";

const Main = ({ fetch, recipe }) => {
  return (
    <div className="main">
      <Sidebar />
      {fetch && <RenderRecipes fetch={fetch} />}
      {recipe && <Recipe />}
    </div>
  );
};

export default Main;
