import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import { closeSidebar, openSidebar } from "../../redux/UI/ui.actions";
import { useWidth } from "../../hooks";
import { State } from "../../shared/types";
import Avatar from "@material-ui/core/Avatar";

import ProfilePopup from "../ProfilePopup";
import NewRecipe from "../NewRecipe";
import SearchBar from "../SearchBar";
import Modal from "../Modal";
import Button from "../forms/Button";
import Logo from "../Logo";

import "./styles.scss";

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
});

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = useWidth();
  const { currentUser, sidebarIsOpen } = useSelector(mapState);
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const [hideModal, setHideModal] = useState(true);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const closeModal = () => {
    setHideModal(true);
  };

  useEffect(() => {
    if (width < 600) {
      dispatch(closeSidebar());
    }
  }, [width, dispatch]);

  const handleSidebar = () => {
    if (sidebarIsOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };

  const handleProfileMenu = () => {
    setProfileMenuIsOpen(!profileMenuIsOpen);
  };

  const navToAuth = (): void => {
    navigate("/auth");
  };

  const loginButtonConfig = {
    onClick: navToAuth,
  };

  const toggleButtonConfig = {
    onClick: () => toggleModal(),
  };

  return (
    <div className="header">
      <div className="leftContainer">
        <Menu onClick={handleSidebar} fontSize="large" />
        <div className="header__logo">
          <Logo />
        </div>
      </div>

      {width > 600 && <SearchBar onHeader />}

      {currentUser ? (
        <div className="rightContainer">
          <Button {...toggleButtonConfig}>Create</Button>

          <Modal {...configModal}>
            <NewRecipe close={() => closeModal()} />
          </Modal>

          <div className="popup">
            <Avatar
              onClick={handleProfileMenu}
              src={currentUser?.profilePic}
              alt={currentUser?.displayName}
              className="avatarIcon"
            />
            {profileMenuIsOpen ? <ProfilePopup close={() => setProfileMenuIsOpen(false)} /> : null}
          </div>
        </div>
      ) : (
        <div className="rightContainer">
          <Button {...loginButtonConfig}>Login</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
