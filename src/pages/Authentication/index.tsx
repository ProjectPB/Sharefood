import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInStart, signUpError } from "../../redux/User/user.actions";
import { loadAuth } from "../../redux/Loading/loading.actions";
import { State } from "../../shared/types";
import { useLanguage } from "../../hooks";

import Login from "./../../components/Login";
import SignUp from "./../../components/SignUp";
import Logo from "./../../components/Logo";
import GoogleButton from './../../components/forms/GoogleButton';
import Loading from "./../../components/Loading";
import AuthError from "../../components/AuthError";

import "./styles.scss";

const mapState = ({ user, loading }: State) => ({
  currentUser: user.currentUser,
  errors: user.signUpErrors,
  loading: loading.authLoading,
});

const AuthPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LANG = useLanguage();
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

      {errors && errors.length > 0 && <ul className="errors">
        {errors.map((err: string, i: number) => (
          <AuthError error={err} key={i} />
        ))}
      </ul>}

      {!newAccount && (
        <div className="auth__links">
          <p className="auth__link">
            {LANG.AUTH.NO_ACCOUNT}?{" "}
            <span className="span" onClick={handleAccount}>
              {LANG.AUTH.SIGN_UP}
            </span>
          </p>

          <p className="auth__link">
            {LANG.AUTH.FORGOT_PASSWORD}?{" "}
            <Link to="/reset">
              <span className="span">{LANG.AUTH.RESET_PASSWORD}</span>
            </Link>
          </p>
        </div>
      )}

      {!newAccount && <GoogleButton handleClick={handleGoogleSignIn} />}

      {loading && <div className="auth__loading"><Loading /></div>}
    </div>
  );
};

export default AuthPage;
