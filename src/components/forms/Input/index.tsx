import React from "react";
import { Handler } from "../../../shared/types";

import "./styles.css";

interface Props {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | Handler["number"]
  ) => void;
  label: string;
}

const Input: React.FC<Props> = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="input__container">
      {label && <label className="input__label">{label}</label>}

      <input className="input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default Input;
