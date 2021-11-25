import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordError,
  resetPasswordStart,
  resetUserState,
} from "../../redux/User/user.actions";
import Button from "./../forms/Button";
import AuthInput from "./../AuthInput";
import { Mail } from "@material-ui/icons";
import "./styles.css";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordErrors: user.resetPasswordErrors,
});

const NewPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      alert("E-mail sent.");
      history.push("/auth");
    }
  }, [resetPasswordSuccess, history, dispatch]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  const emailConfig = {
    Icon: Mail,
    value: email,
    handleChange: (e) => setEmail(e.target.value),
    placeholder: "E-mail",
    type: "email",
    name: "email",
  };

  return (
    <form className="newPassword" onSubmit={handleSubmit}>
      <div className="newPassword__header">
        <h3>New password</h3>
      </div>

      <div className="newPassword__main">
        <h4>
          Please provide an e-mail in order to send a message with a password
          reset
        </h4>
        <AuthInput {...emailConfig} />

        {errors && (
          <ul className="newPassword__errors">
            {errors.map((err, i) => (
              <li className="newPassword__error" key={i}>
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="newPassword__buttons">
        <Button secondary onClick={() => history.push("/auth")}>
          CANCEL
        </Button>
        <Button type="submit">SEND</Button>
      </div>
    </form>
  );
};

export default NewPassword;
