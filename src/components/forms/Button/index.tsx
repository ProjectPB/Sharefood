import React from "react";

import "./styles.scss";

interface Props {
  secondary?: boolean;
  handleClick?: () => void;
}

const Button: React.FC<Props> = ({ children, secondary, handleClick, ...otherProps }) => {
  return (
    <button
      className={`button ${secondary ? "button--secondary" : "button--primary"
        }`}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
