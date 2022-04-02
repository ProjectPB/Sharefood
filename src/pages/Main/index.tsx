import React, { Fragment, useEffect, useState } from "react";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";

import Recipes from './../../components/Recipes';

const MainPage: React.FC = () => {
  const width = useWidth();
  const [counter, setCounter] = useState(() => getRecipesCounter(width));

  useEffect(() => {
    setCounter(getRecipesCounter(width))
  }, [width]);

  const filters = {
    store: "main", counter: counter
  }
  return (
    <Fragment>
      <Recipes filters={filters} />
    </Fragment >
  );
};

export default MainPage;
