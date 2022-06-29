import React, { useState } from 'react'
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
  ArrowDownward,
  ArrowUpward,
} from "@material-ui/icons";
import { RecipeData, State } from '../../shared/types';
import { handleDeleteRecipe } from '../../redux/Recipe/recipe.helpers';
import { resetRecipes } from '../../redux/Recipes/recipes.actions';
import { dislikeRecipeStart, likeRecipeStart } from '../../redux/Recipe/recipe.actions';
import { translateTag, translateType } from '../../shared/functions';
import { useLanguage } from '../../hooks';

import Loading from '../Loading';

import './styles.scss';

interface Props {
  data: RecipeData;
}

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  language: ui.language,
});

const Recipe: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LANG = useLanguage();
  const { currentUser, language } = useSelector(mapState);
  const { recipeId } = useParams<{ recipeId: string }>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

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
      LANG.RECIPE.DELETE_ALERT
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

  return isDeleting ?
    <div className="recipe__loading">
      <Loading />
    </div>
    : (
      <div className="recipe">
        <h1 className="recipe__title">{data?.title}</h1>

        <div className="recipe__top">
          <div className="recipe__img">
            {!loaded && <div className='recipe__img--loading__overlay' />}
            <img src={data?.image} alt={data?.title} onLoad={() => setLoaded(true)} />
          </div>

          <div className="recipe__data">
            <div className="recipe__type">
              <LocalDining className="card__icon" />
              <p>{translateType(data?.type, language)}</p>
            </div>

            <div className="recipe__author" onClick={() => navigate(`/user/${data.authorId}`)}>
              <Avatar src={data?.profilePic} alt={data?.username} />
              <p>{data?.username}</p>
            </div>

            <div className="recipe__info">
              <DateRange />
              <Moment locale={(language === 'polish') ? 'pl' : 'en'} format={(language === 'polish') ? 'DD MMMM YYYY' : 'MMMM DD YYYY'} className="recipe__date">
                {data?.timestamp?.toDate()}
              </Moment> · {data?.stats?.views + 1} {LANG.RECIPE.VIEWS}
            </div>


            {data?.special && data?.special.length > 0 &&
              <div className="recipe__tags">
                {data?.special.map((special, id) => (
                  <p className='recipe__tag' key={id}>{translateTag(special, language)}</p>
                ))}
              </div>}

            <div className="recipe__userActions">
              <div className="recipe__action" onClick={handleLikes}>
                {!data?.liked ? <FavoriteBorderOutlined /> : <Favorite />}
                <p>{data?.stats?.likesQuantity}</p>
              </div>

              {data?.authorId === currentUser?.uid && (
                <div className="recipe__action" onClick={deleteRecipe}>
                  <DeleteOutlined />
                </div>
              )}
            </div>
          </div>
        </div>

        {
          (data?.description && data?.description !== '<p></p>') &&
          <div className="recipe__description">
            <div className="recipe__descriptionHeader" onClick={() => setShowDescription(!showDescription)} >
              <p>Description</p>
              {!showDescription && <ArrowDownward fontSize='small' />}
              {showDescription && <ArrowUpward fontSize='small' />}
            </div>
            {showDescription && <div className="recipe__fromHTML" dangerouslySetInnerHTML={{ __html: data?.description }} />}
          </div>
        }

        <div className="recipe__preparation">
          <div className="recipe__ingredients">
            <div className="recipe__ingredientsHeader">
              <h2>{LANG.RECIPE.INGREDIENTS}</h2>
              <div className="recipe__portions">
                <Group />
                <p>{data?.portions}</p>
              </div>
            </div>
            <div className="recipe__fromHTML" dangerouslySetInnerHTML={{ __html: data?.ingredients }} />
          </div>

          <div className="recipe__method">
            <h2>{LANG.RECIPE.METHOD}</h2>
            <div className="recipe__fromHTML" dangerouslySetInnerHTML={{ __html: data?.method }} />
          </div>
        </div>
      </div >
    )
};

export default Recipe;