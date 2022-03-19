import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInStart, signUpError } from "../../redux/User/user.actions";
import { loadAuth } from "../../redux/Loading/loading.actions";
import { State } from "../../shared/types";

import Login from "../Login";
import SignUp from "../SignUp";
import Logo from "../Logo";
import GoogleButton from "../forms/GoogleButton";
import Loading from "../Loading";

import "./styles.css";

const mapState = ({ user, loading }: State) => ({
  currentUser: user.currentUser,
  errors: user.signUpErrors,
  loading: loading.authLoading,
});

const Authentication: React.FC = () => {
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

      {!newAccount && (
        <p>
          Forgot password?{" "}
          <Link to="/reset">
            <span className="authentication__signUp">Reset</span>
          </Link>
        </p>
      )}

      {!newAccount && <GoogleButton handleClick={handleGoogleSignIn} />}

      {errors && (
        <ul className="authentication__errors">
          {errors.map((err: string, i: number) => (
            <li className="authentication__error" key={i}>
              {err}
            </li>
          ))}
        </ul>
      )}

      <div className="authentication__loading">{loading && <Loading />}</div>
    </div>
  );
};

export default Authentication;
