import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, TextareaAutosize } from '@material-ui/core';
import { ArrowDownwardOutlined, DeleteOutlined, FavoriteBorderOutlined, Send } from '@mui/icons-material';
import { State } from '../../shared/types';
import { useClickOutside, useLanguage } from '../../hooks';
import { addCommentStart } from '../../redux/Recipe/recipe.actions';
import Moment from 'react-moment';

import './styles.scss';

const mapState = ({ ui, user, recipe }: State) => ({
  currentUser: user.currentUser,
  comments: recipe.comments,
  language: ui.language
});

const Comments = ({ recipeId }: { recipeId: string }) => {
  const { currentUser, comments, language } = useSelector(mapState);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const LANG = useLanguage();
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>();
  useClickOutside(sortMenuRef, () => setSortMenuIsOpen(false))
  const [sortMenuIsOpen, setSortMenuIsOpen] = useState(false);
  const [filter, setFilter] = useState('recent');

  const config = {
    placeholder: "@POST A COMMENT@",
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setInput(e.target.value),
    value: input,
    spellCheck: false,
    onFocus: () => setIsTextareaFocused(true),
    onBlur: () => setIsTextareaFocused(false),
  }

  const handleSubmit = () => {
    dispatch(addCommentStart({ text: input, recipeId: recipeId, authorId: currentUser?.uid, profilePic: currentUser?.profilePic, username: currentUser?.displayName }));
    setInput("");
    setIsTextareaFocused(false);
  }

  return (
    <div className='comments'>
      <div className="comments__header">
        <h2>{comments.amount} {LANG.RECIPE.COMMENTS_COUNTER}</h2>
        <div className="comments__sort" ref={sortMenuRef} onClick={() => setSortMenuIsOpen(!sortMenuIsOpen)}>
          <p>{filter}</p>

          {sortMenuIsOpen &&
            <div className='comments__sortFilters'>
              <div className="comments__filter">
                <input type="radio" name="commentFilter" value="recent" checked={filter === 'recent'} onChange={() => setFilter('recent')} />
                <p>@RECENT@</p>
              </div>

              <div className="comments__filter">
                <input type="radio" name="commentFilter" value="popular" checked={filter === 'popular'} onChange={() => setFilter('popular')} />
                <p>@POPULAR@</p>
              </div>
            </div>}
          <ArrowDownwardOutlined />
        </div>
      </div>

      {currentUser ?
        <div className="comments__input">
          <Avatar className='avatarIcon' src={currentUser?.profilePic} />
          <TextareaAutosize {...config} />
          {(isTextareaFocused || input.length > 0) && <Send className='sendIcon' onClick={handleSubmit} />}
        </div> :
        <div className="comments__input">
          <p>Please <Link to='/auth'>sign in</Link> to comment</p>
        </div>}

      {(comments && comments?.data?.length > 0) && comments?.data.map(({ id, data }) => (
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
              <p><FavoriteBorderOutlined /></p>
              {(data.authorId === currentUser.uid) && <p><DeleteOutlined /> </p>}
            </div>
          </div>
        </div>
      ))}
    </div >
  )
}

export default Comments