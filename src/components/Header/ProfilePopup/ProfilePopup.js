import React from "react";
import { Avatar } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../features/userSlice";
import "./ProfilePopup.css";
import { auth } from "../../../firebase";

function ProfilePopup() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const userLogout = () => {
        auth.signOut().then(dispatch(logout()));
    };

    return (
        <div className="profilePopup">
            <div className="profilePopup__userInfo">
                <Avatar src={user?.profilePic} alt={user?.displayName} />
                <p>{user?.displayName}</p>
            </div>

            <div onClick={userLogout} className="profilePopup__logout">
                <ExitToApp />
                <p>Logout</p>
            </div>
        </div>
    );
}

export default ProfilePopup;
