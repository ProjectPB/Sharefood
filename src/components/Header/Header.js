import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import Avatar from "@material-ui/core/Avatar";
import { ExpandLess, ExpandMore, Home, Menu } from "@material-ui/icons";
import ProfilePopup from "./ProfilePopup/ProfilePopup";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import { useHistory, useLocation } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);
    const newRecipeIsOpen = useSelector(selectNewRecipeIsOpen);
    const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
    const user = useSelector(selectUser);
    const location = useLocation();

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

    return (
        <div className="header">
            {newRecipeIsOpen && <CreateRecipe />}
            <div className="header__left">
                {!location.pathname.includes("/recipe") ? (
                    <Menu onClick={handleSidebar} fontSize="large" />
                ) : (
                    <Home onClick={navToMain} fontSize="large" />
                )}
                <h2 onClick={navToMain}>ShareFood</h2>
            </div>

            {width > 600 && <SearchBar onHeader />}

            <button onClick={handleCreateRecipe}>Create</button>

            <div className="header__avatar">
                <Avatar src={user?.profilePic} alt={user?.displayName} />
                {profileMenuIsOpen ? (
                    <ExpandLess fontSize="large" onClick={handleProfileMenu} />
                ) : (
                    <ExpandMore fontSize="large" onClick={handleProfileMenu} />
                )}
                {profileMenuIsOpen && <ProfilePopup />}
            </div>
        </div>
    );
}

export default Header;
