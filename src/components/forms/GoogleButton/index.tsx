import React from "react";
import { useLanguage } from "../../../hooks";

import "./styles.scss";

interface Props {
  handleClick: () => void;
}

const GoogleButton: React.FC<Props> = ({ handleClick }) => {
  const LANG = useLanguage();

  return (
    <div className="googleButton" onClick={handleClick}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="google"
      />
      <button>{LANG.AUTH.GOOGLE_SIGN_IN}</button>
    </div>
  );
};

export default GoogleButton;
