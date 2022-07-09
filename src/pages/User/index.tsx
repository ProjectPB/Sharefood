import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWidth } from "../../hooks";
import { getRecipesCounter } from "../../shared/functions";
import { setLastDisplayedProfile } from "../../redux/UI/ui.actions";
import { State } from "../../shared/types";

import RecipesRenderer from "../../components/Renderer";

const mapState = ({ ui }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
  lastDisplayedProfile: ui.lastDisplayedProfile
});

const UserPage: React.FC = () => {
  const width = useWidth();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { sidebarIsOpen, lastDisplayedProfile } = useSelector(mapState)
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));

  const filters = {
    counter: counter, userId: lastDisplayedProfile, store: 'user', sortFilter: "recent"
  }

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  useEffect(() => {
    dispatch(setLastDisplayedProfile(userId));
  }, [userId, dispatch])

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