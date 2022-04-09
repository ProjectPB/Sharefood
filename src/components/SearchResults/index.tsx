import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import SearchHits from '../SearchHits';

import './styles.css';

const SearchResults = connectStateResults(({ searchState, searchResults, hideResults }: any) => {
  const validQuery = searchState.query?.length >= 1;

  const config = {
    hideResults: hideResults,
  }

  return (
    validQuery && searchResults?.hits.length > 0 &&
    <div className="searchResults">
      <SearchHits {...config} />
    </div >
  )
});

export default SearchResults;