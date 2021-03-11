import React from "react";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@material-ui/icons";
import { closeSidebar, openSidebar, selectSidebarIsOpen } from "../features/sidebarSlice";

function Header() {
    const dispatch = useDispatch();
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);

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
                <h2>ShareFood</h2>
            </div>

            <div className="header__searchBar">
                <input
                    className="header__searchInput"
                    placeholder="Find the recipe..."
                    type="text"
                />
                <SearchIcon className="header__searchIcon" />
            </div>

            <button>Create</button>

            <div className="header__avatar">
                <Avatar src="" alt="Patryk" />
                <h3>Patryk</h3>
            </div>
        </div>
    );
}

export default Header;
