import React from "react";

import "./styles.scss";

interface Props {
  secondary?: boolean;
}

const Button: React.FC<Props> = ({ children, secondary, ...otherProps }) => {
  return (
    <button
      className={`button ${secondary ? "button--secondary" : "button--primary"
        }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
