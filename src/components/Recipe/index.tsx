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
import { ShareOutlined } from '@mui/icons-material';

import Loading from '../Loading';
import Comments from './../Comments';
import Modal from '../Modal';
import Share from '../Share';

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
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const toggleShareModal = () => setShareModalIsOpen(!shareModalIsOpen);

  const configShareModal = {
    modalOpened: shareModalIsOpen,
    toggleModal: toggleShareModal,
  };

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
      LANG.RECIPE.DELETE_RECIPE_ALERT
    );

    if (answer) {
      setIsDeleting(true)
      const resolve = await handleDeleteRecipe({ imageRef: data?.image, imageLowRef: data?.imageLow, recipeId: recipeId, authorId: data?.authorId });
      if (resolve) {
        dispatch(resetRecipes());
        alert(LANG.RECIPE.RECIPE_DELETED);
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
        <Modal {...configShareModal}>
          <Share url={window.location.href} media={data?.image} title={data?.title} />
        </Modal>

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

            {data?.tags && data?.tags.length > 0 &&
              <div className="recipe__tags">
                {data?.tags.map((tag, id) => (
                  <p className='recipe__tag' key={id}>{translateTag(tag, language)}</p>
                ))}
              </div>}

            <div className="recipe__userActions">
              <div className="recipe__action" onClick={handleLikes}>
                {!data?.liked ? <FavoriteBorderOutlined /> : <Favorite htmlColor="crimson" />}
                <p>{data?.stats?.likesQuantity}</p>
              </div>

              <div className="recipe__action" onClick={() => toggleShareModal()}>
                <ShareOutlined />
              </div>

              {data?.authorId === currentUser?.uid && (
                <div className="recipe__action" onClick={deleteRecipe}>
                  <DeleteOutlined />
                </div>
              )}
            </div>
          </div>
        </div>

        {(data?.description && data?.description !== '<p></p>') &&
          <div className="recipe__description">
            <div className="recipe__descriptionHeader" onClick={() => setShowDescription(!showDescription)} >
              <p>{LANG.RECIPE.DESCRIPTION}</p>
              {!showDescription && <ArrowDownward fontSize='small' />}
              {showDescription && <ArrowUpward fontSize='small' />}
            </div>
            {showDescription && <div className="recipe__fromHTML" dangerouslySetInnerHTML={{ __html: data?.description }} />}
          </div>}

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

        <Comments recipeId={recipeId} recipeAuthorId={data?.authorId} />
      </div >
    )
};

export default Recipe;