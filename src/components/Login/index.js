import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Lock, Mail } from "@material-ui/icons";
import { emailSignInStart } from "./../../redux/User/user.actions";
import AuthInput from "../AuthInput";
import "./styles.css";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const signIn = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  return (
    <form className="login">
      <h3>SIGN IN</h3>
      <AuthInput
        Icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        type="email"
      />
      <AuthInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        Icon={Lock}
      />
      <button type="submit" onClick={signIn}>
        SIGN IN
      </button>
    </form>
  );
};

export default Login;
