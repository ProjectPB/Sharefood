import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { RecipeData } from '../../shared/types';

import Button from '../forms/Button';

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
              <img alt={hit?.title} src={hit?.image} className="searchHit__img" />
              <div className="searchHit__data">
                <p>{hit?.title}</p>
                <p>{hit?.type}</p>
              </div>
            </div>
          </Link>
        ))
        }
      </div>
      {hasMore &&
        <div className="searchHits__button">
          <Button {...loadMoreConfig}>Load more</Button>
        </div>
      }
    </div>
  )
});

export default SearchHits;