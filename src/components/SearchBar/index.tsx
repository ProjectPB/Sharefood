import { Search } from "@material-ui/icons";
import React from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "../../firebase/config";

import SearchResults from "../SearchResults";
import SearchInput from './../SearchInput';

import "./styles.css";

interface Props {
  onHeader?: boolean;
}

const SearchBar: React.FC<Props> = ({ onHeader }) => {
  return (
    <div className={onHeader ? "searchBar__onHeader" : "searchBar"}>
      <InstantSearch indexName="recipes" searchClient={searchClient}>
        <div className="searchBar__container">
          <SearchInput />
          <div className="searchIcon__container">
            <Search className="searchIcon" />
          </div>
        </div>
        <SearchResults />
      </InstantSearch >
    </div >
  );
};

export default SearchBar;
