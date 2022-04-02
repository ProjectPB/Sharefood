import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { State } from "../../shared/types";
import { getRecipesCounter } from "../../shared/functions";

import Recipes from './../../components/Recipes';
import WithAuth from './../../hoc/WithAuth';

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const MyPage: React.FC = () => {
  const { currentUser } = useSelector(mapState);
  const authorFilter = currentUser?.uid;
  const width = useWidth();
  const [counter, setCounter] = useState(() => getRecipesCounter(width));
  const filters = {
    authorFilter, store: 'my', counter: counter
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

export default MyPage;
