import React from "react";

import "./styles.scss";

interface Props {
  options: Option[];
  defaultValue?: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}

type Option = {
  value: string;
  name: string;
  hidden?: boolean;
};

const Select: React.FC<Props> = ({
  options,
  defaultValue,
  handleChange,
  label,
  ...otherProps
}) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className="select">
      {label && <label>{label}</label>}

      <select
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
