import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";
import { setPopularStatsFilter, setPopularTypeFilter } from "../../redux/Recipes/recipes.actions";
import { State } from "../../shared/types";
import { typeFilters } from './../../shared/filters';

import RecipesRenderer from "../../components/RecipesRenderer";

const mapState = ({ ui, recipes }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
  typeFilter: recipes.filters.popularType,
  statsFilter: recipes.filters.popularStats
});

const PopularPage: React.FC = () => {
  const width = useWidth();
  const dispatch = useDispatch();
  const { sidebarIsOpen, typeFilter, statsFilter } = useSelector(mapState)
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));

  const filters = {
    store: 'popular', counter: counter, typeFilter: typeFilter, statsFilter: statsFilter,
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  const changeTypeFilter = (name: string) => {
    dispatch(setPopularTypeFilter(name))
  }

  const changeStatsFilter = (name: string) => {
    dispatch(setPopularStatsFilter(name));
  }

  const rendererConfig = {
    typesAvailable: true,
    statsAvailable: true,
    filters: filters,
    changeType: (name: string) => changeTypeFilter(name),
    changeStats: (name: string) => changeStatsFilter(name),
    typeFilters: typeFilters
  }

  return (
    <Fragment>
      <RecipesRenderer {...rendererConfig} />
    </Fragment >
  );
};

export default PopularPage;
