import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Visibility, SvgIconComponent } from "@material-ui/icons";

import "./styles.css";

const mapState = ({ user }) => ({
  errors: user.signUpErrors,
});

interface Props {
  Icon: SvgIconComponent;
  value: string;
  handleChange: {
    (e: { target: { value: React.SetStateAction<string> } }): void;
  };
  placeholder: string;
  type: string;
  pattern?: any;
  openInfo?: boolean;
  info?: string[];
}

const AuthInput: React.FC<Props> = ({
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
  const { errors } = useSelector(mapState);

  const changePasswordType = () => {
    if (newType === "password") {
      setNewType("text");
    }
    if (newType === "text") {
      setNewType("password");
    }
  };

  useEffect(() => {
    if (errors?.length > 0) {
      if (!value.match(pattern)) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      setIsValid(true);
    }
  }, [value, pattern, errors.length]);

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
        info?.map((i) => (
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
