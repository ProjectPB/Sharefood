import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useQuery } from "./../../hooks";
import Card from "../Card";
import NoData from "../NoData";
import "./styles.css";
import { fetchRecipesStart } from "../../redux/Recipes/recipes.actions";

const mapState = ({ user, ui, recipes }) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarIsOpen,
  recipes: recipes.recipes,
});

const RenderRecipes = () => {
  const { currentUser, sidebarIsOpen, recipes } = useSelector(mapState);
  const query = useQuery().get("q");
  const queryFilter = useQuery().get("q");
  const authorFilter = currentUser?.uid;
  const favoriteFilter = currentUser?.uid;
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      dispatch(fetchRecipesStart({ queryFilter }));
      setIsLoading(false);
    } else {
      switch (location.pathname) {
        case "/":
          dispatch(fetchRecipesStart());
          setIsLoading(false);
          break;
        case "/popular":
          dispatch(fetchRecipesStart({ popularFilter: true }));
          setIsLoading(false);
          break;
        case "/my":
          dispatch(fetchRecipesStart({ authorFilter }));
          setIsLoading(false);
          break;
        case "/favorite":
          dispatch(fetchRecipesStart({ favoriteFilter }));
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
          break;
      }
    }

    return () => {
      setIsLoading(true);
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

  return isLoading ? (
    <div className="renderRecipes__processing">
      <CircularProgress size={60} />
    </div>
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
