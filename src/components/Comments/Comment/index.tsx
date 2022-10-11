import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, DeleteOutlined, Favorite, FavoriteBorderOutlined, ReplyOutlined, Send } from '@material-ui/icons';
import { Avatar, TextareaAutosize } from '@material-ui/core';
import { addCommentStart, deleteCommentStart, dislikeCommentStart, fetchRepliesStart, likeCommentStart } from '../../../redux/Recipe/recipe.actions';
import { useLanguage } from '../../../hooks';
import { CommentType, State } from '../../../shared/types';

import Moment from 'react-moment';
import Loading from '../../Loading';

import './styles.scss';

interface Props {
  recipeId: string,
  id: CommentType['id'],
  data: CommentType['data']
  recipeAuthorId: string,
  key: string,
}

const mapState = ({ user, ui, recipe }: State) => ({
  currentUser: user.currentUser,
  language: ui.language,
  comments: recipe.comments,
});

const Comment = ({ recipeId, id, data, recipeAuthorId }: Props) => {
  const { currentUser, language, comments } = useSelector(mapState);
  const LANG = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reply, setReply] = useState({ input: '', status: false, textareaFocus: false, addingReply: false, deletingReply: false });
  const [replies, setReplies] = useState({ loading: false, display: false, fetched: false });

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
      setReply({ ...reply, deletingReply: true })
      dispatch(deleteCommentStart({ commentId: commentId, recipeId: recipeId, parentId: data?.parentId, authorId: currentUser?.uid, recipeAuthorId: recipeAuthorId, repliesQuantity: data?.repliesQuantity, handleSuccess: () => setReply({ ...reply, deletingReply: false }) }));
    }
  }

  const replyInputConfig = {
    placeholder: LANG.RECIPE.REPLY_COMMENT + " @" + data.username,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setReply({ ...reply, input: e.target.value }),
    value: reply.input,
    spellCheck: false,
    onFocus: () => setReply({ ...reply, textareaFocus: true }),
    onBlur: () => setReply({ ...reply, textareaFocus: false }),
  }

  const handleSubmitReply = () => {
    setReply({ ...reply, addingReply: true })

    const handleSuccess = () => {
      setReply({ ...reply, input: '', status: false, textareaFocus: false, addingReply: false })
      setReplies({ ...replies, display: true })
    }

    dispatch(addCommentStart({ text: reply.input, parentId: id, recipeId: recipeId, recipeAuthorId: recipeAuthorId, authorId: currentUser?.uid, profilePic: currentUser?.profilePic, username: currentUser?.displayName, handleSuccess: () => handleSuccess() }));
  }

  const handleReplies = () => {
    if (replies.display) {
      setReplies({ ...replies, display: false })
    }

    if (!replies.display) {
      setReplies({ ...replies, display: true })
    }

    if (!replies.fetched) {
      setReplies({ ...replies, loading: true })
      dispatch(fetchRepliesStart({ recipeId: recipeId, parentId: id, sortFilter: 'newest', userId: currentUser?.uid, handleSuccess: () => setReplies({ ...replies, loading: false, display: true, fetched: true }) }));
    }
  }

  const commentRepliesData = comments.data.filter(({ data }: { data: CommentType['data'] }) => {
    return data?.parentId === id
  });

  if (reply.deletingReply) {
    return <div className="comment">
      <div className='comment__loading'>
        <Loading />
      </div>
    </div>
  } else {
    return (
      <div className="comment">
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

          {replies.loading &&
            <div className="comments__loading">
              <Loading />
            </div>}

          {(currentUser && reply.status) &&
            <div className="comments__input">
              {!reply.addingReply ?
                <>
                  <TextareaAutosize {...replyInputConfig} />
                  {(reply.textareaFocus || reply.input.length > 0) && <Send className='sendIcon' onClick={handleSubmitReply} />}
                </> :
                <Loading />
              }
            </div>
          }

          {(!currentUser && reply.status) &&
            <div className="comments__input">
              <p>{LANG.RECIPE.UNABLE_TO_COMMENT_1}<Link to='/auth'>{LANG.RECIPE.UNABLE_TO_COMMENT_SIGN_IN}</Link>{LANG.RECIPE.UNABLE_TO_REPLY}</p>
            </div>
          }

          {data?.repliesQuantity > 0 &&
            <div className="comment__repliesWrapper">
              <div className="comment__repliesHeader" onClick={handleReplies}>
                {replies.display ? <ArrowUpwardOutlined /> : <ArrowDownwardOutlined />}
                <h2>{LANG.RECIPE.SHOW_REPLIES} ({data?.repliesQuantity})</h2>
              </div>
            </div>}

          {(replies.display && data?.repliesQuantity > 0) && commentRepliesData.map(({ id, data }) => (
            <Comment key={id} recipeId={recipeId} id={id} data={data} recipeAuthorId={recipeAuthorId} />
          ))}
        </div>
      </div>
    )
  }
}

export default Comment;