import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../../shared/types";
import { fetchRecipesStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useQuery, useRecipeData } from '../../hooks';
import { fillWithHiddenCards } from '../../shared/functions';

import Card from '../Card';
import Loading from '../Loading';
import NoData from '../NoData';

import './styles.css';

const mapState = ({ loading, ui }: State) => ({
  loaded: loading.recipesLoaded,
  sidebarOpen: ui.sidebarOpen,
});

const QueryRecipes: React.FC = () => {
  const dispatch = useDispatch();
  const { loaded, sidebarOpen } = useSelector(mapState);
  const { data } = useRecipeData('query');
  const queryFilter = useQuery().get("q");
  const filters = {
    queryFilter, store: "query"
  }

  useEffect(() => {
    dispatch(loadRecipes(false));
    dispatch(fetchRecipesStart(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilter, dispatch])

  return (
    <div className="queryRecipes__container" >
      {queryFilter && <h3 className="queryRecipes__text">
        Search results for {queryFilter}{loaded ? ` (${data?.length})` : '...'}
      </h3>}
      {!loaded && <Loading />}
      {loaded && data?.length === 0 && <NoData />}
      <div
        className={`queryRecipes ${sidebarOpen && "queryRecipes--narrow"}`}
      >
        {data?.map(({ id, data }) => (
          <Card
            key={id}
            id={id}
            username={data?.username}
            profilePic={data?.profilePic}
            image={data?.image}
            timestamp={data?.timestamp}
            title={data?.title}
            type={data?.type}
          />
        ))}
        {fillWithHiddenCards(data)}
      </div>
    </div>
  )
}

export default QueryRecipes;