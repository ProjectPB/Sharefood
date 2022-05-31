import React, { useEffect, useState } from 'react'
import Moment from "react-moment";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import {
  DeleteOutlined,
  Favorite,
  FavoriteBorderOutlined,
  DateRange,
  Group,
  LocalDining,
  Visibility,
} from "@material-ui/icons";
import { RecipeData, State } from '../../shared/types';
import { handleDeleteRecipe } from '../../redux/Recipe/recipe.helpers';
import { resetRecipes } from '../../redux/Recipes/recipes.actions';
import { dislikeRecipeStart, likeRecipeStart, viewRecipeStart } from '../../redux/Recipe/recipe.actions';
import { capitalizeLetter } from '../../shared/functions';

import Loading from '../Loading';

import './styles.scss';

interface Props {
  data: RecipeData;
}

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const Recipe: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(mapState);
  const { recipeId } = useParams<{ recipeId: string }>();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(viewRecipeStart({ recipeId: recipeId, data: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, recipeId]);

  const handleLikes = () => {
    if (!currentUser) {
      navigate("/auth");
    }
    if (!data.liked) {
      dispatch(likeRecipeStart({ userId: currentUser?.uid, recipeId: recipeId, data: data }));
    } else {
      dispatch(dislikeRecipeStart({ userId: currentUser?.uid, recipeId: recipeId, data: data }));
    }
  }

  const deleteRecipe = async () => {
    const answer = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (answer) {
      setIsDeleting(true)
      const resolve = await handleDeleteRecipe(data?.image, data?.imageLow, recipeId);
      if (resolve) {
        dispatch(resetRecipes());
        alert("Recipe deleted");
        setIsDeleting(false);
        navigate('/');
      }
    }
  }

  return isDeleting ? <Loading /> : (
    <div className="recipe">
      <h1 className="recipe__title">{data?.title}</h1>

      <div className="recipe__main">
        <img
          className="recipe__image"
          src={data?.image}
          alt=""
        />

        <div className="recipe__info">
          <div className="recipe__infoCol">
            <div className="recipe__time">
              <DateRange />
              <Moment format="MMMM DD YYYY" className="recipe__date">
                {data?.timestamp?.toDate()}
              </Moment>
            </div>

            <div className="recipe__author" onClick={() => navigate(`/user/${data.authorId}`)}>
              <Avatar
                src={data?.profilePic}
                alt={data?.username}
              />
              <p>{data?.username}</p>
            </div>

            <div className="recipe__views">
              <Visibility fontSize="large" />
              <p>{data?.stats?.views} views</p>
            </div>

            {data?.authorId === currentUser?.uid && (
              <div className="recipe__delete" onClick={deleteRecipe}>
                <DeleteOutlined fontSize="large" />
                <p>Delete recipe</p>
              </div>
            )}
          </div>

          <div className="recipe__infoCol">
            <div className="recipe__type">
              <LocalDining fontSize="large" />
              <p>
                {data?.type && capitalizeLetter(data?.type)}
              </p>
            </div>

            <div className="recipe__favorite">
              {!data?.liked ? (
                <FavoriteBorderOutlined
                  fontSize="large"
                  onClick={handleLikes}
                />
              ) : (
                <Favorite fontSize="large" onClick={handleLikes} />
              )}
              <p>{data?.stats?.likesQuantity}</p>
            </div>
          </div>
        </div>

        <div className="recipe__body">
          <div className="recipe__ingredients">
            <div className="recipe__ingredientsHeader">
              <h2>Ingredients</h2>
              <div className="recipe__portions">
                <Group />
                <p>{data?.portions}</p>
              </div>
            </div>
            <div className="recipe__list" dangerouslySetInnerHTML={{ __html: data?.ingredients }} />
          </div>

          <div className="recipe__method">
            <h2>Method</h2>
            <div className="recipe__list" dangerouslySetInnerHTML={{ __html: data?.method }} />
          </div>
        </div>
      </div>
    </div >
  )
};

export default Recipe;