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

  const usersResultsConfig = {
    hideResults: () => setShowResults(false),
    index: 'users',
  }

  const recipesResultsConfig = {
    hideResults: () => setShowResults(false),
    index: 'recipes',
  }

  return (
    <div className={onHeader ? "searchBar__onHeader" : "searchBar"} onFocus={() => setShowResults(true)} ref={searchbarRef}>
      <InstantSearch indexName="recipes" searchClient={searchClient}>
        <div className="searchBar__container">
          <SearchInput />
          <div className="searchIcons__container">
            <ClearRefinements clearsQuery />
            <Search className="searchIcon" />
          </div>
        </div>

        {showResults &&
          <div className="searchBar__resultsContainer">
            <Configure
              hitsPerPage={5}
            />
            <SearchResults {...recipesResultsConfig} />
            <Index indexName="users">
              {showResults && <SearchResults {...usersResultsConfig} />}
              <Configure
                hitsPerPage={3}
              />
            </Index>
          </div>
        }
      </InstantSearch >
    </div >
  );
};

export default SearchBar;
