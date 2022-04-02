import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { State } from "../../shared/types";
import { getRecipesCounter } from "../../shared/functions";

import WithAuth from './../../hoc/WithAuth';
import Recipes from './../../components/Recipes';

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const FavoritePage: React.FC = () => {
  const { currentUser } = useSelector(mapState);
  const favoriteFilter = currentUser?.uid;
  const width = useWidth();
  const [counter, setCounter] = useState(() => getRecipesCounter(width));
  const filters = {
    favoriteFilter, store: 'favorite', counter: counter
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width))
  }, [width]);

  return (
    <Fragment>
      <WithAuth>
        <Recipes filters={filters} />
      </WithAuth>
    </Fragment >
  );
};

export default FavoritePage;
