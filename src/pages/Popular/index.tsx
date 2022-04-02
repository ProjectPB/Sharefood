import React, { Fragment, useEffect, useState } from "react";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";

import Recipes from './../../components/Recipes';

const PopularPage: React.FC = () => {
  const width = useWidth();
  const [counter, setCounter] = useState(() => getRecipesCounter(width));
  const filters = {
    popularFilter: true, store: 'popular', counter: counter
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width))
  }, [width]);

  return (
    <Fragment>
      <Recipes filters={filters} />
    </Fragment >
  );
};

export default PopularPage;
