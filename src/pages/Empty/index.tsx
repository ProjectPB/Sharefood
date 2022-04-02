import React from 'react'
import NoData from './../../components/NoData';

const EmptyPage: React.FC = () => {
  return (
    <div className="recipes__container">
      <NoData />
    </div>
  )
}

export default EmptyPage;