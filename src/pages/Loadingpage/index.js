import React from "react";
import Loading from "./../../components/Loading";
import Logo from "./../../components/Logo";
import "./styles.css";

const Loadingpage = () => {
  return (
    <div className="loadingPage">
      <div className="loadingPage__loading">
        <Loading />
      </div>
      <div className="loadingPage__logo">
        <Logo />
      </div>
    </div>
  );
};

export default Loadingpage;
