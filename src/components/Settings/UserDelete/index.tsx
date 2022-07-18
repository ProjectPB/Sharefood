import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../../hooks';
import { deleteAccountStart, signUpError } from '../../../redux/User/user.actions';
import { State } from '../../../shared/types';

import Button from '../../forms/Button'
import Loading from '../../Loading'

import './styles.scss';

const mapState = ({ user, loading }: State) => ({
  currentUser: user.currentUser,
  deleting: loading.deleteAccountLoading,
});

const UserDelete = () => {
  const LANG = useLanguage();
  const { currentUser, deleting } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(signUpError([]));
    };
  }, [currentUser, dispatch]);

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
      <h2 className='settings__title'>{LANG.SETTINGS.DELETE_ACCOUNT}</h2>
      <div className="settings__handlers">
        {!deleting && <div className="settings__button">
          <Button handleClick={deleteAccount}>{LANG.SETTINGS.DELETE}</Button>
        </div>}
        {deleting && <Loading />}
      </div>
    </div>
  )
}

export default UserDelete;