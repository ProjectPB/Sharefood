import React from "react";
import { CircularProgress } from "@material-ui/core";

import "./styles.scss";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <CircularProgress size={50} />
    </div>
  );
};

export default Loading;
