import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "./../../hooks";
import Card from "../Card";
import NoData from "../NoData";
import { fetchRecipesStart } from "../../redux/Recipes/recipes.actions";
import { loadRecipes } from "./../../redux/Loading/loading.actions";
import Loading from "./../Loading";
import "./styles.css";

const mapState = ({ user, ui, recipes, loading }) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarIsOpen,
  recipes: recipes.recipes,
  loaded: loading.recipesLoaded,
});

const RenderRecipes = () => {
  const { currentUser, sidebarIsOpen, recipes, loaded } = useSelector(mapState);
  const query = useQuery().get("q");
  const queryFilter = useQuery().get("q");
  const authorFilter = currentUser?.uid;
  const favoriteFilter = currentUser?.uid;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(fetchRecipesStart({ queryFilter }));
      dispatch(loadRecipes(false));
    } else {
      switch (location.pathname) {
        case "/":
          dispatch(fetchRecipesStart());
          break;
        case "/popular":
          dispatch(fetchRecipesStart({ popularFilter: true }));
          break;
        case "/my":
          dispatch(fetchRecipesStart({ authorFilter }));
          break;
        case "/favorite":
          dispatch(fetchRecipesStart({ favoriteFilter }));
          break;
        default:
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
  ]);

  const fillWithHiddenCards = () => {
    if (recipes.length === 1) {
      return (
        <>
          <Card hidden />
          <Card hidden />
        </>
      );
    } else if (recipes.length === 2) {
      return <Card hidden />;
    }
  };

  return !loaded ? (
    <Loading />
  ) : (
    <div className="renderRecipes__container">
      {query && (
        <h3 className="renderRecipes__text">
          Search results for {query} ({recipes.length})
        </h3>
      )}
      {recipes.length === 0 && <NoData />}
      <div
        className={`renderRecipes ${sidebarIsOpen && "renderRecipes--narrow"}`}
      >
        {recipes.map(({ id, data }) => (
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
