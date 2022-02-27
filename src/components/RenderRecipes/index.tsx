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

const mapState = ({ user, ui, recipes, loading }: State) => ({
  currentUser: user.currentUser,
  sidebarOpen: ui.sidebarOpen,
  recipes: recipes.recipes,
  loaded: loading.recipesLoaded,
});

const RenderRecipes: React.FC = () => {
  const { currentUser, sidebarOpen, recipes, loaded } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = recipes;
  const location = useLocation();
  const dispatch = useDispatch();
  const recipesRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(8);
  const width = useWidth();
  const queryFilter = useQuery().get("q");
  const authorFilter = currentUser?.uid;
  const favoriteFilter = currentUser?.uid;
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    if (width <= 1200 && width > 992) {
      setCounter(9);
    } else {
      setCounter(8);
    }
  }, [width]);

  useEffect(() => {
    if (queryFilter) {
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
          setLoadMore(false);
          break;
      }
    }

    return () => {
      dispatch(loadRecipes(false));
    };
  }, [
    location.pathname,
    authorFilter,
    dispatch,
    favoriteFilter,
    queryFilter,
    counter,
  ]);

  useEffect(() => {
    topRef.current.scrollIntoView(false)

  }, [location.pathname])

  const handleScroll = () => {
    if (recipesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = recipesRef.current;
      if (
        Math.ceil(scrollTop + clientHeight) === scrollHeight ||
        Math.ceil(scrollTop + clientHeight) - 1 === scrollHeight
      ) {
        !isLastPage && handleLoadMoreRecipes();
        setLoadMore(true);
      }
    }
  };

  const handleLoadMoreRecipes = () => {
    if (recipes.data.length === 0) {
      return;
    }

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

  const loadMoreRecipes = () => {
    if (loadMore && !isLastPage && !queryFilter) {
      return (
        <div className="renderRecipes__loading">
          <Loading />
        </div>
      )
    }
  }

  return (
    <div
      className="renderRecipes__container"
      onScroll={handleScroll}
      ref={recipesRef}
    >
      <div ref={topRef} />
      {!loaded && <Loading />}
      {queryFilter && (
        <h3 className="renderRecipes__text">
          Search results for {queryFilter} ({data?.length})
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
            authorName={data?.username}
            profilePic={data?.profilePic}
            image={data?.image}
            timestamp={data?.timestamp}
            title={data?.title}
            type={data?.type}
            likesQuantity={data?.likesQuantity}
          />
        ))}
        {fillWithHiddenCards()}
      </div>
      {loadMoreRecipes()}
    </div>
  );
};

export default RenderRecipes;
