import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Visibility } from "@material-ui/icons";
import { Handler, State } from "../../../shared/types";

import "./styles.scss";

const mapState = ({ user }: State) => ({
  errors: user.signUpErrors,
});

interface Props {
  Icon?: any;
  value: string;
  handleChange: {
    (e: Handler["string"]): void;
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
    <div className="authInput">
      <div className={`${isValid ? 'authInput__wrapper' : 'authInput__wrapper authInput__wrapper--invalid'} `}>
        {Icon && <Icon className='authInput__labelIcon' />}
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
            className="visibilityIcon"
            onClick={changePasswordType}
          />
        )}
      </div>

      {openInfo &&
        <div className="authInput__infoContainer">
          {info?.map((i, index) => (
            <p
              key={index}
              style={isValid ? { color: "gray" } : { color: "red" }}
              className="authInput__info"
            >
              {i}
            </p>
          ))}
        </div>
      }
    </div>
  );
};

export default AuthInput;
