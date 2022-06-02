import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import { closeSidebar, openSidebar } from "../../redux/UI/ui.actions";
import { useClickOutside, useWidth } from "../../hooks";
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
  const { currentUser, sidebarIsOpen } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = useWidth();
  const profilePopupRef = useRef<HTMLDivElement>();
  useClickOutside(profilePopupRef, () => setProfileMenuIsOpen(false))
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const [recipeModalIsOpen, setRecipeModalIsOpen] = useState(false);

  const toggleRecipeModal = () => setRecipeModalIsOpen(!recipeModalIsOpen);

  const configRecipeModal = {
    modalOpened: recipeModalIsOpen,
    toggleModal: toggleRecipeModal,
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
          <Button handleClick={() => toggleRecipeModal()}>Create</Button>

          <Modal {...configRecipeModal}>
            <NewRecipe close={() => setRecipeModalIsOpen(false)} />
          </Modal>

          <div className="popup" ref={profilePopupRef}>
            <Avatar
              onClick={() => setProfileMenuIsOpen(!profileMenuIsOpen)}
              src={currentUser?.profilePic}
              alt={currentUser?.displayName}
              className="avatarIcon"
            />
            {profileMenuIsOpen && <ProfilePopup close={() => setProfileMenuIsOpen(false)} />}
          </div>
        </div>
      ) : (
        <div className="rightContainer">
          <Button handleClick={() => navigate("/auth")}>Login</Button>
        </div >
      )
      }
    </div >
  );
};

export default Header;
