import React from 'react'
import NoData from './../../components/NoData';

import './styles.scss';

const EmptyPage: React.FC = () => {
  return (
    <div className='emptyPage'>
      <NoData />
    </div>
  )
}

export default EmptyPage;