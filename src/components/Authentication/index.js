import React, { useState } from "react";
import { useHistory } from "react-router";
import Login from "../Login";
import SignUp from "../SignUp";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { googleSignInStart } from "../../redux/User/user.actions";
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
              onClick={handleGoogleSignIn}
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
