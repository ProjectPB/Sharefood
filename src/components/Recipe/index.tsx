import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import {
  DeleteOutlined,
  Favorite,
  FavoriteBorderOutlined,
  DateRange,
  Group,
  LocalDining,
} from "@material-ui/icons";
import { loadRecipeData } from "../../redux/Loading/loading.actions";
import { capitalizeLetter } from "../../util/formatText";
import { State } from "../../shared/types";
import { dislikeRecipeStart, fetchRecipeDataStart, likeRecipeStart } from "../../redux/Recipes/recipes.actions";
import { handleDeleteRecipe } from "../../redux/Recipes/recipes.helpers";

import Loading from "../Loading";
import NoData from "../NoData";

import "./styles.css";

const mapState = ({ user, loading, recipes }: State) => ({
  currentUser: user.currentUser,
  loaded: loading.recipeDataLoaded,
  recipeData: recipes.recipeData,
});

const Recipe: React.FC = () => {
  const { currentUser, loaded, recipeData } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeId } = useParams<{ recipeId: string }>();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipeDataStart({ recipeId: recipeId, userId: currentUser?.uid }));

    return () => {
      dispatch(loadRecipeData(false));
    };
  }, [recipeId, currentUser?.uid, dispatch]);

  const handleLikes = () => {
    if (!currentUser) {
      history.push("/auth");
    }
    if (!recipeData.liked) {
      dispatch(likeRecipeStart({ userId: currentUser?.uid, recipeId: recipeId, data: recipeData }));
    } else {
      dispatch(dislikeRecipeStart({ userId: currentUser?.uid, recipeId: recipeId, data: recipeData }));
    }
  }

  const deleteRecipe = async () => {
    const answer = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (answer) {
      setIsDeleting(true)
      const resolve = await handleDeleteRecipe(recipeData?.image, recipeId);
      if (resolve) {
        alert("Recipe deleted");
        setIsDeleting(false)
        history.push('/');
      }
    }
  }

  return !loaded || isDeleting ? (
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
              style={{
                visibility: imgLoaded === true ? "visible" : "hidden",
              }}
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
                    src={recipeData?.profilePic}
                    alt={recipeData?.username}
                  />
                  <p>{recipeData?.username}</p>
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
                  {!recipeData?.liked ? (
                    <FavoriteBorderOutlined
                      fontSize="large"
                      onClick={handleLikes}
                    />
                  ) : (
                    <Favorite fontSize="large" onClick={handleLikes} />
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
                  {recipeData?.ingredients?.map(
                    (ingredient: string, index: number) => (
                      <li key={index}>{ingredient}</li>
                    )
                  )}
                </ul>
              </div>
              <div className="recipe__method">
                <h2>Method</h2>
                <ul className="recipe__steps">
                  {recipeData?.method?.map((step: string, index: number) => (
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
