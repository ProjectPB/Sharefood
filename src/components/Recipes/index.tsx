import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../../shared/types";
import { fetchRecipesStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useRecipeData } from '../../hooks';

import Card from '../Card';
import Loading from '../Loading';
import NoData from '../NoData';

import "./styles.css";

interface Props {
  filters: {
    counter?: number,
    store?: string,
    queryFilter?: string,
    popularFilter?: boolean;
    authorFilter?: string;
    favoriteFilter?: string;
  }
}

const mapState = ({ loading, ui }: State) => ({
  loaded: loading.recipesLoaded,
  sidebarOpen: ui.sidebarOpen,
});

const Recipes: React.FC<Props> = ({ filters }) => {
  const dispatch = useDispatch();
  const { loaded, sidebarOpen } = useSelector(mapState);
  const [loadMore, setLoadMore] = useState(false);
  const { data, queryDoc, isLastPage } = useRecipeData(filters.store);
  const recipesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.length === 0 || filters.queryFilter) {
      dispatch(loadRecipes(false));
      dispatch(fetchRecipesStart(filters));
    }
  }, [data.length, filters.queryFilter, dispatch])

  const handleScroll = () => {
    if (recipesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = recipesRef.current;
      if (
        Math.ceil(scrollTop + clientHeight) === scrollHeight ||
        Math.ceil(scrollTop + clientHeight) - 1 === scrollHeight
      ) {
        !isLastPage && handleLoadMoreRecipes();
        setLoadMore(true);
      }
    }
  };

  const handleLoadMoreRecipes = () => {
    dispatch(
      fetchRecipesStart({
        ...filters, startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  }

  const fillWithHiddenCards = () => {
    if (data?.length === 1) {
      return (
        <>
          <Card hidden />
          <Card hidden />
          <Card hidden />
        </>
      );
    } else if (data?.length === 2) {
      return (
        <>
          <Card hidden />
          <Card hidden />
        </>
      );
    } else if (data?.length === 3) {
      return (
        <>
          <Card hidden />
        </>
      );
    }
  };

  const loadMoreRecipes = () => {
    if (loadMore && !isLastPage && !filters.queryFilter) {
      return (
        <div className="recipes__loading">
          <Loading />
        </div>
      )
    }
  }

  return (
    <div
      className="recipes__container"
      onScroll={handleScroll}
      ref={recipesRef}
    >
      {
        filters.queryFilter && (
          <h3 className="recipes__text">
            Search results for {filters.queryFilter}{loaded ? ` (${data?.length})` : '...'}
          </h3>
        )
      }
      {!loaded && <Loading />}
      {loaded && data?.length === 0 && <NoData />}
      <div
        className={`recipes ${sidebarOpen && "recipes--narrow"}`}
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
            likesQuantity={data?.likesQuantity}
          />
        ))}
        {fillWithHiddenCards()}
      </div>
      {loadMoreRecipes()}
    </div>
  )
}

export default Recipes;