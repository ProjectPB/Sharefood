import React, { createRef, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Filters, State } from "../../shared/types";
import { fetchRecipesStart, setScrollDistanceStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useRecipeData } from '../../hooks';
import { invokeOnBottom } from '../../shared/functions';

import Recipes from '../Recipes';
import Loading from '../Loading';
import NoData from '../NoData';

import "./styles.css";
import { statsFilters } from '../../shared/filters';

interface Props {
  filters: Filters
  typesAvailable?: boolean;
  statsAvailable?: boolean;
  changeType?: (name: string) => void;
  changeStats?: (name: string) => void;
  typeFilters?: { name: string, value: string }[]
}

const mapState = ({ loading }: State) => ({
  loaded: loading.recipesLoaded,
});

const RecipesRenderer: React.FC<Props> = ({ filters, typesAvailable, changeType, typeFilters, statsAvailable, changeStats }) => {
  const dispatch = useDispatch();
  const { loaded } = useSelector(mapState);
  const topRef = useRef<HTMLDivElement>(null);
  const recipesContainerRef = useRef<HTMLDivElement>(null);
  const recipesRef = createRef<HTMLDivElement>();
  const [loadMore, setLoadMore] = useState(false);
  const { data, queryDoc, isLastPage, scrollDistance } = useRecipeData(filters.store);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setRendered(true);
    if (rendered) {
      setFiltersChanged(true);
    }
    return () => {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.counter, filters.typeFilter, filters.statsFilter]);

  useEffect(() => {
    if (data.length === 0 && !isLastPage) {
      dispatch(loadRecipes(false));
      dispatch(fetchRecipesStart(filters));
    }

    if (filtersChanged) {
      dispatch(loadRecipes(false));
      dispatch(fetchRecipesStart(filters));
      setFiltersChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, dispatch, filtersChanged]);

  useEffect(() => {
    if (data?.length !== 0 && !isLastPage && recipesRef.current && recipesContainerRef.current) {
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

  const recipesConfig = {
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

      <div className="recipesRenderer__filters">
        {statsAvailable &&
          <div className="recipesRenderer__statsFilters">
            <select onChange={(e) => changeStats(e.target.value)} defaultValue={filters.statsFilter}>
              {statsFilters.map(({ value, name }, id) => (
                <option key={id} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        }
        {typesAvailable &&
          <div className="recipesRenderer__typeFilters">
            {typeFilters.map((({ value, name }, id) => (
              <button
                key={id}
                className={filters.typeFilter === value ? "active" : undefined}
                onClick={() => changeType(value)}
              >
                {name}
              </button>
            )))}
          </div>
        }
      </div>

      {!loaded &&
        <div className="recipesRenderer__loading">
          <Loading />
        </div>
      }

      {loaded && data?.length === 0 &&
        <div className="recipesRenderer__noData">
          <NoData />
        </div>
      }

      {loaded && <Recipes {...recipesConfig} />}

      {(loadMore && !isLastPage) &&
        <div className="recipesRenderer__loadingMore">
          <Loading />
        </div>
      }
    </div >
  )
}

export default RecipesRenderer;