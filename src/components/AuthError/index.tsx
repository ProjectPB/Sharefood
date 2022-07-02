import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../hooks';

import './styles.scss';

interface Props {
  error: string,
}

const AuthError: React.FC<Props> = ({ error }) => {
  const LANG = useLanguage();
  const [newErr, setNewErr] = useState('');

  useEffect(() => {
    switch (error) {
      case "INVALID_USERNAME":
        setNewErr(LANG.ERRORS.INVALID_USERNAME);
        break;
      case "INVALID_EMAIL":
        setNewErr(LANG.ERRORS.INVALID_EMAIL);
        break;
      case "INVALID_PASSWORD":
        setNewErr(LANG.ERRORS.INVALID_PASSWORD);
        break;
      case "PASSWORDS_VARY":
        setNewErr(LANG.ERRORS.PASSWORDS_VARY);
        break;
      case "EMAIL_NOT_FOUND":
        setNewErr(LANG.ERRORS.EMAIL_NOT_FOUND);
        break;
      case "auth/user-not-found":
        setNewErr(LANG.ERRORS.USER_NOT_FOUND);
        break;
      case "auth/email-already-exists":
        setNewErr(LANG.ERRORS.EMAIL_ALREADY_EXISTS);
        break;
      case "auth/wrong-password":
        setNewErr(LANG.ERRORS.WRONG_PASSWORD);
        break;
      case "auth/too-many-requests":
        setNewErr(LANG.ERRORS.TOO_MANY_REQUESTS);
        break;
      case "auth/user-disabled":
        setNewErr(LANG.ERRORS.USER_DISABLED);
        break;
      default:
        setNewErr(error)
        break;
    }

    return () => {
      setNewErr('');
    }
  }, [error, LANG.ERRORS.INVALID_USERNAME, LANG.ERRORS.INVALID_EMAIL, LANG.ERRORS.INVALID_PASSWORD, LANG.ERRORS.PASSWORDS_VARY, LANG.ERRORS.EMAIL_NOT_FOUND, LANG.ERRORS.EMAIL_ALREADY_EXISTS, LANG.ERRORS.TOO_MANY_REQUESTS, LANG.ERRORS.USER_DISABLED, LANG.ERRORS.USER_NOT_FOUND,LANG.ERRORS.WRONG_PASSWORD ]);

  return (
    <li className='authError'>{newErr}</li>
  )
}

export default AuthError;