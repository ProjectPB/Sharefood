import React from "react";
import "./styles.css";

const Button = ({ children, secondary, ...otherProps }) => {
  return (
    <button
      className={`button ${
        secondary ? "button--secondary" : "button--primary"
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
