import React from "react";
import { Outlet } from "react-router";
import { useWidth } from "../../hooks";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";

import "./styles.scss";

const WideLayout: React.FC = () => {
  const width = useWidth();

  return (
    <div className="wide">
      <Header />
      {width <= 600 && <SearchBar />}
      <div className="wide__wrapper">
        <Sidebar narrow />
        <Outlet />
      </div >
    </div >
  );
};

export default WideLayout;
