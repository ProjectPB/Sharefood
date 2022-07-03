import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";
import { setSortFilter, setTypeFilter } from "../../redux/Recipes/recipes.actions";
import { Option, State } from "../../shared/types";

import RecipesRenderer from "../../components/Renderer";

const mapState = ({ ui, recipes }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
  typeFilter: recipes.filters.type,
  sortFilter: recipes.filters.sort,
});

const AllPage: React.FC = () => {
  const width = useWidth();
  const dispatch = useDispatch();
  const { sidebarIsOpen, typeFilter, sortFilter } = useSelector(mapState)
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));

  const filters = {
    store: 'all', counter: counter, sortFilter: sortFilter, typeFilter: typeFilter
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  const rendererConfig = {
    filters: filters,
    changeSort: (option: string) => dispatch(setSortFilter(option)),
    changeType: (option: string) => dispatch(setTypeFilter(option)),
  }

  return (
    <Fragment>
      <RecipesRenderer {...rendererConfig} />
    </Fragment >
  );
};

export default AllPage;
