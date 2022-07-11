import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiltersTypes, Option, State } from "../../shared/types";
import { fetchRecipesStart, setScrollDistanceStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from '../../redux/Loading/loading.actions';
import { useLanguage, useRecipeData } from '../../hooks';
import { getLabelFromValue, invokeOnBottom } from '../../shared/functions';

import Recipes from '../Recipes';
import Loading from '../Loading';
import NoData from '../NoData';
import Profile from '../Profile';
import CustomSelect from '../forms/CustomSelect';

import "./styles.scss";

interface Props {
  filters: FiltersTypes;
  changeSort?: (option: string) => void;
  changeType?: (option: string) => void;
  changeTag?: (option: string) => void;
}

const mapState = ({ loading }: State) => ({
  loaded: loading.recipesLoaded,
});

const RecipesRenderer: React.FC<Props> = ({ filters, changeType, changeSort, changeTag }) => {
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
  }, [filters.counter, filters.typeFilter, filters.sortFilter, filters.tagFilter, filters.userId, filters?.lastDisplayedProfile]);

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
    setTimeout(() => {
      recipesContainerRef.current.scrollTo(0, scrollDistance);
    }, 1);
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

      {(filters.store === 'all') &&
        <div className="renderer__filtersContainer">
          <div className="renderer__filters">
            <CustomSelect
              type="sort"
              label={LANG.FILTERS.SORT}
              filters={LANG.FILTERS.sortFilters}
              update={(option: Option) => changeSort(option.value)}
              value={{ label: getLabelFromValue(LANG.FILTERS.sortFilters, filters.sortFilter), value: filters.sortFilter }}
            />

            <CustomSelect
              type="type"
              label={LANG.FILTERS.TYPE}
              filters={LANG.FILTERS.typeFilters}
              update={(option: Option) => changeType(option.value)}
              value={{ label: getLabelFromValue(LANG.FILTERS.typeFilters, filters.typeFilter), value: filters.typeFilter }}
            />

            <CustomSelect
              type="tag"
              label={LANG.FILTERS.TAG}
              filters={LANG.FILTERS.tagFilters}
              update={(option: Option) => changeTag(option.value)}
              value={{ label: getLabelFromValue(LANG.FILTERS.tagFilters, filters.tagFilter), value: filters.tagFilter }}
            />
          </div>
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