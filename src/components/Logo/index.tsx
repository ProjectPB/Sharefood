import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Link to="/">
        <p className="text">ShareFood</p>
      </Link>
    </div>
  );
};

export default Logo;
