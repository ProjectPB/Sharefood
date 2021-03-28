import React from "react";
import { Search } from "@material-ui/icons";
import "./SearchBar.css";

function SearchBar() {
    return (
        <div className="searchBar">
            <input
                className="searchInput"
                placeholder="Find the recipe..."
                type="text"
            />
            <Search className="searchIcon" />
        </div>
    );
}

export default SearchBar;
