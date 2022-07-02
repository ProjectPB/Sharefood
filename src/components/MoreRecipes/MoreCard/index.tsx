import React, { useState } from 'react';

import './styles.scss'

interface Props {
  id: string,
  img: string,
  title: string,
}

const MoreCard = ({ id, img, title }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="moreCard" key={id}>
      <img src={img} alt={title} onLoad={() => setLoaded(true)} />
      {!loaded && <div className='moreCardImg--loading-overlay' />}
      <div className="moreCard__title">
        <p>{title}</p>
      </div>
    </div>
  )
}

export default MoreCard;