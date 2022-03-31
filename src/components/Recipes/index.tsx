import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../../shared/types";
import { fetchRecipesStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useRecipeData } from '../../hooks';
import { fillWithHiddenCards } from '../../shared/functions';

import Card from '../Card';
import Loading from '../Loading';
import NoData from '../NoData';

import "./styles.css";

interface Props {
  filters: {
    counter?: number,
    store?: string,
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
    if (data.length === 0) {
      dispatch(loadRecipes(false));
      dispatch(fetchRecipesStart(filters));
    }

    if (widthChanged) {
      dispatch(loadRecipes(false));
      dispatch(fetchRecipesStart(filters));
      setWidthChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, dispatch, widthChanged])

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

  return (
    <div
      className="recipes__container"
      onScroll={handleScroll}
      ref={recipesRef}
    >
      <div ref={topRef} />
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
        {fillWithHiddenCards(data)}
      </div>
      {(loadMore && !isLastPage) &&
        <div className="recipes__loading">
          <Loading />
        </div>}
    </div>
  )
}

export default Recipes;