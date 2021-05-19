import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../../firebase";
import { login } from "../../../features/userSlice";
import "./SignUp.css";
import { InfoOutlined, Lock, Mail, Person } from "@material-ui/icons";
import Input from "../../Input/Input";

function SignUp({ cancel }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
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

        if (!username) {
            return alert("Please enter a username.");
        }

        if (username.length > 12 || username.length < 4) {
            return alert("Username does not match requirements.");
        }

        if (!checkPasswords()) {
            return alert("Your passwords do not match.");
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user
                    .updateProfile({
                        displayName: username,
                    })
                    .then(() => {
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
                    });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="signUp">
            <h3>SIGN UP</h3>
            <InfoOutlined
                onClick={handleInfo}
                className="signUp__infoIcon"
                fontSize="small"
            />
            <Input
                Icon={Person}
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                pattern="^.{4,12}$"
                openInfo={openInfo}
                title="Between 4 and 12 characters"
            />
            <Input
                Icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                type="email"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                title="example@example.com"
                openInfo={openInfo}
            />
            <Input
                Icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                pattern=".{6,}"
                openInfo={openInfo}
                title="At least 6 characters"
            />
            <Input
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
                        color: "var(--orange-dark)",
                        backgroundColor: "white",
                    }}
                    onClick={cancel}
                >
                    CANCEL
                </button>
                <button
                    style={{
                        backgroundColor: "var(--orange-dark)",
                    }}
                    type="submit"
                    onClick={register}
                >
                    SIGN UP
                </button>
            </div>
        </div>
    );
}

export default SignUp;
