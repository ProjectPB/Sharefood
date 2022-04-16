import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { RecipeData } from '../../../shared/types';

import Button from '../../forms/Button';

import './styles.css';

const SearchHits = connectInfiniteHits(({ hits, hideResults, refineNext, hasMore }: any) => {
  const loadMoreConfig = {
    onClick: refineNext,
  }

  return (
    <div className="searchHits">
      <div className="searchHits__container">
        {hits.map((hit: RecipeData) => (
          <Link to={`/recipe/${hit?.objectID}`}>
            <div className="searchHit" onClick={hideResults}>
              <div className="searchHit__data">
                <h2 className="searchHit__title">{hit?.title}</h2>
                <h3 className="searchHit__type">{hit?.type}</h3>
              </div>
              <img alt={hit?.title} src={hit?.imageLow ? hit?.imageLow : hit?.image} className="searchHit__img" />
            </div>
          </Link>
        ))}
      </div>

      {hasMore &&
        <div className="searchHits__button">
          <Button {...loadMoreConfig}>Load more</Button>
        </div>}
    </div >
  )
});

export default SearchHits;