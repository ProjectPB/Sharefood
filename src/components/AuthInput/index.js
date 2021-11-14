import React, { useEffect, useState } from "react";
import { Visibility } from "@material-ui/icons";
import "./styles.css";

const AuthInput = ({
  Icon,
  info,
  value,
  handleChange,
  placeholder,
  type,
  pattern,
  openInfo,
}) => {
  const [newType, setNewType] = useState(type);
  const [isValid, setIsValid] = useState(true);

  const changePasswordType = () => {
    if (newType === "password") {
      setNewType("text");
    }
    if (newType === "text") {
      setNewType("password");
    }
  };

  useEffect(() => {
    if (value !== "") {
      if (!value.match(pattern)) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      setIsValid(true);
    }
  }, [value, pattern]);

  return (
    <div className="authInput__container">
      <div
        className="authInput"
        style={
          isValid ? { outline: "1px solid" } : { outline: "2px solid red" }
        }
      >
        <Icon fontSize="small" />
        <input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type={newType}
          pattern={pattern}
        />
        {type === "password" && (
          <Visibility
            fontSize="small"
            className="authInput__visibilityIcon"
            onClick={changePasswordType}
          />
        )}
      </div>
      {openInfo &&
        info.map((i) => (
          <p
            style={isValid ? { color: "gray" } : { color: "red" }}
            className="signUp__inputInfo"
          >
            {i}
          </p>
        ))}
    </div>
  );
};

export default AuthInput;
