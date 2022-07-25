import React from 'react';
import { useLanguage } from '../../../hooks';
import { connectStateResults } from 'react-instantsearch-dom';
import { Person, RestaurantOutlined } from '@material-ui/icons';

import SearchHits from '../SearchHits';

import './styles.scss';

const SearchResults = connectStateResults(({ searchState, searchResults, hideResults, indexName, changeIndex }: any) => {
  const LANG = useLanguage();

  const config = {
    hideResults: hideResults,
    indexName: indexName,
  }

  return (
    <div className="searchResults" style={!(searchState && searchState.query) ? { display: 'none' } : { display: 'block' }}>
      <div className="searchResults__container">
        <div className="searchResults__header">
          <div className={indexName === "recipes" ? "searchResults__headerWrapper active" : "searchResults__headerWrapper"} onClick={() => changeIndex('recipes')}>
            <p>{LANG.MISC.RECIPES}</p>
            <RestaurantOutlined />
          </div>

          <div className={indexName === "users" ? "searchResults__headerWrapper active" : "searchResults__headerWrapper"} onClick={() => changeIndex('users')}>
            <p>{LANG.MISC.USERS}</p>
            <Person />
          </div>
        </div>

        {searchResults?.hits.length === 0 && <p className="searchResults__none">{LANG.MISC.SEARCH_NOT_FOUND}</p>}
        <SearchHits {...config} />
      </div>
    </div>
  )
});

export default SearchResults;