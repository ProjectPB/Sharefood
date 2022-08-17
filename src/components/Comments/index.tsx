import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, TextareaAutosize } from '@material-ui/core';
import { Favorite, FavoriteBorderOutlined, Send } from '@mui/icons-material';
import { State } from '../../shared/types';

import './styles.scss';

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const Comments = () => {
  const { currentUser } = useSelector(mapState);
  const [input, setInput] = useState('');
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

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
    setInput("");
    setIsTextareaFocused(false);
  }

  return (
    <div className='comments'>
      <div className="comments__header">
        <h2>@1239 komentarzy@</h2>
      </div>

      {currentUser ?
        <div className="comments__input">
          <Avatar className='avatarIcon' src={currentUser?.profilePic} />
          <TextareaAutosize {...config} />
          {(isTextareaFocused || input.length > 0) && <Send className='sendIcon' onClick={handleSubmit} />}
        </div> :
        <div className="comments__input">
          <p>Please <Link to='/auth'>sign in</Link> to comment</p>
        </div>
      }

      <div className="comment">
        <Avatar />

        <div className="comment__wrapper">
          <div className="comment__header">
            <h3>@author_comment@</h3> ·
            <p>@12 dni temu@</p>
          </div>

          <p className='comment__text'>@text_comment@</p>

          <div className="comment__userActions">
            <p><FavoriteBorderOutlined /></p>
          </div>
        </div>
      </div>

      <div className="comment">
        <Avatar />

        <div className="comment__wrapper">
          <div className="comment__header">
            <h3>@author_comment@</h3> ·
            <p>@12 dni temu@</p>
          </div>

          <p className='comment__text'>@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@</p>

          <div className="comment__userActions">
            <p><Favorite /></p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Comments