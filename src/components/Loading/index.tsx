import React from "react";
import { CircularProgress } from "@material-ui/core";

import "./styles.css";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <CircularProgress size={60} color="inherit" />
    </div>
  );
};

export default Loading;