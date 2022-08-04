import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { setLanguage } from '../../redux/UI/ui.actions';

const RedirectPage = ({ link }: { link: string }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage('polish'));
  }, [dispatch]);

  return <Navigate replace to={link} />
}

export default RedirectPage;  