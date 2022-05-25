import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { signOutUserStart } from "../../redux/User/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../shared/types";
import { useClickOutside } from "../../hooks";

import "./styles.scss";

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

interface Props {
  close: () => void;
}

const ProfilePopup: React.FC<Props> = ({ close }) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>();
  useClickOutside(popupRef, () => close())

  const logout = () => {
    dispatch(signOutUserStart());
    close();
  };

  return (
    <div className="profilePopup" ref={popupRef}>
      <Link to={`user/${currentUser.uid}`} onClick={() => close()}>
        <div className="userInfo">
          <Avatar src={currentUser?.profilePic} alt={currentUser?.displayName} />
          <p>{currentUser?.displayName}</p>
        </div>
      </Link>

      <div onClick={logout} className="logout">
        <ExitToApp />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfilePopup;
