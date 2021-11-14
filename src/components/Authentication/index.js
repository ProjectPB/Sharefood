import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInStart } from "../../redux/User/user.actions";
import Login from "../Login";
import SignUp from "../SignUp";
import Logo from "./../Logo";
import GoogleButton from "../forms/GoogleButton";
import "./styles.css";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Authentication = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newAccount, setNewAccount] = useState(false);
  const { currentUser } = useSelector(mapState);

  const handleAccount = () => {
    setNewAccount(!newAccount);
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  currentUser && history.push("/");

  return (
    <div className="authentication__container">
      <div className="authentication">
        <div className="authentication__logo">
          <Logo />
        </div>
        {newAccount ? <SignUp cancel={handleAccount} /> : <Login />}

        {!newAccount && (
          <p>
            Not a member?{" "}
            <span className="authentication__signUp" onClick={handleAccount}>
              Sign Up
            </span>
          </p>
        )}

        {!newAccount && <GoogleButton handleClick={handleGoogleSignIn} />}
      </div>
    </div>
  );
};

export default Authentication;
