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

import Button from "../../components/forms/Button";
import AuthInput from "../../components/forms/AuthInput";

import "./styles.scss";

const mapState = ({ user }: State) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordErrors: user.resetPasswordErrors,
});

const NewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      alert("E-mail sent.");
      navigate("/auth");
    }
  }, [resetPasswordSuccess, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetPasswordError({}));
    };
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(resetPasswordErrors) && resetPasswordErrors.length > 0) {
      setErrors(resetPasswordErrors);
    }
  }, [resetPasswordErrors]);

  const handleSubmit = (e: Handler["form"]) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  const emailConfig = {
    Icon: Mail,
    value: email,
    handleChange: (e: Handler["string"]) => setEmail(e.target.value),
    placeholder: "E-mail",
    type: "email",
    name: "email",
  };

  const cancelButtonConfig = {
    secondary: true,
    onClick: () => navigate("/auth"),
  };

  const submitButtonConfig = {
    type: "submit",
  };

  return (
    <form className="newPassword" onSubmit={handleSubmit}>
      <div className="newPassword__header">
        <h3>New password</h3>
      </div>

      <div className="newPassword__body">
        <h4>
          Please provide an e-mail in order to send a message with a password
          reset
        </h4>
        <AuthInput {...emailConfig} />

        {errors && (
          <ul className="newPassword__errors">
            {errors.map((err: string, i: number) => (
              <li className="error" key={i}>
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="newPassword__buttons">
        <Button {...cancelButtonConfig}>CANCEL</Button>
        <Button {...submitButtonConfig}>SEND</Button>
      </div>
    </form>
  );
};

export default NewPasswordPage;
