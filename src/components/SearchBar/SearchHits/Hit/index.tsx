import React from 'react';
import { Avatar } from '@material-ui/core';

import './styles.scss';

interface Props {
  title: string,
  type?: string,
  image?: string,
  avatarSrc?: string,
  hideResults: () => void;
  hitType: string;
}

const Hit: React.FC<Props> = (({ title, type, image, avatarSrc, hideResults, hitType }) => {
  return (
    <div className="searchHit" onClick={hideResults}>
      <div className="searchHit__data">
        <h2 className="searchHit__title">{title}</h2>
        {hitType === 'recipe' && <h3 className="searchHit__type">{type}</h3>}
      </div>
      {hitType === 'recipe' && <img alt={title} src={image} className="searchHit__recipeImg" />}
      {hitType === 'user' && <Avatar src={avatarSrc} alt={title} className="searchHit__profileImg" />}
    </div>
  )
});

export default Hit;