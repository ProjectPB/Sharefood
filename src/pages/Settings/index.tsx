import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { State } from '../../shared/types';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

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