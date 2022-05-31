import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUserStart } from "../../redux/User/user.actions";
import { InfoOutlined, Lock, Mail, Person } from "@material-ui/icons";
import { Handler } from "../../shared/types";

import Button from "../forms/Button";
import AuthInput from "../forms/AuthInput";

import "./styles.scss";

interface Props {
  cancel: () => void;
}

const SignUp: React.FC<Props> = ({ cancel }) => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [openInfo, setOpenInfo] = useState(false);

  const handleInfo = () => {
    setOpenInfo(!openInfo);
  };

  const register = (e: Handler["change"]) => {
    e.preventDefault();

    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        passwordConfirm,
      })
    );
  };

  const usernameConfig = {
    Icon: Person,
    placeholder: "Username",
    type: "text",
    value: displayName,
    handleChange: (e: Handler["string"]) => setDisplayName(e.target.value),
    pattern: "^.{4,12}$",
    info: ["Between 4 and 12 characters"],
    openInfo: openInfo,
  };

  const emailConfig = {
    Icon: Mail,
    placeholder: "E-mail",
    type: "email",
    value: email,
    handleChange: (e: Handler["string"]) => setEmail(e.target.value),
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
    info: ["example@example.com"],
    openInfo: openInfo,
  };

  const passwordConfig = {
    Icon: Lock,
    value: password,
    handleChange: (e: Handler["string"]) => setPassword(e.target.value),
    placeholder: "Password",
    type: "password",
    pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    openInfo: openInfo,
    info: [
      "At least 8 characters",
      "At least 1 numeric character",
      "At least 1 lowercase letter",
      "At least 1 uppercase letter",
    ],
  };

  const passwordConfirmConfig = {
    Icon: Lock,
    value: passwordConfirm,
    handleChange: (e: Handler["string"]) => setPasswordConfirm(e.target.value),
    placeholder: "Confirm Password",
    type: "password",
    pattern: new RegExp(`^${password}$`),
  };

  const cancelButtonConfig = {
    onClick: cancel,
    secondary: true,
  };

  const submitButtonConfig = {
    type: "submit",
    onClick: register,
    secondary: false,
  };

  return (
    <div className="signUp">
      <h3>SIGN UP</h3>
      <InfoOutlined
        onClick={handleInfo}
        className="infoIcon"
        fontSize="small"
      />
      <AuthInput {...usernameConfig} />
      <AuthInput {...emailConfig} />
      <AuthInput {...passwordConfig} />
      <AuthInput {...passwordConfirmConfig} />

      <div className="signUp__buttons">
        <Button {...cancelButtonConfig}>CANCEL</Button>
        <Button {...submitButtonConfig}>SIGN UP</Button>
      </div>
    </div>
  );
};

export default SignUp;
