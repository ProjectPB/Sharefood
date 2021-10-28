import React from "react";
import "./styles.css";

const Input = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="input__container">
      {label && <label className="input__label">{label}</label>}

      <input className="input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default Input;
