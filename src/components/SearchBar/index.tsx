import { Search } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "../../firebase/config";
import { useClickOutside } from "../../hooks";

import SearchResults from "../SearchResults";
import SearchInput from './../SearchInput';

import "./styles.css";

interface Props {
  onHeader?: boolean;
}

const SearchBar: React.FC<Props> = ({ onHeader }) => {
  const [showResults, setShowResults] = useState(false);
  const searchbarRef = useRef<HTMLDivElement>();
  useClickOutside(searchbarRef, () => setShowResults(false))

  const resultsConfig = {
    hideResults: () => setShowResults(false)
  }

  return (
    <div className={onHeader ? "searchBar__onHeader" : "searchBar"} onFocus={() => setShowResults(true)} ref={searchbarRef}>
      <InstantSearch indexName="recipes" searchClient={searchClient}>
        <div className="searchBar__container">
          <SearchInput />
          <div className="searchIcon__container">
            <Search className="searchIcon" />
          </div>
        </div>
        {showResults && <SearchResults {...resultsConfig} />}
      </InstantSearch >
    </div >
  );
};

export default SearchBar;
