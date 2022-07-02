import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLanguage, useRecipeData } from '../../hooks';
import { fetchRecipesStart } from '../../redux/Recipes/recipes.actions';
import { State } from '../../shared/types';
import Loading from '../Loading';
import NoData from '../NoData';

import MoreCard from './MoreCard';

import './styles.scss'

interface Props {
  filter: string, excludeId: string,
}

const mapState = ({ loading }: State) => ({
  loaded: loading.relatedRecipesLoaded
});

const MoreRecipes = ({ filter, excludeId }: Props) => {
  const { data } = useRecipeData('related');
  const { loaded } = useSelector(mapState);
  const dispatch = useDispatch();
  const LANG = useLanguage();

  useEffect(() => {
    dispatch(fetchRecipesStart({ store: "related", counter: 5, typeFilter: filter, excludeId: excludeId }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className='moreRecipes'>
      <h1>{LANG.RECIPE.MORE}</h1>

      <div className="moreRecipes__cards">
        {!loaded && <div className="moreRecipes__loading"><Loading /></div>}
        {loaded && (data.length === 0) && <div className="moreRecipes__loading"><NoData /></div>}

        {data.map(({ id, data }) => (
          <Link to={`/recipe/${id}`} key={id}>
            <MoreCard id={id} img={data?.image} title={data?.title} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MoreRecipes;