/* eslint-disable import/first */

import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loadRecipeData } from "../../redux/Loading/loading.actions";
import { State } from "../../shared/types";
import { fetchRecipeDataStart, resetScrollDistancesStart } from "../../redux/Recipes/recipes.actions";;

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import Recipe from "../../components/Recipe";

import "./styles.css";

const mapState = ({ user, loading, recipes }: State) => ({
  currentUser: user.currentUser,
  loaded: loading.recipeDataLoaded,
  recipeData: recipes.recipeData,
});

const RecipePage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, loaded, recipeData } = useSelector(mapState);
  const { recipeId } = useParams<{ recipeId: string }>();

  useEffect(() => {
    dispatch(fetchRecipeDataStart({ recipeId: recipeId, userId: currentUser?.uid }));

    return () => {
      dispatch(loadRecipeData(false));
      dispatch(resetScrollDistancesStart());
    };
  }, [recipeId, currentUser?.uid, dispatch]);

  return !loaded ? (
    <div className="recipePage__container">
      <Loading />
    </div>
  ) : (
    <div className="recipePage__container">
      {!recipeData ? (
        <NoData />
      ) : (
        <Recipe data={recipeData} />
      )}
    </div>
  );
};

export default RecipePage;
