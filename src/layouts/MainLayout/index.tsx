import React from "react";
import { Outlet } from "react-router";
import { useWidth } from "../../hooks";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";

import "./styles.css";

const MainLayout: React.FC = () => {
  const width = useWidth();

  return (
    <div className="mainLayout">
      <Header />
      {width <= 600 && <SearchBar />}
      <div className="main">
        <Sidebar />
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
