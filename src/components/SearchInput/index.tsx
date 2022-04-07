import React from 'react';
import { createConnector } from 'react-instantsearch-dom';

import './styles.css';

const connectWithQuery = createConnector({
  displayName: 'WidgetWithQuery',
  getProvidedProps(props, searchState) {
    const currentRefinement = searchState.attributeForMyQuery;
    return { currentRefinement };
  },
  refine(props, searchState, nextRefinement) {
    return {
      ...searchState,
      attributeForMyQuery: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    return searchParameters.setQuery(searchState.attributeForMyQuery || '');
  },
  cleanUp(props, searchState) {
    const { attributeForMyQuery, ...nextSearchState } = searchState;
    return nextSearchState;
  },
});

const SearchInput = connectWithQuery(({ currentRefinement, refine }: any) => {
  return (
    <input
      type="input"
      value={currentRefinement}
      onChange={e => refine(e.currentTarget.value)}
      className="searchInput"
      placeholder="Find the recipe..."
    />
  )
});

export default SearchInput;