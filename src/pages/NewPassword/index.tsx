import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordError,
  resetPasswordStart,
  resetUserState,
} from "../../redux/User/user.actions";
import { Mail } from "@material-ui/icons";
import { Handler, State } from "../../shared/types";
import { useLanguage } from "../../hooks";
import { loadAuth } from "../../redux/Loading/loading.actions";

import Button from "../../components/forms/Button";
import AuthInput from "../../components/forms/AuthInput";
import AuthError from "../../components/AuthError";
import Loading from "../../components/Loading";

import "./styles.scss";

const mapState = ({ user, loading }: State) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordErrors: user.resetPasswordErrors,
  loading: loading.authLoading,
});

const NewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LANG = useLanguage();
  const [email, setEmail] = useState("");
  const { resetPasswordSuccess, resetPasswordErrors, loading } = useSelector(mapState);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      alert(LANG.AUTH.NEW_PASSWORD_SEND_SUCCESS);
      navigate("/auth");
    }
  }, [resetPasswordSuccess, navigate, dispatch, LANG.AUTH.NEW_PASSWORD_SEND_SUCCESS]);

  useEffect(() => {
    return () => {
      dispatch(resetPasswordError({}));
      dispatch(loadAuth(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(resetPasswordErrors) && resetPasswordErrors.length > 0) {
      setErrors(resetPasswordErrors);
    }
  }, [resetPasswordErrors]);

  const handleSubmit = (e: Handler["form"]) => {
    e.preventDefault();
    dispatch(loadAuth(true));
    dispatch(resetPasswordStart({ email }));
  };

  const emailConfig = {
    Icon: Mail,
    value: email,
    handleChange: (e: Handler["string"]) => setEmail(e.target.value),
    placeholder: LANG.AUTH.EMAIL,
    type: "email",
    name: "email",
  };

  const cancelButtonConfig = {
    type: "button",
    secondary: true,
    onClick: () => navigate("/auth"),
  };

  const submitButtonConfig = {
    type: "submit",
  };

  return (
    <form className="newPassword" onSubmit={handleSubmit}>
      <h3>{LANG.AUTH.NEW_PASSWORD}</h3>

      <div className="newPassword__body">
        <h4>
          {LANG.AUTH.NEW_PASSWORD_TEXT}
        </h4>

        <AuthInput {...emailConfig} />

        {errors && errors.length > 0 && <ul className="newPassword__errors">
          {errors.map((err: string, i: number) => (
            <AuthError error={err} key={i} />
          ))}
        </ul>}
      </div>

      <div className="newPassword__buttons">
        <Button {...cancelButtonConfig}>{LANG.AUTH.CANCEL}</Button>
        <Button {...submitButtonConfig}>{LANG.AUTH.NEW_PASSWORD_SEND}</Button>
      </div>

      {loading && <div className="newPassword__loading"><Loading /></div>}
    </form >
  );
};

export default NewPasswordPage;
