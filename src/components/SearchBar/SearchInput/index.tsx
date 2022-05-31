import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import './styles.scss';

const SearchInput = connectSearchBox(({ currentRefinement, refine }: any) => {
  return (
    <input
      type="input"
      value={currentRefinement}
      onChange={e => refine(e.currentTarget.value)}
      className="searchInput"
      placeholder="Search..."
    />
  )
});

export default SearchInput;