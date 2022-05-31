import { Avatar } from '@material-ui/core';
import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { RecipeData, User } from '../../../shared/types';

import './styles.scss';

const SearchHits = connectInfiniteHits(({ hits, hideResults, indexName }: any) => {
  return (
    <div className="searchHits">
      {indexName === 'recipes' && hits.map((hit: RecipeData) => (
        <Link to={`/recipe/${hit?.objectID}`}>
          <div className="searchHit" onClick={hideResults}>
            <div className="searchHit__data">
              <h2 className="searchHit__title">{hit?.title}</h2>
              <h3 className="searchHit__type">{hit?.type}</h3>
            </div>
            <img alt={hit?.title} src={hit?.imageLow ? hit?.imageLow : hit?.image} className="searchHit__recipeImg" />
          </div>
        </Link>
      ))}

      {indexName === 'users' && hits.map((hit: User) => (
        <Link to={`/user/${hit?.objectID}`}>
          <div className="searchHit" onClick={hideResults}>
            <div className="searchHit__data">
              <div className="searchHit__title">{hit?.displayName}</div>
            </div>
            <Avatar src={hit?.profilePic} alt={hit?.displayName} className="searchHit__profileImg" />
          </div>
        </Link>
      ))}
    </div>
  )
});

export default SearchHits;