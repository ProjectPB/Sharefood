import React from "react";
import { Handler } from "../../../shared/types";

import "./styles.scss";

interface Props {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | Handler["number"]
  ) => void;
  label: string;
}

const Input: React.FC<Props> = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="input">
      {label && <label>{label}</label>}

      <input onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default Input;
