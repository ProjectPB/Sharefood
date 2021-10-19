import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase";
import { login } from "../../redux/features/userSlice";
import { Lock, Mail } from "@material-ui/icons";
import Input from "../Input";
import "./styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profilePic: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="login">
      <h3>SIGN IN</h3>
      <Input
        Icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        type="email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        Icon={Lock}
      />
      <button type="submit" onClick={signIn}>
        SIGN IN
      </button>
    </div>
  );
};

export default Login;
