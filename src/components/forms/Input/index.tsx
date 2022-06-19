import React, { useRef } from "react";
import { Handler } from "../../../shared/types";

import "./styles.scss";

interface Props {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement> | Handler["number"]
  ) => void;
  label: string;
}

const Input: React.FC<Props> = ({ handleChange, label, ...otherProps }) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <fieldset className="input" tabIndex={1} onFocus={() => inputRef.current.focus()}>
      {label && <legend>{label}</legend>}

      <input ref={inputRef} onChange={handleChange} {...otherProps} />
    </fieldset>
  );
};

export default Input;
