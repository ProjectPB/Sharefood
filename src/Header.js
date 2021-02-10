import React, { useState } from 'react';
import "./Header.css";
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from "@material-ui/icons/Search";

function Header() {
    return (
        <nav className="header">
            <div className="header__left">
                <MenuIcon fontSize="large" />
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

            <button>Create recipe</button>

            <div className="header__right">
                <div className="header__avatar">
                    <Avatar src="" alt="Patryk"/>
                    <h3>Patryk B</h3>
                </div>
            </div>
        </nav>
    )
}

export default Header;
