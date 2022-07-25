import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useLanguage, useWidth } from "../../hooks";
import { State } from "../../shared/types";
import { getRecipesCounter } from "../../shared/functions";

import RecipesRenderer from '../../components/Renderer';
import WithAuth from './../../hoc/WithAuth';

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
});

const MyPage: React.FC = () => {
  const { currentUser, sidebarIsOpen } = useSelector(mapState);
  const authorFilter = currentUser?.uid;
  const width = useWidth();
  const LANG = useLanguage();
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));
  const filters = {
    authorFilter, store: 'my', counter: counter, language: ""
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  return (
    <WithAuth>
      <Helmet>
        <title>{LANG.HELMET.YOURS} | Sharefood</title>
      </Helmet>
      <RecipesRenderer filters={filters} />
    </WithAuth>
  );
};

export default MyPage;
