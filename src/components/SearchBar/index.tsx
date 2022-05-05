import React, { useRef, useState } from "react";
import { Index, InstantSearch } from "react-instantsearch-dom";
import { Configure } from 'react-instantsearch-dom';
import { Search } from "@material-ui/icons";
import { searchClient } from "../../firebase/config";
import { useClickOutside } from "../../hooks";

import SearchResults from "./SearchResults";
import SearchInput from './SearchInput';
import ClearRefinements from './ClearRefinements';

import "./styles.css";

interface Props {
  onHeader?: boolean;
}

const SearchBar: React.FC<Props> = ({ onHeader }) => {
  const [showResults, setShowResults] = useState(false);
  const searchbarRef = useRef<HTMLDivElement>();
  useClickOutside(searchbarRef, () => setShowResults(false))

  const recipesConfig = {
    hideResults: () => setShowResults(false),
    indexName: 'recipes'
  }

  const usersConfig = {
    hideResults: () => setShowResults(false),
    indexName: 'users'
  }

  return (
    <div className={onHeader ? "searchBar__onHeader" : "searchBar"} onFocus={() => setShowResults(true)} ref={searchbarRef}>
      <InstantSearch indexName='recipes' searchClient={searchClient}>
        <div className="searchBar__container">
          <SearchInput />
          <div className="searchIcons__container">
            <ClearRefinements clearsQuery />
            <Search className="searchIcon" />
          </div>
        </div>

        <Configure
          hitsPerPage={5}
        />

        {showResults &&
          <div className="searchBar__resultsContainer">
            <SearchResults {...recipesConfig} />
            <Index indexName="users">
              <SearchResults {...usersConfig} />
            </Index>
          </div>
        }
      </InstantSearch >
    </div >
  );
};

export default SearchBar;
