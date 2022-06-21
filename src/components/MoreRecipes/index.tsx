import React, { useState } from 'react';

import './styles.scss'

const MoreRecipes = () => {
  const [imgSrc, setImgSrc] = useState('https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FTest%2F1655842992294UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2testJPEG_HIGH?alt=media&token=c028489c-9864-445b-b5f9-f816111a7b71')

  return (
    <div className='moreRecipes'>
      <h1>MORE</h1>

      <div className="moreRecipes__cards">
        <div className="moreRecipes__card">
          <img src={imgSrc} alt="" />
          <p>title</p>
        </div>
        <div className="moreRecipes__card">
          <img src={imgSrc} alt="" />
          <p>title title title title title title title title title title title title title title title title</p>
        </div>
        <div className="moreRecipes__card">
          <img src={imgSrc} alt="" />
          <p>titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
        </div>
        <div className="moreRecipes__card">
          <img src={imgSrc} alt="" />
          <p>title</p>
        </div>
        <div className="moreRecipes__card">
          <img src={imgSrc} alt="" />
          <p>title</p>
        </div>
      </div>
    </div>
  )
}

export default MoreRecipes;