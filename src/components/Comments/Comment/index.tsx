import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { deleteCommentStart, dislikeCommentStart, likeCommentStart } from '../../../redux/Recipe/recipe.actions';
import { useLanguage } from '../../../hooks';
import { CommentType, State } from '../../../shared/types';

import Moment from 'react-moment';

import './styles.scss';

interface Props {
  recipeId: string,
  id: CommentType['id'],
  data: CommentType['data']
}

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  language: ui.language,
});

const Comment = ({ recipeId, id, data }: Props) => {
  const { currentUser, language } = useSelector(mapState);
  const LANG = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLikes = (id: string, data: CommentType['data']) => {
    if (!currentUser) {
      navigate("/auth");
    }
    if (!data.liked) {
      dispatch(likeCommentStart({ userId: currentUser?.uid, commentId: id, recipeId: recipeId }))
    } else {
      dispatch(dislikeCommentStart({ userId: currentUser?.uid, commentId: id, recipeId: recipeId }));
    }
  }

  const deleteComment = (commentId: string) => {
    const answer = window.confirm(
      LANG.RECIPE.DELETE_COMMENT_ALERT
    );

    if (answer) {
      dispatch(deleteCommentStart({ commentId: commentId, recipeId: recipeId, alert: LANG.RECIPE.COMMENT_DELETED }));
    }
  }

  return (
    <div className="comment" key={id}>
      <Avatar src={data?.profilePic} />

      <div className="comment__wrapper">
        <div className="comment__header">
          <h3>{data.username}</h3> ·
          <p>
            <Moment locale={(language === 'polish') ? 'pl' : 'en'} fromNow >
              {data.timestamp?.toDate()}
            </Moment>
          </p>
        </div>

        <p className='comment__text'>{data.text}</p>

        <div className="comment__userActions">
          {data?.liked && <p><Favorite htmlColor="crimson" onClick={() => handleLikes(id, data)} /></p>}
          {!data?.liked && <p><FavoriteBorderOutlined onClick={() => handleLikes(id, data)} /></p>}
          {(data.authorId === currentUser?.uid) && <p><DeleteOutlined onClick={() => deleteComment(id)} /> </p>}
        </div>
      </div>
    </div>
  )
}

export default Comment;