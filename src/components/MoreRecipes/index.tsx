import React, { useState } from 'react';

import './styles.scss'

const MoreRecipes = () => {
  const imgSrc = 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FTest%2F1656110698908UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2testJPEG_HIGH?alt=media&token=0b6969ea-4305-4b64-9aff-6c78ce3db195';
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='moreRecipes'>
      <h1>Related Recipes</h1>

      <div className="moreRecipes__cards">
        <div className="moreRecipes__card">
          <img src={imgSrc} alt="" onLoad={() => setLoaded(true)} />
          {!loaded && <div className='moreRecipes__cardImg--loading-overlay' />}
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
          <p>titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
        </div>
        <div className="moreRecipes__card">
          <img src={imgSrc} alt="" />
          <p>titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
        </div>
      </div>
    </div>
  )
}

export default MoreRecipes;