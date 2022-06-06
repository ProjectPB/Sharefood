import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useLanguage } from '../../../hooks';

import './styles.scss';

const SearchInput = connectSearchBox(({ currentRefinement, refine }: any) => {
  const LANG = useLanguage();

  return (
    <input
      type="input"
      value={currentRefinement}
      onChange={e => refine(e.currentTarget.value)}
      className="searchInput"
      placeholder={LANG.HEADER.SEARCH}
    />
  )
});

export default SearchInput;