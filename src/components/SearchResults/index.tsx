import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import SearchHits from '../SearchHits';

import './styles.css';

const SearchResults = connectStateResults(({ searchState, hideResults }: any) => {
  const validQuery = searchState.query?.length >= 1;

  const config = {
    hideResults: hideResults,
  }

  return (
    <div className="searchResults">
      {validQuery &&
        <SearchHits {...config} />
      }
    </div >
  )
});

export default SearchResults;