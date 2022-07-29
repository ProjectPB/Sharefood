/* eslint-disable import/first */

import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
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
import { useLanguage } from "../../hooks";

const mapState = ({ user, loading, recipe }: State) => ({
  currentUser: user.currentUser,
  loaded: loading.recipeDataLoaded,
  recipeData: recipe.recipeData
});

const RecipePage: React.FC = () => {
  const dispatch = useDispatch();
  const LANG = useLanguage();
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

  return (
    <div className="recipePage">
      <Helmet>
        {loaded && <title>{`${recipeData?.title}`} | Sharefood</title>}
        {!loaded && <title>Sharefood</title>}
        <meta name="description" content={LANG.HELMET.RECIPE_DESCRIPTION}></meta>
      </Helmet>

      {!recipeData && loaded && <NoData />}
      {!loaded && <Loading />}
      {loaded && recipeData &&
        <div className="recipePage__wrapper">
          <Recipe data={recipeData} />
          <MoreRecipes filter={recipeData.type} excludeId={recipeId} />
        </div>
      }
    </div >
  );
};

export default RecipePage;
