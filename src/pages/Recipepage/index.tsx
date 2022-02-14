import React from "react";
import { useWidth } from "../../hooks";

import Header from "../../components/Header";
import Recipe from "../../components/Recipe";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";

import "./styles.css";

const Recipepage: React.FC = () => {
  const width = useWidth();

  return (
    <div className="recipePage__container">
      <Header />
      {width <= 600 && <SearchBar />}
      <div className="recipePage">
        <Sidebar />
        <Recipe />
      </div>
    </div>
  );
};

export default Recipepage;
