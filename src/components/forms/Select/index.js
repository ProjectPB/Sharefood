import React from "react";
import "./styles.css";

const Select = ({
  options,
  defaultValue,
  handleChange,
  label,
  ...otherProps
}) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className="select__container">
      {label && <label className="select__label">{label}</label>}

      <select
        className="select"
        value={defaultValue}
        onChange={handleChange}
        {...otherProps}
      >
        {options.map((option, index) => {
          const { value, name, hidden } = option;

          return (
            <option key={index} value={value} hidden={hidden}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
