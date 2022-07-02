/* eslint-disable import/first */

import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loadRecipeData, loadRelatedRecipes } from "../../redux/Loading/loading.actions";
import { State } from "../../shared/types";
import { resetScrollDistancesStart, setRelatedRecipes } from "../../redux/Recipes/recipes.actions";;
import { fetchRecipeDataStart, setRecipeData } from "../../redux/Recipe/recipe.actions";;

import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import Recipe from "../../components/Recipe";
import MoreRecipes from '../../components/MoreRecipes';

import "./styles.scss";

const mapState = ({ user, loading, recipe }: State) => ({
  currentUser: user.currentUser,
  loaded: loading.recipeDataLoaded,
  recipeData: recipe.recipeData
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
      dispatch(setRecipeData(null));
      dispatch(setRelatedRecipes({ data: [], queryDoc: null, isLastPage: null }));
      dispatch(loadRelatedRecipes(false));
    };
  }, [recipeId, currentUser?.uid, dispatch]);

  return !loaded ? (
    <div className="recipePage">
      <Loading />
    </div>
  ) : (
    <div className="recipePage">
      {!recipeData ? (
        <NoData />
      ) : (
        <div className="recipePage__wrapper">
          <Recipe data={recipeData} />
          <MoreRecipes filter={recipeData.type} excludeId={recipeId} />
        </div>
      )}
    </div>
  );
};

export default RecipePage;
