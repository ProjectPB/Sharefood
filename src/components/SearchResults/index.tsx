import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { RecipeData } from '../../shared/types';

import SearchResult from './../SearchResult';

import './styles.css';

const SearchResults = ({ hits }: any) => {
  return (
    <div className="searchResults">
      {hits.map((hit: RecipeData) => (
        <SearchResult data={hit} />
      ))}
    </div >
  )
}

const CustomSearchResults = connectHits(SearchResults);

export default CustomSearchResults;