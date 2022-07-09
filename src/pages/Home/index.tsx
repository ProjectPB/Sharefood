import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesStart, setScrollDistanceStart, setSortFilter } from "../../redux/Recipes/recipes.actions";
import { getRecipesCounter } from "../../shared/functions";
import { useLanguage, useRecipeData, useWidth } from "../../hooks";
import { State } from "../../shared/types";
import { loadHomePopularRecipes, loadHomeRecentRecipes } from "../../redux/Loading/loading.actions";

import HomeRecipes from "../../components/HomeRecipes";
import Banner from "../../components/Banner";

import './styles.scss';

const mapState = ({ ui, recipes, loading }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
  language: ui.language,
  scrollDistance: recipes.scrollDistance.home,
  popularRecipesLoaded: loading.homePopularRecipesLoaded,
  recentRecipesLoaded: loading.homeRecentRecipesLoaded,
});

const HomePage: React.FC = () => {
  const placeholderData = [
    {
      id: '1',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '2',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '3',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '4',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '5',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '6',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '7',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '8',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
  ]
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
    homepageRef.current.scrollTo(0, scrollDistance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="homepage" ref={homepageRef} onScroll={() => setDistance(homepageRef.current?.scrollTop)}>

      <div className="homepage__container">
        <Banner />

        <HomeRecipes handleSortFilter={() => dispatch(setSortFilter('recent'))} title={LANG.HOMEPAGE.RECENT} loaded={recentRecipesLoaded} data={recentData} keepScroll={() => dispatch(setScrollDistanceStart({ distance: distance, store: 'home' }))} />
        <HomeRecipes handleSortFilter={() => dispatch(setSortFilter('views'))} title={LANG.HOMEPAGE.POPULAR} loaded={popularRecipesLoaded} data={popularData} keepScroll={() => dispatch(setScrollDistanceStart({ distance: distance, store: 'home' }))} />

        <div className="topUsers">
          <div className="users">
            <h2>TOP (summarized likes on all recipes)</h2>
            <div className="usersProfiles">
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
            </div>
          </div>

          <div className="users">
            {/* likes comments added recipes */}
            <h2>MOST RECIPES ADDED</h2>
            <div className="usersProfiles">
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={placeholderData[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default HomePage;
