import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../../../firebase";
import { login } from "../../../features/userSlice";
import "./SignUp.css";
import { Lock, Mail, Person } from "@material-ui/icons";
import Input from "../../Input/Input";

function SignUp({ cancel }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const checkPasswords = () => {
        if (password === passwordConfirm) {
            return true;
        } else {
            return false;
        }
    };

    const register = (e) => {
        e.preventDefault();

        if (!checkPasswords()) {
            return alert("Your passwords do not match");
        }

        if (!username) {
            return alert("Please enter a full name!");
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
            <Input
                Icon={Person}
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                Icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                type="email"
            />
            <Input
                Icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />
            <Input
                Icon={Lock}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Password"
                type="password"
            />

            <div className="signUp__buttons">
                <button
                    style={{
                        color: "orange",
                        backgroundColor: "white",
                    }}
                    onClick={cancel}
                >
                    CANCEL
                </button>
                <button
                    style={{
                        backgroundColor: "orange",
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
