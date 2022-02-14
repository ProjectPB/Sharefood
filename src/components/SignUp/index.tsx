import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUserStart } from "../../redux/User/user.actions";
import { InfoOutlined, Lock, Mail, Person } from "@material-ui/icons";

import Button from "../forms/Button";
import AuthInput from "../AuthInput";

import "./styles.css";

interface Props {
  cancel: () => void;
}

type ETarget = { target: { value: React.SetStateAction<string> } };

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

  const register = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    handleChange: (e: ETarget) => setDisplayName(e.target.value),
    pattern: "^.{4,12}$",
    info: ["Between 4 and 12 characters"],
    openInfo: openInfo,
  };

  const emailConfig = {
    Icon: Mail,
    placeholder: "E-mail",
    type: "email",
    value: email,
    handleChange: (e: ETarget) => setEmail(e.target.value),
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
    info: ["example@example.com"],
    openInfo: openInfo,
  };

  const passwordConfig = {
    Icon: Lock,
    value: password,
    handleChange: (e: ETarget) => setPassword(e.target.value),
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
    handleChange: (e: ETarget) => setPasswordConfirm(e.target.value),
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
        className="signUp__infoIcon"
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
