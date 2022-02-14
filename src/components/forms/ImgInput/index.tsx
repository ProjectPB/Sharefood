import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import "./styles.css";

interface Props {
  handleChange: (e) => Promise<void>;
  image: string;
  previewImg: string;
}

const ImgInput: React.FC<Props> = ({
  handleChange,
  image,
  previewImg,
  ...otherProps
}) => {
  return (
    <div className="imgInput__container">
      <img src={previewImg} alt="Recipe attachment" />
      {!image && <p>For the best results, please attach 4:3 image</p>}
      {!image && <AddCircleIcon />}
      <input onChange={handleChange} {...otherProps} className="imgInput" />
    </div>
  );
};

export default ImgInput;
