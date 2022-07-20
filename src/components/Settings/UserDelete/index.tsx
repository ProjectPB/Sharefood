import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../../hooks';
import { deleteAccountStart } from '../../../redux/User/user.actions';
import { State } from '../../../shared/types';

import AuthError from '../../AuthError';
import Button from '../../forms/Button'
import Loading from '../../Loading'

const mapState = ({ user, loading }: State) => ({
  currentUser: user.currentUser,
  errors: user.deleteAccountErrors,
  deleting: loading.deleteAccountLoading,
});

const UserDelete = () => {
  const LANG = useLanguage();
  const { currentUser, deleting, errors } = useSelector(mapState);
  const dispatch = useDispatch();

  const deleteAccount = () => {
    const answer = window.confirm(
      LANG.SETTINGS.DELETE_ACCOUNT_CONFIRM,
    );

    if (answer) {
      dispatch(deleteAccountStart(currentUser.uid))
    }
  }

  return (
    <div className="settings__wrapper">
      <div className='settings__title'><h2>{LANG.SETTINGS.DELETE_ACCOUNT}</h2></div>
      <div className="settings__handlers">
        {!deleting && <div className="settings__button">
          <Button handleClick={deleteAccount}>{LANG.SETTINGS.DELETE}</Button>
        </div>}
        {deleting && <Loading />}

        {errors && errors.length > 0 &&
          <ul className="settings__errors">
            {errors.map((err: string, i: number) => (
              <AuthError error={err} key={i} />
            ))}
          </ul>}
      </div>
    </div>
  )
}

export default UserDelete;