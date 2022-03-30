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
  const topRef = useRef<HTMLDivElement>(null);
  const recipesRef = useRef<HTMLDivElement>(null);
  const [loadMore, setLoadMore] = useState(false);
  const { data, queryDoc, isLastPage } = useRecipeData(filters.store);
  const [widthChanged, setWidthChanged] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (data.length === 0 || filters.queryFilter) {
      dispatch(loadRecipes(false));
      dispatch(fetchRecipesStart(filters));
    }

    if (widthChanged) {
      dispatch(loadRecipes(false));
      dispatch(fetchRecipesStart(filters));
      setWidthChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, filters.queryFilter, dispatch, widthChanged])

  useEffect(() => {
    setRendered(true);
    if (rendered) {
      setWidthChanged(true);
    }
    return () => {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.counter]);

  useEffect(() => {
    topRef.current.scrollIntoView(false)
  }, [filters.store])

  const handleScroll = () => {
    if (recipesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = recipesRef.current;
      if (
        Math.ceil(scrollTop + clientHeight) === scrollHeight ||
        Math.ceil(scrollTop + clientHeight) - 1 === scrollHeight
      ) {
        if (!isLastPage && data.length !== 0) {
          setLoadMore(true);
          dispatch(
            fetchRecipesStart({
              ...filters, startAfterDoc: queryDoc,
              persistProducts: data
            })
          );
        }
      }
    }
  };

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

  return (
    <div
      className="recipes__container"
      onScroll={handleScroll}
      ref={recipesRef}
    >
      <div ref={topRef} />
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
          />
        ))}
        {fillWithHiddenCards()}
      </div>
      {(loadMore && !isLastPage && !filters.queryFilter) &&
        <div className="recipes__loading">
          <Loading />
        </div>}
    </div>
  )
}

export default Recipes;