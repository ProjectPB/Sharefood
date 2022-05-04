import { AccountCircleOutlined, RestaurantOutlined } from '@material-ui/icons';
import React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import SearchHits from '../SearchHits';

import './styles.css';

const SearchResults = connectStateResults(({ searchState, searchResults, hideResults, indexName, handleIndexName }: any) => {
  const validQuery = searchState.query?.length >= 1;

  const config = {
    hideResults: hideResults,
    indexName: indexName,
  }

  return (
    validQuery &&
    <div className="searchResults">
      <div className="searchResults__header">
        <div onClick={() => handleIndexName('recipes')} className={`searchResults__headerWrapper ${indexName === 'recipes' ? 'searchResults__header--active' : 'undefined'}`}>
          <RestaurantOutlined />
          <p>Recipes</p>
        </div>
        <div onClick={() => handleIndexName('users')} className={`searchResults__headerWrapper ${indexName === 'users' ? 'searchResults__header--active' : 'undefined'}`}>
          <AccountCircleOutlined />
          <p>Users</p>
        </div>
      </div>

      {searchResults?.hits.length === 0 && <p className="searchResults__none">Could not find {indexName}</p>}
      <SearchHits {...config} />
    </div >
  )
});

export default SearchResults;