import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, TextareaAutosize } from '@material-ui/core';
import { ArrowDownwardOutlined, DeleteOutlined, FavoriteBorderOutlined, Send } from '@mui/icons-material';
import { State } from '../../shared/types';
import { useClickOutside } from '../../hooks';
import { addCommentStart } from '../../redux/Recipe/recipe.actions';

import './styles.scss';
import Moment from 'react-moment';

const mapState = ({ ui, user, recipe }: State) => ({
  currentUser: user.currentUser,
  comments: recipe.comments,
  language: ui.language
});

const Comments = ({ recipeId }: { recipeId: string }) => {
  const { currentUser, comments, language } = useSelector(mapState);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
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
    spellcheck: "false",
    onFocus: () => setIsTextareaFocused(true),
    onBlur: () => setIsTextareaFocused(false),
  }

  const handleSubmit = () => {
    dispatch(addCommentStart({ text: input, recipeId: recipeId, authorId: currentUser.uid }));
    setInput("");
    setIsTextareaFocused(false);
  }

  return (
    <div className='comments'>
      <div className="comments__header">
        <h2>@1239 komentarzy@</h2>
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

      {(comments && comments?.data?.length > 0) && comments?.data.map((comment) => (
        <div className="comment">
          <Avatar />

          <div className="comment__wrapper">
            <div className="comment__header">
              <h3>{comment.authorId}</h3> ·
              <p>
                <Moment locale={(language === 'polish') ? 'pl' : 'en'} fromNow >
                  {comment.timestamp?.toDate()}
                </Moment>
              </p>
            </div>

            <p className='comment__text'>{comment.text}</p>

            <div className="comment__userActions">
              <p><FavoriteBorderOutlined /></p>
              {(comment.authorId === currentUser.uid) && <p><DeleteOutlined /> </p>}
            </div>
          </div>
        </div>
      ))}
    </div >
  )
}

export default Comments