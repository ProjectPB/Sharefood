import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";
import { setStatsFilter, setTypeFilter } from "../../redux/Recipes/recipes.actions";
import { State } from "../../shared/types";

import RecipesRenderer from "../../components/Renderer";

const mapState = ({ ui, recipes }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
  typeFilter: recipes.filters.type,
  statsFilter: recipes.filters.stats,
});

const AllPage: React.FC = () => {
  const width = useWidth();
  const dispatch = useDispatch();
  const { sidebarIsOpen, typeFilter, statsFilter } = useSelector(mapState)
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));

  const filters = {
    store: 'all', counter: counter, typeFilter: typeFilter, statsFilter: statsFilter,
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  const changeTypeFilter = (name: string) => {
    dispatch(setTypeFilter(name))
  }

  const changeStatsFilter = (name: string) => {
    dispatch(setStatsFilter(name));
  }

  const rendererConfig = {
    filters: filters,
    changeType: (name: string) => changeTypeFilter(name),
    changeStats: (name: string) => changeStatsFilter(name),
  }

  return (
    <Fragment>
      <RecipesRenderer {...rendererConfig} />
    </Fragment >
  );
};

export default AllPage;
