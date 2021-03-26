import { Avatar } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import React from "react";
import "./ProfilePopup.css";

function ProfilePopup() {
    return (
        <div className="profilePopup">
            <div className="profilePopup__userInfo">
                <Avatar src="" alt="Patryk" />
                <p>Patryk</p>
            </div>

            <div className="profilePopup__logout">
                <ExitToApp />
                <p>Logout</p>
            </div>
        </div>
    );
}

export default ProfilePopup;
