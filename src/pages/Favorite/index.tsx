import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { State } from "../../shared/types";
import { getRecipesCounter } from "../../shared/functions";

import WithAuth from './../../hoc/WithAuth';
import RecipesRenderer from "../../components/Renderer";

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
  language: ui.language,
});

const FavoritePage: React.FC = () => {
  const { currentUser, sidebarIsOpen, language } = useSelector(mapState);
  const favoriteFilter = currentUser?.uid;
  const width = useWidth();
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));
  const filters = {
    favoriteFilter, store: 'favorite', counter: counter, language: language
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  return (
    <Fragment>
      <WithAuth>
        <RecipesRenderer filters={filters} />
      </WithAuth>
    </Fragment >
  );
};

export default FavoritePage;
