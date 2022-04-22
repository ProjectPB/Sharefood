import React, { createRef, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../../shared/types";
import { fetchRecipesStart, setScrollDistanceStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useRecipeData } from '../../hooks';
import { invokeOnBottom } from '../../shared/functions';

import Recipes from '../Recipes';
import Loading from '../Loading';
import NoData from '../NoData';

import "./styles.css";

interface Props {
  filters: {
    counter?: number,
    store?: string,
    popularFilter?: boolean;
    typeFilter?: string;
    authorFilter?: string;
    favoriteFilter?: string;
  }
  typesAvailable?: boolean;
  changeType?: (name: string) => void;
}

const mapState = ({ loading }: State) => ({
  loaded: loading.recipesLoaded,
});

const RecipesRenderer: React.FC<Props> = ({ filters, typesAvailable, changeType }) => {
  const dispatch = useDispatch();
  const { loaded } = useSelector(mapState);
  const topRef = useRef<HTMLDivElement>(null);
  const recipesContainerRef = useRef<HTMLDivElement>(null);
  const recipesRef = createRef<HTMLDivElement>();
  const [loadMore, setLoadMore] = useState(false);
  const { data, queryDoc, isLastPage, scrollDistance } = useRecipeData(filters.store);
  const [widthChanged, setWidthChanged] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    console.log(filters.typeFilter);
    setRendered(true);
    if (rendered) {
      setWidthChanged(true);
    }
    return () => {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.counter, filters.typeFilter]);

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
  }, [data.length, dispatch, widthChanged]);

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

  const config = {
    ref: recipesRef,
    data: data,
    keepScroll: () => dispatch(setScrollDistanceStart({ distance: distance, store: filters.store })),
  }

  return (
    <div
      className="recipesRenderer__container"
      onScroll={handleScroll}
      ref={recipesContainerRef}
    >
      <div ref={topRef} />
      {typesAvailable && <div className="recipesRenderer__filters">
        <button className={filters.typeFilter === '' ? 'active' : undefined} onClick={() => changeType('')}>all</button>
        <button className={filters.typeFilter === 'breakfast' ? 'active' : undefined} onClick={() => changeType('breakfast')}>breakfast</button>
        <button className={filters.typeFilter === 'appetizer' ? 'active' : undefined} onClick={() => changeType('appetizer')}>appetizer</button>
        <button className={filters.typeFilter === 'soup' ? 'active' : undefined} onClick={() => changeType('soup')}>soup</button>
        <button className={filters.typeFilter === 'main' ? 'active' : undefined} onClick={() => changeType('main')}>main</button>
        <button className={filters.typeFilter === 'dessert' ? 'active' : undefined} onClick={() => changeType('dessert')}>dessert</button>
        <button className={filters.typeFilter === 'other' ? 'active' : undefined} onClick={() => changeType('other')}>other</button>
      </div>}
      {!loaded && <Loading />}
      {loaded && data?.length === 0 && <NoData />}
      <Recipes {...config} />
      {
        (loadMore && !isLastPage) &&
        <div className="recipesRenderer__loading">
          <Loading />
        </div>
      }
    </div >
  )
}

export default RecipesRenderer;