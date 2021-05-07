import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";

import "./Header.css";

import {
    closeSidebar,
    openSidebar,
    selectSidebarIsOpen,
} from "../../features/sidebarSlice";
import {
    openNewRecipe,
    selectNewRecipeIsOpen,
} from "../../features/newRecipeSlice";
import { selectUser } from "../../features/userSlice";

import ProfilePopup from "./ProfilePopup/ProfilePopup";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import SearchBar from "../SearchBar/SearchBar";
import { ClickAwayListener } from "@material-ui/core";

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);
    const newRecipeIsOpen = useSelector(selectNewRecipeIsOpen);
    const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
    const user = useSelector(selectUser);

    const [width, setWidth] = useState(window.innerWidth);

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

    const handleCreateRecipe = () => {
        if (!newRecipeIsOpen) {
            dispatch(openNewRecipe());
        }
    };

    const handleProfileMenu = () => {
        setProfileMenuIsOpen(!profileMenuIsOpen);
    };

    const navToMain = () => {
        history.push("/");
    };

    const handleClickAway = () => {
        setProfileMenuIsOpen(false);
    };

    return (
        <div className="header">
            {newRecipeIsOpen && <CreateRecipe />}
            <div className="header__left">
                <Menu onClick={handleSidebar} fontSize="large" />
                <h2 onClick={navToMain}>ShareFood</h2>
            </div>

            {width > 600 && <SearchBar onHeader />}

            <div className="header__right">
                <button className="header__button" onClick={handleCreateRecipe}>
                    Create
                </button>
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
        </div>
    );
}

export default Header;
