import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { setRecentTypeFilter } from "../../redux/Recipes/recipes.actions";
import { getRecipesCounter } from "../../shared/functions";
import { State } from "../../shared/types";
import { typeFilters } from './../../shared/filters';

import RecipesRenderer from '../../components/RecipesRenderer';

const mapState = ({ ui, recipes }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
  typeFilter: recipes.filters.recentType
});

const MainPage: React.FC = () => {
  const width = useWidth();
  const dispatch = useDispatch();
  const { sidebarIsOpen, typeFilter } = useSelector(mapState);
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  const changeTypeFilter = (name: string) => {
    dispatch(setRecentTypeFilter(name))
  }

  const filters = {
    store: "main", counter: counter, typeFilter: typeFilter
  }

  const rendererConfig = {
    typesAvailable: true,
    filters: filters,
    changeType: (name: string) => changeTypeFilter(name),
    typeFilters: typeFilters
  }

  return (
    <Fragment>
      <RecipesRenderer {...rendererConfig} />
    </Fragment >
  );
};

export default MainPage;
