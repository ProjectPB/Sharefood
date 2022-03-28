import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useWidth } from "../../hooks";
import { State } from "../../shared/types";

import Recipes from './../Recipes';
import NoData from "../NoData";
import WithAuth from './../../hoc/WithAuth';
import { getRecipesCounter } from "../../shared/functions";

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

interface Props {
  store?: string
}

const RenderRecipes: React.FC<Props> = ({ store }) => {
  const width = useWidth();
  const [counter] = useState(() => getRecipesCounter(width));
  const { currentUser } = useSelector(mapState);
  const queryFilter = useQuery().get("q");
  const authorFilter = currentUser?.uid;
  const favoriteFilter = currentUser?.uid;

  const mainFilters = {
    store: "main", counter
  }
  const popularFilters = {
    popularFilter: true, store: 'popular', counter
  }
  const myFilters = {
    authorFilter, store: 'my', counter
  }
  const favoriteFilters = {
    favoriteFilter, store: 'favorite', counter
  }
  const queryFilters = {
    queryFilter, store: "query", counter
  }

  return (
    <Fragment>
      {
        {
          'query': <Recipes filters={queryFilters} />,
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
