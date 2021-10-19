import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import "./styles.css";

const NoData = () => {
  return (
    <div className="noData">
      <ErrorOutlineIcon />
      <h4>Could not find recipes which match your criteria</h4>
    </div>
  );
};

export default NoData;
