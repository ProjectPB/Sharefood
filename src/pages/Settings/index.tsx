import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { passwordError, usernameError } from '../../redux/User/user.actions';
import { State } from '../../shared/types';

import ProfilePic from './../../components/Settings/ProfilePic';
import UserDelete from './../../components/Settings/UserDelete';
import Password from './../../components/Settings/Password';
import Username from './../../components/Settings/Username';

import './styles.scss'

const mapState = ({ user }: State) => ({
  currentUser: user.currentUser,
});

const SettingsPage = () => {
  const { currentUser } = useSelector(mapState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    return () => {
      dispatch(usernameError([]));
      dispatch(passwordError([]));
    };
  }, [currentUser, navigate, dispatch]);

  return (
    <div className='settings'>
      <div className="settings__container">
        <ProfilePic />

        <div className="settings__form">
          <Username />
          <Password />
          <UserDelete />
        </div>

      </div>
    </div >
  )
}

export default SettingsPage;