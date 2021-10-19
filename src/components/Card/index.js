import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { AccessTimeOutlined, Favorite, LocalDining } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { capitalizeLetter } from "../../util/TextFormat";
import "./styles.css";

const Card = ({
  id,
  authorName,
  authorProfilePic,
  image,
  timestamp,
  title,
  type,
  likesQuantity,
  hidden,
}) => {
  const history = useHistory();
  const [imgLoaded, setImgLoaded] = useState(false);

  const navToRecipe = () => {
    if (!hidden) {
      history.push({
        pathname: `/recipe/${id}`,
      });
    }
  };

  return (
    <div onClick={navToRecipe} className={hidden ? "hidden" : "card"}>
      <img
        style={imgLoaded ? {} : { visibility: "none" }}
        onLoad={() => setImgLoaded(true)}
        src={image}
        alt=""
      />
      <div className="card__info">
        <h1 className="card__title">{title}</h1>
        <div className="card__data">
          <div className="card__dataLeft">
            <div className="card__time">
              <AccessTimeOutlined />
              <Moment fromNow className="card__timestamp">
                {timestamp?.toDate()}
              </Moment>
            </div>
            <div className="card__user">
              <Avatar src={authorProfilePic} />
              <p>{authorName}</p>
            </div>
          </div>
          <div className="card__dataRight">
            <div className="card__type">
              <LocalDining fontSize="small" />
              <p>{type && capitalizeLetter(type)}</p>
            </div>
            <div className="card__likes">
              <Favorite fontSize="small" />
              <p>{likesQuantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
