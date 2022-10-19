import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { State } from '../../../../shared/types';
import { translateType } from '../../../../shared/functions';

import './styles.scss';

interface Props {
  title: string,
  type?: string,
  image?: string,
  avatarSrc?: string,
  hideResults: () => void;
  hitType: string;
}

const mapState = ({ ui }: State) => ({
  language: ui.language,
});

const Hit: React.FC<Props> = (({ title, type, image, avatarSrc, hideResults, hitType }) => {
  const { language } = useSelector(mapState);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="searchHit" onClick={hideResults}>
      <div className="searchHit__data">
        <h2 className="searchHit__title">{title}</h2>
        {hitType === 'recipe' && <h3 className="searchHit__type">{translateType(type, language)}</h3>}
      </div>
      {hitType === 'recipe' && <img alt={title} src={image} className={`${imgLoaded ? 'searchHit__recipeImg' : "searchHit__recipeImg--hidden"}`} onLoad={() => setImgLoaded(true)} />}
      {hitType === 'user' && <Avatar src={avatarSrc} className="searchHit__profileImg" />}
    </div>
  )
});

export default Hit;