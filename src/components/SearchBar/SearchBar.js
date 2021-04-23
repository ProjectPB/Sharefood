import React, { useState } from "react";
import { useHistory } from "react-router";
import { Search } from "@material-ui/icons";
import "./SearchBar.css";

function SearchBar({ onHeader }) {
    const [input, setInput] = useState("");
    const history = useHistory();

    const navToSearchResult = (e) => {
        e.preventDefault();

        const loweredInput = input[0]?.toLowerCase() + input.substring(1);

        input && history.push(`/results/?q=${loweredInput}`);

        setInput("");
    };

    return (
        <form
            onSubmit={navToSearchResult}
            className={onHeader ? "searchBar__onHeader" : "searchBar"}
        >
            <input
                className="searchInput"
                placeholder="Find the recipe..."
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Search
                onClick={navToSearchResult}
                className="searchIcon"
            />
        </form>
    );
}

export default SearchBar;
