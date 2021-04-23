import React, { useState } from "react";
import "./Authentication.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { useDispatch } from "react-redux";
import { auth, db, provider } from "../../firebase";
import { login } from "../../features/userSlice";

function Authentication() {
    const dispatch = useDispatch();
    const [newAccount, setNewAccount] = useState(false);

    const handleAccount = (e) => {
        e.preventDefault();

        setNewAccount(!newAccount);
    };

    const loginGoogle = () => {
        auth.signInWithPopup(provider)
            .then((userAuth) => {
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
            .catch((error) => alert(error));
    };

    return (
        <div className="authentication__container">
            <div className="authentication">
                {newAccount ? <SignUp cancel={handleAccount} /> : <Login />}

                {!newAccount && (
                    <p>
                        Not a member?{" "}
                        <span
                            className="authentication__signUp"
                            onClick={handleAccount}
                        >
                            Sign Up
                        </span>
                    </p>
                )}

                {!newAccount && (
                    <div className="authentication__google">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google"
                        />
                        <button
                            className="authentication__googleButton"
                            onClick={loginGoogle}
                        >
                            SIGN IN WITH GOOGLE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Authentication;
