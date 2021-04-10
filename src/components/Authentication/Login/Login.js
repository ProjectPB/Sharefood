import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../../firebase";
import { login } from "../../../features/userSlice";
import "./Login.css";

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        profilePic: userAuth.user.photoURL,
                    })
                );
            })
            .catch((error) => alert(error));
    };

    return (
        <div className="login">
            <h3>LOGOWANIE</h3>
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

            <button type="submit" onClick={signIn}>
                Sign In
            </button>
        </div>
    );
}

export default Login;
