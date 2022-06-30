import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiltersTypes, State } from "../../shared/types";
import { fetchRecipesStart, setScrollDistanceStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useLanguage, useRecipeData } from '../../hooks';
import { invokeOnBottom } from '../../shared/functions';

import Recipes from '../Recipes';
import Loading from '../Loading';
import NoData from '../NoData';
import Profile from '../Profile';
import Filters from '../Filters';

import "./styles.scss";

interface Props {
  filters: FiltersTypes;
  changeType?: (name: string) => void;
  changeStats?: (name: string) => void;
}

const mapState = ({ loading }: State) => ({
  loaded: loading.recipesLoaded,
});

const RecipesRenderer: React.FC<Props> = ({ filters, changeType, changeStats }) => {
  const dispatch = useDispatch();
  const { loaded } = useSelector(mapState);
  const LANG = useLanguage();
  const topRef = useRef<HTMLDivElement>(null);
  const recipesContainerRef = useRef<HTMLDivElement>(null);
  const [loadMore, setLoadMore] = useState(false);
  const { data, queryDoc, isLastPage, scrollDistance } = useRecipeData(filters.store);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [distance, setDistance] = useState(0);
  const [recipesHeight, setRecipesHeight] = useState(0);

  useEffect(() => {
    setRendered(true);
    if (rendered) {
      setFiltersChanged(true);
    }
    return () => {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.counter, filters.typeFilter, filters.statsFilter, filters.userId]);

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
    if (data?.length !== 0 && !isLastPage && recipesHeight > 20) {
      const { clientHeight } = recipesContainerRef.current;
      if (recipesHeight < clientHeight) {
        fetchMoreRecipes();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLastPage, recipesContainerRef.current?.clientHeight, recipesHeight])

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
    data: data,
    updateHeight: (height: number) => setRecipesHeight(height),
    keepScroll: () => dispatch(setScrollDistanceStart({ distance: distance, store: filters.store })),
  }

  return (
    <div
      className="renderer"
      onScroll={handleScroll}
      ref={recipesContainerRef}
    >
      <div ref={topRef} />

      {(filters.statsFilter || filters.typeFilter) &&
        <div className="renderer__filters">
          {filters.statsFilter &&
            <Filters
              type="stats"
              name={LANG.FILTERS.SORT}
              filters={LANG.FILTERS.statsFilters}
              update={(val) => changeStats(val)}
              activeFilter={filters.statsFilter}
            />
          }

          {filters.typeFilter &&
            <Filters
              type="type"
              name={LANG.FILTERS.TYPE}
              filters={LANG.FILTERS.typeFilters}
              update={(val) => changeType(val)}
              activeFilter={filters.typeFilter}
            />
          }
        </div>
      }

      {filters.userId &&
        <Profile id={filters.userId} />
      }

      {!loaded &&
        <div className="renderer__loading">
          <Loading />
        </div>
      }

      {loaded && data?.length === 0 &&
        <div className="renderer__noData">
          <NoData />
        </div>
      }

      {loaded &&
        <Recipes {...recipesConfig} />
      }

      {(loadMore && !isLastPage) &&
        <div className="renderer__loadingMore">
          <Loading />
        </div>
      }
    </div >
  )
}

export default RecipesRenderer;