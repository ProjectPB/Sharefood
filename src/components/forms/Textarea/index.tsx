import React from "react";

import "./styles.css";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
}

const Textarea: React.FC<Props> = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="textarea__container">
      {label && <label className="textarea__label">{label}</label>}

      <textarea className="textarea" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default Textarea;
