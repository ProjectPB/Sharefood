import React from "react";
import "./styles.css";

const Textarea = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="textarea__container">
      {label && <label className="textarea__label">{label}</label>}

      <textarea className="textarea" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default Textarea;
