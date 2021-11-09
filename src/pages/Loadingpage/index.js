import React from "react";
import Loading from "./../../components/Loading";
import "./styles.css";

const Loadingpage = () => {
  return (
    <div className="loadingPage">
      <Loading />
      <h1 className="loadingPage__logo">Sharefood</h1>
    </div>
  );
};

export default Loadingpage;
