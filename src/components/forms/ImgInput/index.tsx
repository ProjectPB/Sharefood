import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Handler } from "../../../shared/types";

import "./styles.css";

interface Props {
  handleChange: (
    e: Handler["input"] | Handler["change"] | Handler["file"]
  ) => Promise<void>;
}

const ImgInput: React.FC<Props> = ({
  handleChange,
  ...otherProps
}) => {
  return (
    <div className="imgInput__container">
      <img src="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg" alt="Recipe attachment" />
      <AddCircleIcon />
      <p>Click to upload an image</p>
      <input onChange={handleChange} {...otherProps} className="imgInput" />
    </div>
  );
};

export default ImgInput;
