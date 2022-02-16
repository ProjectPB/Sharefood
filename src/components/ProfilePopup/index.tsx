import React from "react";
import { Avatar } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { signOutUserStart } from "../../redux/User/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../shared/types";

import "./styles.css";

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const ProfilePopup: React.FC = () => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="profilePopup">
      <div className="profilePopup__userInfo">
        <Avatar src={currentUser?.profilePic} alt={currentUser?.displayName} />
        <p>{currentUser?.displayName}</p>
      </div>

      <div onClick={logout} className="profilePopup__logout">
        <ExitToApp />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfilePopup;
