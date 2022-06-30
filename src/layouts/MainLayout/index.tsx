import React from "react";
import { Outlet } from "react-router";
import { useWidth } from "../../hooks";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";

import "./styles.scss";

const MainLayout: React.FC = () => {
  const width = useWidth();

  return (
    <div className="main">
      <Header />
      {width <= 600 && <SearchBar />}
      <div className="main__wrapper">
        <Sidebar />
        <Outlet />
      </div >
    </div >
  );
};

export default MainLayout;
