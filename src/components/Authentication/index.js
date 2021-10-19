import React, { useState } from "react";
import { useHistory } from "react-router";
import Login from "../Login";
import SignUp from "../SignUp";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, provider } from "../../firebase/firebase";
import { login, selectUser } from "../../redux/features/userSlice";
import "./styles.css";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Authentication = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();
  const [newAccount, setNewAccount] = useState(false);

  const handleAccount = () => {
    setNewAccount(!newAccount);
  };

  const loginGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profilePic: userAuth.user.photoURL,
          })
        ) &&
          db.collection("users").doc(userAuth.user.uid).set({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profilePic: userAuth.user.photoURL,
          });
      })
      .catch((error) => alert(error.message));
  };

  user && history.push("/");

  return (
    <div className="authentication__container">
      <div className="authentication">
        {newAccount ? <SignUp cancel={handleAccount} /> : <Login />}

        {!newAccount && (
          <p>
            Not a member?{" "}
            <span className="authentication__signUp" onClick={handleAccount}>
              Sign Up
            </span>
          </p>
        )}

        {!newAccount && (
          <div className="authentication__google">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google"
            />
            <button
              className="authentication__googleButton"
              onClick={loginGoogle}
            >
              SIGN IN WITH GOOGLE
            </button>
          </div>
        )}

        <Link to="/">
          <div className="authentication__back">
            <ArrowBack />
            <p>Back to homepage</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Authentication;
