import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import { closeSidebar, openSidebar } from "../../redux/UI/ui.actions";
import { useClickOutside, useLanguage, useWidth } from "../../hooks";
import { State } from "../../shared/types";
import Avatar from "@material-ui/core/Avatar";

import ProfilePopup from "../ProfilePopup";
import NewRecipe from "../NewRecipe";
import SearchBar from "../SearchBar";
import Modal from "../Modal";
import Button from "../forms/Button";
import LangSelector from './../LangSelector';
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
  const lang = useLanguage();
  const profilePopupRef = useRef<HTMLDivElement>();
  const langMenuRef = useRef<HTMLDivElement>();
  useClickOutside(profilePopupRef, () => setProfileMenuIsOpen(false))
  useClickOutside(langMenuRef, () => setLangMenuIsOpen(false))
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const [recipeModalIsOpen, setRecipeModalIsOpen] = useState(false);
  const [langMenuIsOpen, setLangMenuIsOpen] = useState(false);

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
        <Menu onClick={handleSidebar} className="header__menuIcon" />
        <div className="header__logo">
          <Logo />
          <div className="header__languageContainer" ref={langMenuRef} onClick={() => setLangMenuIsOpen(!langMenuIsOpen)}>
            <p className="header__language">{lang.HEADER.LANG}</p>

            {langMenuIsOpen && <LangSelector close={() => setLangMenuIsOpen(false)} />}
          </div>
        </div>
      </div>

      {width > 600 && <SearchBar onHeader />}

      {currentUser ? (
        <div className="header__right">
          <Button handleClick={() => toggleRecipeModal()}>{lang.HEADER.CREATE}</Button>

          <Modal {...configRecipeModal}>
            <NewRecipe close={() => setRecipeModalIsOpen(false)} />
          </Modal>

          <div className="header__avatar" ref={profilePopupRef}>
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
        <div className="header__right">
          <Button handleClick={() => navigate("/auth")}>{lang.HEADER.LOGIN}</Button>
        </div >
      )
      }
    </div >
  );
};

export default Header;
