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
      default:
        setNewErr(error)
        break;
    }

    return () => {
      setNewErr('');
    }
  }, [error, LANG.ERRORS.INVALID_USERNAME, LANG.ERRORS.INVALID_EMAIL, LANG.ERRORS.INVALID_PASSWORD, LANG.ERRORS.PASSWORDS_VARY, LANG.ERRORS.EMAIL_NOT_FOUND]);

  return (
    <li className='authError'>{newErr}</li>
  )
}

export default AuthError;