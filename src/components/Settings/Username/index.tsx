import React, { useState } from 'react';
import { Edit, InfoOutlined, Person } from '@mui/icons-material';
import { useLanguage } from '../../../hooks';
import { State } from '../../../shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { changeUsernameStart } from '../../../redux/User/user.actions';

import AuthError from '../../AuthError';
import Button from '../../forms/Button';
import Loading from '../../Loading';
import AuthInput from '../../forms/AuthInput';

const mapState = ({ user, loading }: State) => ({
  errors: user.usernameErrors,
  loading: loading.usernameLoading,
  displayName: user.currentUser?.displayName,
  uid: user.currentUser?.uid
});

const PasswordChange = () => {
  const { errors, loading, displayName, uid } = useSelector(mapState);
  const LANG = useLanguage();
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");

  const handleUsernameChanged = () => {
    setEditing(false);
    setUsername('');
    alert(LANG.SETTINGS.USERNAME_CHANGED_ALERT);
  }

  const usernameConfig = {
    Icon: Person,
    placeholder: LANG.AUTH.USERNAME,
    type: "text",
    value: username,
    handleChange: (e: { target: { value: any; }; }) => setUsername(e.target.value),
    pattern: "^.{4,12}$",
    info: LANG.AUTH.USERNAME_INFO,
    openInfo: openInfo,
  };

  return (
    <div className="settings__wrapper">
      <div className='settings__title'>
        <h2>
          {LANG.SETTINGS.CHANGE_USERNAME}
        </h2>
        {editing && <InfoOutlined
          onClick={() => setOpenInfo(!openInfo)}
          className="settings__icon"
        />}
        <Edit
          onClick={() => setEditing(!editing)}
          className="settings__icon"
        />
      </div>

      {!loading && <div className="settings__handlers">
        {editing && <AuthInput {...usernameConfig} />}
        {!editing && <p style={{ fontSize: '20px' }}>{displayName}</p>}

        {errors && errors.length > 0 &&
          <ul className="settings__errors">
            {errors.map((err: string, i: number) => (
              <AuthError error={err} key={i} />
            ))}
          </ul>}

        {editing && <div className="settings__button">
          <Button handleClick={() => dispatch(changeUsernameStart({ username, handleUsernameChanged, userId: uid }))}>
            {LANG.SETTINGS.CHANGE}
          </Button>
        </div>}
      </div>}

      {loading &&
        <div className="settings__handlers">
          <Loading />
        </div>}
    </div >
  )
}

export default PasswordChange;