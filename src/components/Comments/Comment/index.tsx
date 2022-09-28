import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDownwardOutlined, DeleteOutlined, Favorite, FavoriteBorderOutlined, ReplyOutlined, Send } from '@material-ui/icons';
import { Avatar, TextareaAutosize } from '@material-ui/core';
import { addCommentStart, deleteCommentStart, dislikeCommentStart, likeCommentStart } from '../../../redux/Recipe/recipe.actions';
import { useLanguage } from '../../../hooks';
import { CommentType, State } from '../../../shared/types';

import Moment from 'react-moment';

import './styles.scss';

interface Props {
  recipeId: string,
  id: CommentType['id'],
  data: CommentType['data']
  recipeAuthorId: string,
}

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  language: ui.language,
});

const Comment = ({ recipeId, id, data, recipeAuthorId }: Props) => {
  const { currentUser, language } = useSelector(mapState);
  const LANG = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reply, setReply] = useState({ input: '', status: false, textareaFocus: false, loading: false, addingReply: false });

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
      dispatch(deleteCommentStart({ commentId: commentId, recipeId: recipeId, alert: LANG.RECIPE.COMMENT_DELETED, authorId: currentUser?.uid, recipeAuthorId: recipeAuthorId }));
    }
  }

  const replyInputConfig = {
    placeholder: LANG.RECIPE.REPLY_COMMENT,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setReply({ ...reply, input: e.target.value }),
    value: reply.input,
    spellCheck: false,
    onFocus: () => setReply({ ...reply, textareaFocus: true }),
    onBlur: () => setReply({ ...reply, textareaFocus: false }),
  }

  const handleSubmitReply = () => {
    dispatch(addCommentStart({ text: reply.input, recipeId: recipeId, recipeAuthorId: recipeAuthorId, authorId: currentUser?.uid, profilePic: currentUser?.profilePic, username: currentUser?.displayName, handleSuccess: () => setReply({ ...reply, addingReply: false }) }));
    setReply({ ...reply, status: false, input: '', textareaFocus: false, });
  }

  return (
    <div className="comment" key={id}>
      <Link to={`/user/${data.authorId}`}><Avatar src={data?.profilePic} /></Link>

      <div className="comment__wrapper">
        <div className="comment__header">
          <Link to={`/user/${data.authorId}`}><h3>{data.username}</h3></Link> ·
          <p>
            <Moment locale={(language === 'polish') ? 'pl' : 'en'} fromNow >
              {data.timestamp?.toDate()}
            </Moment>
          </p>
        </div>

        <p className='comment__text'>{data.text}</p>

        <div className="comment__userActions">
          <p onClick={() => setReply({ ...reply, status: !reply.status })}><ReplyOutlined /></p>
          {data?.liked && <p><Favorite htmlColor="crimson" onClick={() => handleLikes(id, data)} /></p>}
          {!data?.liked && <p><FavoriteBorderOutlined onClick={() => handleLikes(id, data)} /></p>}
          {(data.authorId === currentUser?.uid) && <p><DeleteOutlined onClick={() => deleteComment(id)} /> </p>}
        </div>

        {currentUser && reply.status &&
          <div className="comments__input">
            <TextareaAutosize {...replyInputConfig} />
            {(reply.textareaFocus || reply.input.length > 0) && <Send className='sendIcon' onClick={handleSubmitReply} />}
          </div>
        }

        {reply.status && !currentUser &&
          <div className="comments__input">
            <p>{LANG.RECIPE.UNABLE_TO_COMMENT_1}<Link to='/auth'>{LANG.RECIPE.UNABLE_TO_COMMENT_SIGN_IN}</Link>{LANG.RECIPE.UNABLE_TO_REPLY}</p>
          </div>
        }

        <div className="comment__repliesWrapper">
          <div className="comment__repliesHeader">
            <ArrowDownwardOutlined />
            <h2>{LANG.RECIPE.SHOW_REPLIES}</h2>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Comment;