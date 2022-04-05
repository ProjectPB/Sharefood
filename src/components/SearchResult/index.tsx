import React from 'react'
import { Link } from 'react-router-dom';
import { RecipeData } from '../../shared/types';

import './styles.css';

interface Props {
  data: RecipeData;
}

const SearchResult: React.FC<Props> = ({ data }) => {
  return (
    <Link to={`/recipe/${data.objectID}`}>
      <div className="searchResult" >
        <img alt={data.title} src={data.image} className="searchResult__img" />
        <div className="searchResult__data">
          <p>{data.title}</p>
          <p>{data.type}</p>
        </div>
      </div>
    </Link>
  )
}
export default SearchResult;