import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../../shared/types";
import { fetchRecipesStart, setScrollDistanceStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useRecipeData } from '../../hooks';
import { fillWithHiddenCards, invokeOnBottom } from '../../shared/functions';

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
  const recipesContainerRef = useRef<HTMLDivElement>(null);
  const recipesRef = useRef<HTMLDivElement>(null);
  const [loadMore, setLoadMore] = useState(false);
  const { data, queryDoc, isLastPage, scrollDistance } = useRecipeData(filters.store);
  const [widthChanged, setWidthChanged] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [distance, setDistance] = useState(0);

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
    if (data?.length !== 0) {
      const { clientHeight } = recipesContainerRef.current;
      const { scrollHeight } = recipesRef.current
      if (scrollHeight < clientHeight) {
        fetchMoreRecipes();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, recipesContainerRef.current?.clientHeight, recipesRef.current?.scrollHeight])

  useEffect(() => {
    recipesContainerRef.current.scrollTo(0, scrollDistance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreRecipes = () => {
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

  const handleScroll = () => {
    invokeOnBottom(recipesContainerRef, fetchMoreRecipes);
    setDistance(recipesContainerRef.current?.scrollTop)
  }

  return (
    <div
      className="recipes__container"
      onScroll={handleScroll}
      ref={recipesContainerRef}
    >
      <div ref={topRef} />
      {!loaded && <Loading />}
      {loaded && data?.length === 0 && <NoData />}
      <div ref={recipesRef}
        className={`recipes ${sidebarOpen ? "recipes--narrow" : "recipes--wide"}`}
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
            keepScrollHeight={() => dispatch(setScrollDistanceStart({ distance: distance, store: filters.store }))}
          />
        ))}
        {fillWithHiddenCards(data)}
      </div>
      {
        (loadMore && !isLastPage) &&
        <div className="recipes__loading">
          <Loading />
        </div>
      }
    </div >
  )
}

export default Recipes;