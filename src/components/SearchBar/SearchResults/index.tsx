import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import { AccountCircleOutlined, RestaurantOutlined } from '@material-ui/icons';

import SearchHits from '../SearchHits';

import './styles.css';

const SearchResults = connectStateResults(({ searchResults, hideResults, indexName }: any) => {
  const config = {
    hideResults: hideResults,
    indexName: indexName,
  }

  return (
    <div className="searchResults">
      {indexName === 'recipes' &&
        <div className="searchResults__headerWrapper">
          <p>Recipes</p>
          <RestaurantOutlined />
        </div>}

      {indexName === 'users' &&
        <div className="searchResults__headerWrapper">
          <p>Users</p>
          <AccountCircleOutlined />
        </div>}

      {searchResults?.hits.length === 0 && <p className="searchResults__none">Could not find {indexName}</p>}
      <SearchHits {...config} />
    </div >
  )
});

export default SearchResults;