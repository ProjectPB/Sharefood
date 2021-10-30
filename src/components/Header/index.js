import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import {
  closeSidebar,
  openSidebar,
  selectSidebarIsOpen,
} from "../../redux/features/sidebarSlice";
import { selectUser } from "../../redux/features/userSlice";
import ProfilePopup from "../ProfilePopup";
import NewRecipe from "../NewRecipe";
import SearchBar from "../SearchBar";
import Modal from "./../Modal";
import Button from "./../forms/Button";
import { ClickAwayListener } from "@material-ui/core";
import "./styles.css";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sidebarIsOpen = useSelector(selectSidebarIsOpen);
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const user = useSelector(selectUser);
  const [width, setWidth] = useState(window.innerWidth);
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
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    if (width < 600) {
      dispatch(closeSidebar());
    }
  }, [width]);

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

  const navToMain = () => {
    history.push("/");
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
        <h2 onClick={navToMain}>ShareFood</h2>
      </div>

      {width > 600 && <SearchBar onHeader />}

      {user ? (
        <div className="header__right">
          <Button onClick={() => toggleModal()}>Create</Button>

          <Modal {...configModal}>
            <NewRecipe close={() => closeModal()} />
          </Modal>

          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="header__profilePopup">
              <Avatar
                onClick={handleProfileMenu}
                src={user?.profilePic}
                alt={user?.displayName}
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
