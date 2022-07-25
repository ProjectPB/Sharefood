import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../hooks';
import NoData from './../../components/NoData';

import './styles.scss';

const EmptyPage: React.FC = () => {
  const LANG = useLanguage();

  return (
    <div className='emptyPage'>
      <Helmet>
        <title>{LANG.HELMET.PAGE_NOT_FOUND} | Sharefood</title>
      </Helmet>

      <NoData />
    </div>
  )
}

export default EmptyPage;