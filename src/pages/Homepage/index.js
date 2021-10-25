import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import RenderRecipes from "../../components/RenderRecipes";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

const Homepage = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

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
