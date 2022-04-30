import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import SearchHits from '../SearchHits';

import './styles.css';

const SearchResults = connectStateResults(({ searchState, searchResults, hideResults, index }: any) => {
  const validQuery = searchState.query?.length >= 1;

  const usersConfig = {
    hideResults: hideResults,
    index: 'users',
  }

  const recipesConfig = {
    hideResults: hideResults,
    index: 'recipes',
  }

  return (
    validQuery &&
    <div className="searchResults">
      {searchResults?.hits.length === 0 && <p>Could not find {index}</p>}
      {index === 'recipes' && <SearchHits {...recipesConfig} />}
      {index === 'users' && <SearchHits {...usersConfig} />}
    </div >
  )
});

export default SearchResults;