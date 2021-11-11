import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Logo = () => {
  return (
    <div className="logo__container">
      <Link to="/">
        <h1 className="logo">ShareFood</h1>
      </Link>
    </div>
  );
};

export default Logo;
