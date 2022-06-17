import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Handler } from "../../../shared/types";

import "./styles.scss";

interface Props {
  label: string,
  handleChange: (
    e: Handler["input"] | Handler["change"] | Handler["file"]
  ) => Promise<void>;
}

const ImgInput: React.FC<Props> = ({
  handleChange,
  label,
  ...otherProps
}) => {
  return (
    <div className="imgInput" tabIndex={1}>
      <img src="https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg" alt="Recipe attachment" />
      <AddCircleIcon />
      <p>{label}</p>
      <input onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default ImgInput;
