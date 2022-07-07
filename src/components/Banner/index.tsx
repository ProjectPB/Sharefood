import React from 'react';

import './styles.scss';

const Banner = () => {
  return (
    <div className="banner">
      <h2>Currently in season</h2>

      <div className="banner__wrapper">
        <div className="banner__img">
          <img src="https://cdn.pixabay.com/photo/2017/11/18/17/09/strawberries-2960533_960_720.jpg" alt="strawberries" />
          <p style={{ backgroundColor: 'rgba(164, 61, 51, 0.5)' }}>Strawberry</p>
        </div>

        <div className="banner__img">
          <img src="https://cdn.pixabay.com/photo/2018/03/17/21/04/fruit-3235152_960_720.jpg" alt="Wild cherry" />
          <p style={{ backgroundColor: 'rgba(98, 48, 14, 0.5)' }}>Wild cherry</p>
        </div>
      </div>
    </div >
  )
}

export default Banner;