import React, { useRef, useState } from "react";
import { Index, InstantSearch, Pagination } from "react-instantsearch-dom";
import { Configure } from 'react-instantsearch-dom';
import { Search } from "@material-ui/icons";
import { searchClient } from "../../firebase/config";
import { useClickOutside } from "../../hooks";

import SearchResults from "./SearchResults";
import SearchInput from './SearchInput';
import ClearRefinements from './ClearRefinements';

import "./styles.scss";

interface Props {
  onHeader?: boolean;
}

const SearchBar: React.FC<Props> = ({ onHeader }) => {
  const [showResults, setShowResults] = useState(false);
  const [index, setIndex] = useState('recipes')
  const searchbarRef = useRef<HTMLDivElement>();
  useClickOutside(searchbarRef, () => setShowResults(false))

  const resultsConfig = {
    hideResults: () => setShowResults(false),
    indexName: index,
    changeIndex: (e: string) => setIndex(e),
  }

  const clearConfig = {
    clearsQuery: true,
    close: () => setShowResults(false),
    visible: showResults,
  }

  return (
    <div className={onHeader ? "searchBar__onHeader" : "searchBar"} onFocus={() => setShowResults(true)} ref={searchbarRef}>
      <InstantSearch indexName={index} searchClient={searchClient}>
        <div className="searchBar__container">
          <SearchInput />
          <div className="searchIcons__container">
            <ClearRefinements {...clearConfig} />
            <Search className="searchIcon" onClick={() => setShowResults(!showResults)} />
          </div>
        </div>

        <Configure
          hitsPerPage={5}
        />

        {showResults && <SearchResults {...resultsConfig} />}
      </InstantSearch >
    </div >
  );
};

export default SearchBar;
