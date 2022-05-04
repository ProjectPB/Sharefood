import React, { useRef, useState } from "react";
import { InstantSearch } from "react-instantsearch-dom";
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
  const [indexName, setIndexName] = useState('recipes');
  const searchbarRef = useRef<HTMLDivElement>();
  useClickOutside(searchbarRef, () => setShowResults(false))

  const resultsConfig = {
    hideResults: () => setShowResults(false),
    indexName: indexName,
    handleIndexName: (name: string) => setIndexName(name)
  }

  return (
    <div className={onHeader ? "searchBar__onHeader" : "searchBar"} onFocus={() => setShowResults(true)} ref={searchbarRef}>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
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
            <SearchResults {...resultsConfig} />
          </div>
        }
      </InstantSearch >
    </div >
  );
};

export default SearchBar;
