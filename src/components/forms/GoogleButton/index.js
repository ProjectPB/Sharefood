import React from "react";
import "./styles.css";

const GoogleButton = ({ handleClick }) => {
  return (
    <div className="googleButton__container" onClick={handleClick}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="google"
      />
      <button className="googleButton">Sign in with google</button>
    </div>
  );
};

export default GoogleButton;
