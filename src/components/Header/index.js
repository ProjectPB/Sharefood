import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useWidth } from "../../hooks";
import { Menu } from "@material-ui/icons";
import { ClickAwayListener } from "@material-ui/core";
import { closeSidebar, openSidebar } from "./../../redux/UI/ui.actions";
import Avatar from "@material-ui/core/Avatar";
import ProfilePopup from "../ProfilePopup";
import NewRecipe from "../NewRecipe";
import SearchBar from "../SearchBar";
import Modal from "./../Modal";
import Button from "./../forms/Button";
import Logo from "../Logo";
import "./styles.css";

const mapState = ({ user, ui }) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
});

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const { currentUser, sidebarIsOpen } = useSelector(mapState);
  const width = useWidth();
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

  const navToAuth = () => {
    history.push("/auth");
  };

  const handleClickAway = () => {
    setProfileMenuIsOpen(false);
  };

  return (
    <div className="header">
      <div className="header__left">
        <Menu onClick={handleSidebar} fontSize="large" />
        <div className="header__logo">
          <Logo />
        </div>
      </div>

      {width > 600 && <SearchBar onHeader />}

      {currentUser ? (
        <div className="header__right">
          <Button onClick={() => toggleModal()}>Create</Button>

          <Modal {...configModal}>
            <NewRecipe close={() => closeModal()} />
          </Modal>

          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="header__profilePopup">
              <Avatar
                onClick={handleProfileMenu}
                src={currentUser?.profilePic}
                alt={currentUser?.displayName}
                className="header__avatarIcon"
              />
              {profileMenuIsOpen ? <ProfilePopup /> : null}
            </div>
          </ClickAwayListener>
        </div>
      ) : (
        <div className="header__right">
          <Button onClick={navToAuth}>Login</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
