import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";
import { State } from "../../shared/types";

import Recipes from './../../components/Recipes';

const mapState = ({ ui }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
});

const PopularPage: React.FC = () => {
  const width = useWidth();
  const { sidebarIsOpen } = useSelector(mapState)
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));
  const filters = {
    popularFilter: true, store: 'popular', counter: counter
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  return (
    <Fragment>
      <Recipes filters={filters} />
    </Fragment >
  );
};

export default PopularPage;
