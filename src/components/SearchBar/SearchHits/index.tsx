import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { RecipeData, User } from '../../../shared/types';

import Hit from './Hit';

import './styles.scss';

const SearchHits = connectInfiniteHits(({ hits, hideResults, indexName }: any) => {
  return (
    <div className="searchHits">
      {indexName === 'recipes' && hits.map((hit: RecipeData) => (
        <Link to={`/recipe/${hit?.objectID}`}>
          <Hit key={hit?.objectID} title={hit?.title} type={hit?.type} image={hit?.imageLow} hideResults={() => hideResults()} hitType="recipe" />
        </Link>
      ))}

      {indexName === 'users' && hits.map((hit: User) => (
        <Link to={`/user/${hit?.objectID}`}>
          <Hit key={hit?.objectID} title={hit?.displayName} avatarSrc={hit?.profilePic} hideResults={() => hideResults()} hitType="user" />
        </Link>
      ))}
    </div>
  )
});

export default SearchHits;