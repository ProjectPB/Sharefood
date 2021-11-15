import React, { useState } from "react";
import { useHistory } from "react-router";
import { Search } from "@material-ui/icons";
import "./styles.css";

const SearchBar = ({ onHeader }) => {
  const [input, setInput] = useState("");
  const history = useHistory();

  const navToSearchResult = (e) => {
    e.preventDefault();

    const loweredInput = input[0]?.toLowerCase() + input.substring(1);

    const trimmedInput = loweredInput.trim();

    input && trimmedInput && history.push(`/results/?q=${trimmedInput}`);

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
      <div className="searchIcon__container" onClick={navToSearchResult}>
        <Search className="searchIcon" />
      </div>
    </form>
  );
};

export default SearchBar;
