import React from "react";
import { useWidth } from "../../hooks";

import Header from "../../components/Header";
import RenderRecipes from "../../components/RenderRecipes";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";

import "./styles.css";

const Homepage: React.FC = () => {
  const width = useWidth();

  return (
    <div className="homepage__container">
      <Header />
      {width <= 600 && <SearchBar />}
      <div className="homepage">
        <Sidebar />
        <RenderRecipes />
      </div>
    </div>
  );
};

export default Homepage;
