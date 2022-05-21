import React from "react";

import "./styles.scss";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
}

const Textarea: React.FC<Props> = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="textarea">
      {label && <label>{label}</label>}

      <textarea onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default Textarea;
