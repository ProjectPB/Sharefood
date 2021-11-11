import { Avatar } from "@material-ui/core";
import {
  DeleteOutlined,
  Favorite,
  FavoriteBorderOutlined,
  DateRange,
  Group,
  LocalDining,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/utils";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../NoData";
import Moment from "react-moment";
import { capitalizeLetter } from "../../util/TextFormat";
import {
  handleDeleteRecipe,
  handleDislikeRecipe,
  handleLikeRecipe,
} from "../../redux/Recipes/recipes.helpers";
import { loadRecipeData } from "./../../redux/Loading/loading.actions";
import Loading from "./../Loading";
import "./styles.css";

const mapState = ({ user, loading }) => ({
  currentUser: user.currentUser,
  loaded: loading.recipeDataLoaded,
});

const Recipe = () => {
  const { currentUser, loaded } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    db.collection("recipes")
      .doc(recipeId)
      .onSnapshot((doc) => {
        setRecipeData(doc.data());
        dispatch(loadRecipeData(true));
      });

    return () => {
      setRecipeData([]);
      dispatch(loadRecipeData(false));
    };
  }, [recipeId, dispatch]);

  const likeRecipe = (e) => {
    e.preventDefault();

    if (currentUser) {
      handleLikeRecipe(currentUser?.uid, recipeId);
    } else {
      return alert("Please Sign In to like a recipe");
    }
  };

  const dislikeRecipe = (e) => {
    e.preventDefault();

    handleDislikeRecipe(currentUser?.uid, recipeId);
  };

  const deleteRecipe = (e) => {
    e.preventDefault();

    const answer = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (answer) {
      handleDeleteRecipe(recipeData?.image, recipeId);
      alert("Recipe deleted");
      history.push("/");
    } else {
      return;
    }
  };

  return !loaded ? (
    <div className="recipe__container">
      <Loading />
    </div>
  ) : (
    <div className="recipe__container">
      {!recipeData ? (
        <NoData />
      ) : (
        <div className="recipe">
          <h1 className="recipe__title">{recipeData?.title}</h1>
          <div className="recipe__main">
            <img
              className="recipe__image"
              src={recipeData?.image}
              alt=""
              style={imgLoaded ? {} : { visibility: "none" }}
              onLoad={() => setImgLoaded(true)}
            />
            <div className="recipe__info">
              <div className="recipe__left">
                <div className="recipe__time">
                  <DateRange fontSize="large" />
                  <Moment format="MMMM DD YYYY" className="recipe__date">
                    {recipeData?.timestamp?.toDate()}
                  </Moment>
                </div>
                <div className="recipe__author">
                  <Avatar
                    src={recipeData?.authorProfilePic}
                    alt={recipeData?.authorName}
                  />
                  <p>{recipeData?.authorName}</p>
                </div>
                {recipeData?.authorId === currentUser?.uid && (
                  <div className="recipe__delete" onClick={deleteRecipe}>
                    <DeleteOutlined fontSize="large" />
                    <p>Delete recipe</p>
                  </div>
                )}
              </div>
              <div className="recipe__right">
                <div className="recipe__type">
                  <LocalDining fontSize="large" />
                  <p>
                    {recipeData?.type && capitalizeLetter(recipeData?.type)}
                  </p>
                </div>
                <div className="recipe__favorite">
                  {!recipeData?.likesUsers?.includes(currentUser?.uid) ? (
                    <FavoriteBorderOutlined
                      fontSize="large"
                      onClick={likeRecipe}
                    />
                  ) : (
                    <Favorite fontSize="large" onClick={dislikeRecipe} />
                  )}
                  <p>{recipeData?.likesQuantity}</p>
                </div>
              </div>
            </div>
            <div className="recipe__body">
              <div className="recipe__ingredients">
                <div className="recipe__ingredientsHeader">
                  <h2>Ingredients</h2>
                  <div className="recipe__portions">
                    <Group />
                    <p>{recipeData?.portions}</p>
                  </div>
                </div>
                <ul className="recipe__ingredientsList">
                  {recipeData?.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="recipe__method">
                <h2>Method</h2>
                <ul className="recipe__steps">
                  {recipeData?.method?.map((step, index) => (
                    <li className="recipe__step" key={index}>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
