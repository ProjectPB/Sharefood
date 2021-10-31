import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUserStart } from "./../../redux/User/user.actions";
import { InfoOutlined, Lock, Mail, Person } from "@material-ui/icons";
import AuthInput from "../AuthInput";
import "./styles.css";

const SignUp = ({ cancel }) => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [openInfo, setOpenInfo] = useState(false);

  const checkPasswords = () => {
    if (password === passwordConfirm) {
      return true;
    } else {
      return false;
    }
  };

  const handleInfo = () => {
    setOpenInfo(!openInfo);
  };

  const register = (e) => {
    e.preventDefault();

    if (!displayName) {
      return alert("Please enter a displayName.");
    }

    if (displayName.length > 12 || displayName.length < 4) {
      return alert("displayName does not match requirements.");
    }

    if (!checkPasswords()) {
      return alert("Your passwords do not match.");
    }

    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        passwordConfirm,
      })
    );
  };

  return (
    <div className="signUp">
      <h3>SIGN UP</h3>
      <InfoOutlined
        onClick={handleInfo}
        className="signUp__infoIcon"
        fontSize="small"
      />
      <AuthInput
        Icon={Person}
        placeholder="Username"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        pattern="^.{4,12}$"
        openInfo={openInfo}
        title="Between 4 and 12 characters"
      />
      <AuthInput
        Icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        type="email"
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
        title="example@example.com"
        openInfo={openInfo}
      />
      <AuthInput
        Icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        pattern=".{6,}"
        openInfo={openInfo}
        title="At least 6 characters"
      />
      <AuthInput
        Icon={Lock}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm Password"
        type="password"
        pattern={new RegExp(`^${password}$`)}
      />

      <div className="signUp__buttons">
        <button
          style={{
            color: "var(--color-secondary)",
            backgroundColor: "white",
          }}
          onClick={cancel}
        >
          CANCEL
        </button>
        <button
          style={{
            backgroundColor: "var(--color-secondary)",
          }}
          type="submit"
          onClick={register}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default SignUp;
