import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
import { Avatar, TextareaAutosize } from '@material-ui/core';
import { ArrowDownwardOutlined, Send } from '@mui/icons-material';
import { CommentType, State } from '../../shared/types';
import { useClickOutside, useLanguage } from '../../hooks';
import { addCommentStart, fetchCommentsStart, setComments } from '../../redux/Recipe/recipe.actions';
import { translateCommentFilter } from '../../shared/functions';

import Button from '../forms/Button';
import Comment from './Comment';
import Loading from '../Loading';

import './styles.scss';

const mapState = ({ ui, user, recipe }: State) => ({
  currentUser: user.currentUser,
  comments: recipe.comments,
  language: ui.language,
});

const Comments = ({ recipeId, recipeAuthorId }: { recipeId: string, recipeAuthorId: string }) => {
  const { currentUser, comments, language } = useSelector(mapState);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const LANG = useLanguage();
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>();
  useClickOutside(sortMenuRef, () => setSortMenuIsOpen(false))
  const [sortMenuIsOpen, setSortMenuIsOpen] = useState(false);
  const [filter, setFilter] = useState('newest');
  const [loading, setLoading] = useState({
    addingComment: false,
    fetchingMoreComments: false,
    fetchingComments: false,
  })

  const config = {
    placeholder: LANG.RECIPE.ADD_COMMENT,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setInput(e.target.value),
    value: input,
    spellCheck: false,
    onFocus: () => setIsTextareaFocused(true),
    onBlur: () => setIsTextareaFocused(false),
  }

  const handleSubmit = () => {
    setLoading({ ...loading, addingComment: true });
    dispatch(addCommentStart({ text: input, parentId: "", recipeId: recipeId, recipeAuthorId: recipeAuthorId, authorId: currentUser?.uid, profilePic: currentUser?.profilePic, username: currentUser?.displayName, handleSuccess: () => setLoading({ ...loading, addingComment: false }) }));
    setInput("");
    setIsTextareaFocused(false);
  }

  const fetchMoreComments = () => {
    setLoading({ ...loading, fetchingMoreComments: true });
    dispatch(fetchCommentsStart({
      recipeId: recipeId, sortFilter: filter, counter: 20, startAfterDoc: comments.queryDoc, parentId: "",
      persistComments: comments?.data, commentsQuantity: comments.amount, userId: currentUser?.uid, handleSuccess: () => setLoading({ ...loading, fetchingMoreComments: false })
    }));
  }

  useEffect(() => {
    setLoading({ ...loading, fetchingComments: true });
    dispatch(fetchCommentsStart({ recipeId: recipeId, sortFilter: filter, counter: 20, userId: currentUser?.uid, handleSuccess: () => setLoading({ ...loading, fetchingComments: false }) }));

    return () => {
      dispatch(setComments({ data: [], queryDoc: null, isLastPage: null, amount: 0 }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, recipeId, filter, currentUser?.uid])

  const commentRepliesData = comments?.data.filter(({ data }: { data: CommentType['data'] }) => {
    return data?.parentId === ""
  });

  return (
    <div className='comments'>
      {loading.fetchingComments ?
        <div className="comments__loading"><Loading /></div> :
        <>
          <div className="comments__header">
            <h2>{comments.amount} {LANG.RECIPE.COMMENTS_COUNTER}</h2>
            <div className="comments__sort" ref={sortMenuRef} onClick={() => setSortMenuIsOpen(!sortMenuIsOpen)}>
              <p className="comments_sortValue">{translateCommentFilter(filter, language)}</p>

              {sortMenuIsOpen &&
                <div className='comments__sortFilters'>
                  <div className="comments__filter">
                    <input type="radio" name="commentFilter" value="newest" checked={filter === 'newest'} onChange={() => setFilter('newest')} />
                    <p onClick={() => setFilter('newest')}>{LANG.RECIPE.NEWEST_FILTER_COMMENT}</p>
                  </div>

                  <div className="comments__filter">
                    <input type="radio" name="commentFilter" value="oldest" checked={filter === 'oldest'} onChange={() => setFilter('oldest')} />
                    <p onClick={() => setFilter('oldest')}>{LANG.RECIPE.OLDEST_FILTER_COMMENT}</p>
                  </div>

                  <div className="comments__filter">
                    <input type="radio" name="commentFilter" value="popular" checked={filter === 'popular'} onChange={() => setFilter('popular')} />
                    <p onClick={() => setFilter('popular')}>{LANG.RECIPE.POPULAR_FILTER_COMMENT}</p>
                  </div>
                </div>}
              <ArrowDownwardOutlined />
            </div>
          </div>

          {currentUser ?
            <div className="comments__input">
              {!loading.addingComment ?
                <>
                  <Avatar className='avatarIcon' src={currentUser?.profilePic} />
                  <TextareaAutosize {...config} />
                  {(isTextareaFocused || input.length > 0) && <Send className='sendIcon' onClick={handleSubmit} />}
                </>
                :
                <Loading />}
            </div> :
            <div className="comments__input">
              <p>{LANG.RECIPE.UNABLE_TO_COMMENT_1}<Link to='/auth'>{LANG.RECIPE.UNABLE_TO_COMMENT_SIGN_IN}</Link>{LANG.RECIPE.UNABLE_TO_COMMENT_2}</p>
            </div>}

          {(commentRepliesData && commentRepliesData?.length > 0) && commentRepliesData?.map(({ id, data }) => (
            <Comment key={id} recipeId={recipeId} id={id} data={data} recipeAuthorId={recipeAuthorId} />
          ))}

          {!comments.isLastPage && !loading.fetchingMoreComments &&
            <div className="comments__moreButton">
              <Button handleClick={fetchMoreComments}>{LANG.RECIPE.MORE_COMMENTS}</Button>
            </div>}

          {loading.fetchingMoreComments &&
            <div className="comments__loading">
              <Loading />
            </div>}
        </>
      }
    </div >
  )
}

export default Comments