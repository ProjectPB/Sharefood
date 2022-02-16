import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useWidth } from "../../hooks";
import { fetchRecipesStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from "../../redux/Loading/loading.actions";
import { State } from "../../shared/types";

import Card from "../Card";
import NoData from "../NoData";
import Loading from "../Loading";

import "./styles.css";

const mapState = ({ user, ui, recipes, loading }) => ({
  currentUser: user.currentUser,
  sidebarOpen: ui.sidebarOpen,
  recipes: recipes.recipes,
  loaded: loading.recipesLoaded,
});

const RenderRecipes: React.FC = () => {
  const { currentUser, sidebarOpen, recipes, loaded } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = recipes;
  const recipesRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(8);
  const width = useWidth();
  const query = useQuery().get("q");
  const queryFilter = useQuery().get("q");
  const authorFilter = currentUser?.uid;
  const favoriteFilter = currentUser?.uid;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (width <= 1200 && width > 992) {
      setCounter(9);
    } else {
      setCounter(8);
    }
  }, [width]);

  useEffect(() => {
    if (query) {
      dispatch(fetchRecipesStart({ queryFilter }));
    } else {
      switch (location.pathname) {
        case "/":
          dispatch(fetchRecipesStart({ counter }));
          break;
        case "/popular":
          dispatch(fetchRecipesStart({ popularFilter: true, counter }));
          break;
        case "/my":
          dispatch(fetchRecipesStart({ authorFilter, counter }));
          break;
        case "/favorite":
          dispatch(fetchRecipesStart({ favoriteFilter, counter }));
          break;
        default:
          dispatch(loadRecipes(true));
          break;
      }
    }

    return () => {
      dispatch(loadRecipes(false));
    };
  }, [
    location.pathname,
    query,
    authorFilter,
    dispatch,
    favoriteFilter,
    queryFilter,
    counter,
  ]);

  const handleScroll = () => {
    if (recipesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = recipesRef.current;
      if (
        Math.ceil(scrollTop + clientHeight) === scrollHeight ||
        Math.ceil(scrollTop + clientHeight) - 1 === scrollHeight
      ) {
        !isLastPage && handleLoadMoreRecipes();
      }
    }
  };

  const handleLoadMoreRecipes = () => {
    switch (location.pathname) {
      case "/":
        dispatch(
          fetchRecipesStart({
            counter,
            startAfterDoc: queryDoc,
            persistProducts: data,
          })
        );
        break;
      case "/popular":
        dispatch(
          fetchRecipesStart({
            counter,
            startAfterDoc: queryDoc,
            persistProducts: data,
            popularFilter: true,
          })
        );
        break;
      case "/my":
        dispatch(
          fetchRecipesStart({
            authorFilter,
            counter,
            startAfterDoc: queryDoc,
            persistProducts: data,
          })
        );
        break;
      case "/favorite":
        dispatch(
          fetchRecipesStart({
            favoriteFilter,
            counter,
            startAfterDoc: queryDoc,
            persistProducts: data,
          })
        );
        break;
      default:
        dispatch(loadRecipes(true));
        break;
    }
  };

  const fillWithHiddenCards = () => {
    if (data?.length === 1) {
      return (
        <>
          <Card hidden />
          <Card hidden />
          <Card hidden />
        </>
      );
    } else if (data?.length === 2) {
      return (
        <>
          <Card hidden />
          <Card hidden />
        </>
      );
    } else if (data?.length === 3) {
      return (
        <>
          <Card hidden />
        </>
      );
    }
  };

  return (
    <div
      className="renderRecipes__container"
      onScroll={handleScroll}
      ref={recipesRef}
    >
      {!loaded && <Loading />}
      {query && (
        <h3 className="renderRecipes__text">
          Search results for {query} ({data?.length})
        </h3>
      )}
      {loaded && data?.length === 0 && <NoData />}
      <div
        className={`renderRecipes ${sidebarOpen && "renderRecipes--narrow"}`}
      >
        {data?.map(({ id, data }) => (
          <Card
            key={id}
            id={id}
            authorName={data?.authorName}
            authorProfilePic={data?.authorProfilePic}
            image={data?.image}
            timestamp={data?.timestamp}
            title={data?.title}
            type={data?.type}
            likesQuantity={data?.likesQuantity}
          />
        ))}
        {fillWithHiddenCards()}
      </div>
    </div>
  );
};

export default RenderRecipes;
