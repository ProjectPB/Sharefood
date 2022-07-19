import React, { useState } from 'react';
import { InfoOutlined, Lock } from '@mui/icons-material';
import { useLanguage } from '../../../hooks';
import { State } from '../../../shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordStart } from '../../../redux/User/user.actions';

import AuthInput from '../../forms/AuthInput';
import AuthError from '../../AuthError';
import Button from '../../forms/Button';
import Loading from '../../Loading';

const mapState = ({ user, loading }: State) => ({
  errors: user.passwordErrors,
  loading: loading.authLoading,
});

const PasswordChange = () => {
  const { errors, loading } = useSelector(mapState);
  const LANG = useLanguage();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [openInfo, setOpenInfo] = useState(false);

  const oldPasswordConfig = {
    Icon: Lock,
    value: oldPassword,
    handleChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setOldPassword(e.target.value),
    placeholder: LANG.SETTINGS.OLD_PASSWORD_PLACEHOLDER,
    type: "password",
  }

  const newPasswordConfig = {
    Icon: Lock,
    value: newPassword,
    handleChange: (e: { target: { value: React.SetStateAction<string>; }; }) => setNewPassword(e.target.value),
    placeholder: LANG.SETTINGS.NEW_PASSWORD_PLACEHOLDER,
    type: "password",
    pattern: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    info: LANG.AUTH.PASSWORD_INFO,
    openInfo: openInfo,
  }

  const handlePasswordChanged = () => {
    setOldPassword('');
    setNewPassword('');
    alert(LANG.SETTINGS.PASSWORD_CHANGED_ALERT);
  }

  const submitConfig = {
    handleClick: () => dispatch(changePasswordStart({ oldPassword, newPassword, handlePasswordChanged })),
    disabled: newPassword.length === 0
  }

  return (
    <div className="settings__wrapper">
      <div className='settings__title'>
        <h2>
          {LANG.SETTINGS.CHANGE_PASSWORD}
        </h2>
        <InfoOutlined
          onClick={() => setOpenInfo(!openInfo)}
          className="settings__icon"
        />
      </div>

      {!loading && <div className="settings__handlers">
        <AuthInput {...oldPasswordConfig} />
        <AuthInput {...newPasswordConfig} />

        {errors && errors.length > 0 &&
          <ul className="settings__errors">
            {errors.map((err: string, i: number) => (
              <AuthError error={err} key={i} />
            ))}
          </ul>}

        <div className="settings__button">
          <Button {...submitConfig}>{LANG.SETTINGS.CHANGE}</Button>
        </div>
      </div>}

      {loading &&
        <div className="settings__handlers">
          <Loading />
        </div>}
    </div >
  )
}

export default PasswordChange;