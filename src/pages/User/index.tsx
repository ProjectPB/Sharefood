import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";
import { State } from "../../shared/types";

import RecipesRenderer from "../../components/RecipesRenderer";

const mapState = ({ ui }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
});

const UserPage: React.FC = () => {
  const width = useWidth();
  const { userId } = useParams();
  const { sidebarIsOpen } = useSelector(mapState)
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));

  const filters = {
    counter: counter, userId: userId, store: 'user'
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  const rendererConfig = {
    filters: filters
  }

  return (
    <Fragment>
      <RecipesRenderer {...rendererConfig} />
    </Fragment >
  );
};

export default UserPage;
