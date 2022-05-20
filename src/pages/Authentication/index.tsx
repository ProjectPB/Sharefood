import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInStart, signUpError } from "../../redux/User/user.actions";
import { loadAuth } from "../../redux/Loading/loading.actions";
import { State } from "../../shared/types";

import Login from "./../../components/Login";
import SignUp from "./../../components/SignUp";
import Logo from "./../../components/Logo";
import GoogleButton from './../../components/forms/GoogleButton';
import Loading from "./../../components/Loading";

import "./styles.scss";

const mapState = ({ user, loading }: State) => ({
  currentUser: user.currentUser,
  errors: user.signUpErrors,
  loading: loading.authLoading,
});

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newAccount, setNewAccount] = useState(false);
  const { currentUser, errors, loading } = useSelector(mapState);

  const handleAccount = () => {
    setNewAccount(!newAccount);
    dispatch(signUpError([]));
  };

  useEffect(() => {
    return () => {
      dispatch(signUpError([]));
      dispatch(loadAuth(false));
    };
  }, [dispatch]);

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  currentUser && navigate("/");

  return (
    <div className="auth">
      <div className="auth__logo">
        <Logo />
      </div>
      {newAccount ? <SignUp cancel={handleAccount} /> : <Login />}

      {!newAccount && (
        <p className="link">
          Not a member?{" "}
          <span className="span" onClick={handleAccount}>
            Sign Up
          </span>
        </p>
      )}

      {!newAccount && (
        <p className="link">
          Forgot password?{" "}
          <Link to="/reset">
            <span className="span">Reset</span>
          </Link>
        </p>
      )}
      {!newAccount && <GoogleButton handleClick={handleGoogleSignIn} />}

      {errors && (
        <ul className="errors">
          {errors.map((err: string, i: number) => (
            <li className="error" key={i}>
              {err}
            </li>
          ))}
        </ul>
      )}

      <div className="loading">{loading && <Loading />}</div>
    </div>
  );
};

export default AuthPage;
