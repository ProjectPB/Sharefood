import React from 'react';
import "./Header.css";
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from "@material-ui/icons/Search";

function Header() {
    return (
        <div className="header">
            <div className="header__left">
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
                    <Avatar src="" alt="Patryk"/>
                    <h3>Patryk</h3>
            </div>
        </div>
    )
}

export default Header;
