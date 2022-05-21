import React from "react";

import "./styles.scss";

interface Props {
  handleClick: () => void;
}

const GoogleButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <div className="googleButton" onClick={handleClick}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="google"
      />
      <button>Sign in with google</button>
    </div>
  );
};

export default GoogleButton;
