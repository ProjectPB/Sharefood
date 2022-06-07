import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Lock, Mail } from "@material-ui/icons";
import { emailSignInStart } from "../../redux/User/user.actions";
import { Handler, State } from "../../shared/types";
import { useLanguage } from "../../hooks";

import AuthInput from '../forms/AuthInput'
import Button from "../forms/Button";

import "./styles.scss";

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const LANG = useLanguage();
  const navigate = useNavigate();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      navigate("/");
    }
  }, [currentUser, navigate]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const signIn = (e: Handler["form"]) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const emailConfig = {
    Icon: Mail,
    value: email,
    handleChange: (e: Handler["string"]) => setEmail(e.target.value),
    placeholder: LANG.AUTH.EMAIL,
    type: "email",
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
  };

  const passwordConfig = {
    Icon: Lock,
    value: password,
    handleChange: (e: Handler["string"]) => setPassword(e.target.value),
    placeholder: LANG.AUTH.PASSWORD,
    type: "password",
    pattern: new RegExp(/^(?!\s*$).+/),
  };

  const buttonConfig = {
    type: "submit",
    onClick: signIn,
    secondary: false,
  };

  return (
    <form className="login">
      <h3>{LANG.AUTH.SIGN_IN}</h3>
      <AuthInput {...emailConfig} />
      <AuthInput {...passwordConfig} />
      <Button {...buttonConfig}>{LANG.AUTH.SIGN_IN}</Button>
    </form>
  );
};

export default Login;
