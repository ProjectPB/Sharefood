import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";
import { State } from "../../shared/types";

import RecipesRenderer from '../../components/Renderer';

const mapState = ({ ui }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
});

const MainPage: React.FC = () => {
  const width = useWidth();
  const { sidebarIsOpen } = useSelector(mapState);
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  const filters = {
    store: "main", counter: counter
  }

  const rendererConfig = {
    filters: filters,
  }

  return (
    <Fragment>
      <RecipesRenderer {...rendererConfig} />
    </Fragment >
  );
};

export default MainPage;
