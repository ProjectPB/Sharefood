import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useWidth } from "../../hooks";
import { State } from "../../shared/types";

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
  const [counter, setCounter] = useState(8);
  const width = useWidth();
  const queryFilter = useQuery().get("q");
  const authorFilter = currentUser?.uid;
  const favoriteFilter = currentUser?.uid;

  useEffect(() => {
    if (width <= 1200 && width > 992) {
      setCounter(9);
    } else {
      setCounter(8);
    }
  }, [width]);

  const mainFilters = {
    counter, store: "main"
  }
  const popularFilters = {
    popularFilter: true, counter, store: 'popular',
  }
  const myFilters = {
    authorFilter, counter, store: 'my'
  }
  const favoriteFilters = {
    favoriteFilter, counter, store: 'favorite'
  }
  const queryFilters = {
    queryFilter, store: "query"
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
