import React from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Outlet } from "react-router";
import { useWidth } from "../../hooks";
import { RefreshOutlined } from "@material-ui/icons";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";

import "./styles.scss";

const WideLayout: React.FC = () => {
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
    <div className="wide">
      <Header />
      {width <= 600 && <SearchBar />}
      <div className="wide__wrapper">
        <Sidebar narrow />
        <div className="wide__body">
          <PullToRefresh
            pullDownThreshold={60}
            maxPullDownDistance={60}
            isPullable={width <= 600}
            resistance={3}
            onRefresh={handleRefresh}
            pullingContent={
              <div className="wide__refresh">
                <RefreshOutlined fontSize="large" />
              </div>}
            refreshingContent={
              <div className="wide__refresh">
                <RefreshOutlined fontSize="large" />
              </div>}>
            <Outlet />
          </PullToRefresh>
        </div>
      </div >
    </div >
  );
};

export default WideLayout;
