import React from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Outlet } from "react-router";
import { useWidth } from "../../hooks";
import { RefreshOutlined } from "@material-ui/icons";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";

import "./styles.css";

const MainLayout: React.FC = () => {
  const width = useWidth();

  const handleRefresh = () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          window.location.reload()
        )
      } catch (err) {
        reject(err.message)
      }
    })
  }

  return (
    <div className="mainLayout">
      <Header />
      {width <= 600 && <SearchBar />}
      <div className="main">
        <Sidebar />
        <div className="main__container">
          <PullToRefresh
            pullDownThreshold={60}
            maxPullDownDistance={60}
            isPullable={width <= 600}
            resistance={3}
            onRefresh={handleRefresh}
            pullingContent={
              <div className="main__refresh">
                <RefreshOutlined fontSize="large" />
              </div>}
            refreshingContent={
              <div className="main__refresh">
                <RefreshOutlined fontSize="large" />
              </div>}>
            <Outlet />
          </PullToRefresh>
        </div>
      </div >
    </div >
  );
};

export default MainLayout;
