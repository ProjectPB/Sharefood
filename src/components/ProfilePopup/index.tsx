import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { signOutUserStart } from "../../redux/User/user.actions";
import { useLanguage } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../shared/types";

import './styles.scss';

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

interface Props {
  close: () => void;
}

const ProfilePopup: React.FC<Props> = ({ close }) => {
  const { currentUser } = useSelector(mapState);
  const LANG = useLanguage();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOutUserStart());
    close();
  };

  return (
    <div className="profilePopup">
      <Link to={`user/${currentUser.uid}`} onClick={() => close()}>
        <div className="profilePopup__action">
          <Avatar src={currentUser?.profilePic} alt={currentUser?.displayName} />
          <p>{currentUser?.displayName}</p>
        </div>
      </Link>

      <div onClick={logout} className="profilePopup__action">
        <ExitToApp />
        <p>{LANG.HEADER.LOGOUT}</p>
      </div>
    </div>
  );
};

export default ProfilePopup;
