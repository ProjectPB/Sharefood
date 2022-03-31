import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { State } from "../../shared/types";
import { getRecipesCounter } from "../../shared/functions";

import Recipes from './../Recipes';
import NoData from "../NoData";
import WithAuth from './../../hoc/WithAuth';

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

interface Props {
  store?: string
}

const RenderRecipes: React.FC<Props> = ({ store }) => {
  const { currentUser } = useSelector(mapState);
  const authorFilter = currentUser?.uid;
  const favoriteFilter = currentUser?.uid;
  const width = useWidth();
  const [counter, setCounter] = useState(() => getRecipesCounter(width));

  useEffect(() => {
    setCounter(getRecipesCounter(width))
  }, [width]);

  const mainFilters = {
    store: "main", counter: counter
  }
  const popularFilters = {
    popularFilter: true, store: 'popular', counter: counter
  }
  const myFilters = {
    authorFilter, store: 'my', counter: counter
  }
  const favoriteFilters = {
    favoriteFilter, store: 'favorite', counter: counter
  }

  return (
    <Fragment>
      {
        {
          'main': <Recipes filters={mainFilters} />,
          'popular': <Recipes filters={popularFilters} />,
          'my':
            <WithAuth>
              <Recipes filters={myFilters} />
            </WithAuth>,
          'favorite':
            <WithAuth>
              <Recipes filters={favoriteFilters} />
            </WithAuth>,
          '': <div className="recipes__container">
            <NoData />
          </div>
        }[store]
      }
    </Fragment >
  );
};

export default RenderRecipes;
