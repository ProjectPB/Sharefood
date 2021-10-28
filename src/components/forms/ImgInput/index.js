import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./styles.css";

const ImgInput = ({ handleChange, image, previewImg, ...otherProps }) => {
  return (
    <div className="imgInput__container">
      <img src={previewImg} alt="image" />
      {!image && <p>For the best results, please attach 4:3 image</p>}
      {!image && <AddCircleIcon />}
      <input onChange={handleChange} {...otherProps} className="imgInput" />
    </div>
  );
};

export default ImgInput;
