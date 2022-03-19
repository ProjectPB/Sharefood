import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search } from "@material-ui/icons";
import { Handler } from "../../shared/types";

import "./styles.css";

interface Props {
  onHeader?: boolean;
}

const SearchBar: React.FC<Props> = ({ onHeader }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const navToSearchResult = (e: Handler["void"]) => {
    e.preventDefault();

    const loweredInput = input[0]?.toLowerCase() + input.substring(1);

    const trimmedInput = loweredInput.trim();

    input && trimmedInput && navigate(`/results/?q=${trimmedInput}`);

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
