import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Link to="/">
        <h1 className="text">ShareFood</h1>
      </Link>
    </div>
  );
};

export default Logo;
