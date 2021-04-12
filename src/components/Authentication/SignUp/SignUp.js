import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db, provider } from "../../../firebase";
import { login } from "../../../features/userSlice";
import "./SignUp.css";

function SignUp() {
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

        auth.createUserWithEmailAndPassword(email, password).then(
            (userAuth) => {
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
                    })
                    .catch((error) => alert(error.message));
            }
        );
    };

    return (
        <div className="signUp">
            <h3>REJESTRACJA</h3>
            <input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                type="email"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />
            <input
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Password"
                type="password"
            />

            <button type="submit" onClick={register}>
                Sign Up
            </button>
        </div>
    );
}

export default SignUp;
