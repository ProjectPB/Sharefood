import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesStart, setScrollDistanceStart, setSortFilter } from "../../redux/Recipes/recipes.actions";
import { getRecipesCounter } from "../../shared/functions";
import { useLanguage, useRecipeData, useWidth } from "../../hooks";
import { State } from "../../shared/types";
import { loadHomePopularRecipes, loadHomeRecentRecipes } from "../../redux/Loading/loading.actions";

import HomeRecipes from "../../components/HomeRecipes";
import Banner from "../../components/Banner";
import TopUsers from './../../components/TopUsers';

import './styles.scss';
import { Link } from "react-router-dom";

const mapState = ({ ui, recipes, loading }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
  language: ui.language,
  scrollDistance: recipes.scrollDistance.home,
  popularRecipesLoaded: loading.homePopularRecipesLoaded,
  recentRecipesLoaded: loading.homeRecentRecipesLoaded,
});

const HomePage: React.FC = () => {
  const { sidebarIsOpen, scrollDistance, popularRecipesLoaded, recentRecipesLoaded, language } = useSelector(mapState);
  const width = useWidth();
  const LANG = useLanguage();
  const dispatch = useDispatch();
  const homepageRef = useRef<HTMLDivElement>();
  const [counter, setCounter] = useState(() => getRecipesCounter(width, sidebarIsOpen));
  const [counterChanged, setCounterChanged] = useState(false);
  const [distance, setDistance] = useState(0);
  const [rendered, setRendered] = useState(false);
  const { data: recentData } = useRecipeData("homeRecent");
  const { data: popularData } = useRecipeData("homePopular");

  useEffect(() => {
    setCounter(getRecipesCounter(width, sidebarIsOpen))
  }, [width, sidebarIsOpen]);

  useEffect(() => {
    setRendered(true);
    if (rendered) {
      setCounterChanged(true);
    }
    return () => {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  useEffect(() => {
    if ((recentData.length === 0 && popularData.length === 0) || counterChanged) {
      dispatch(loadHomeRecentRecipes(false));
      dispatch(loadHomePopularRecipes(false));
      dispatch(fetchRecipesStart({ store: "homeRecent", counter: counter, sortFilter: "recent", language: language }));
      dispatch(fetchRecipesStart({ store: "homePopular", counter: counter, sortFilter: "likes", language: language }));
      setCounterChanged(false);
    }
  }, [counter, counterChanged, dispatch, popularData.length, recentData.length, language])

  useEffect(() => {
    setTimeout(() => {
      homepageRef.current.scrollTo(0, scrollDistance);
    }, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keepScroll = (): any => {
    dispatch(setScrollDistanceStart({ distance: distance, store: 'home' }))
  }

  return (
    <div className="homepage" ref={homepageRef} onScroll={() => setDistance(homepageRef.current?.scrollTop)}>

      <div className="homepage__container">
        <Banner keepScroll={keepScroll} />

        <HomeRecipes
          handleSortFilter={() => dispatch(setSortFilter('recent'))}
          title={LANG.HOMEPAGE.RECENT} loaded={recentRecipesLoaded}
          data={recentData}
          keepScroll={keepScroll} />

        <HomeRecipes
          handleSortFilter={() => dispatch(setSortFilter('views'))}
          title={LANG.HOMEPAGE.POPULAR} loaded={popularRecipesLoaded}
          data={popularData}
          keepScroll={keepScroll} />

        <TopUsers keepScroll={keepScroll} />

        <div className="homepage__links">
          <Link onClick={keepScroll} to="/privacy">{LANG.HOMEPAGE.PRIVACY_POLICY}</Link>
        </div>
      </div >
    </div >
  );
};

export default HomePage;
