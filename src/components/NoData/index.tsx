import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import "./styles.scss";

const NoData: React.FC = () => {
  return (
    <div className="noData">
      <div className="noData__wrapper">
        <ErrorOutlineIcon />
        <h4>Could not find recipes which match your criteria</h4>
      </div>
    </div>
  );
};

export default NoData;
