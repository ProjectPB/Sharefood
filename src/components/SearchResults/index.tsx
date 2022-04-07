import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { RecipeData } from '../../shared/types';

import SearchResult from './../SearchResult';

import './styles.css';

const SearchResults = connectHits(({ hits, hideResults }: any) => {
  return (
    <div className="searchResults">
      {hits.map((hit: RecipeData) => (
        <SearchResult data={hit} hideResults={hideResults} />
      ))}
    </div >
  )
});

export default SearchResults;