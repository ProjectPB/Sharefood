import React from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { AccessTimeOutlined, Favorite, LocalDining } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { capitalizeLetter } from "../../util/formatText";

import "./styles.css";

interface Data {
  id?: string;
  username?: string;
  profilePic?: string;
  image?: string;
  timestamp?: any;
  title?: string;
  type?: string;
  likesQuantity?: number;
  hidden?: boolean;
}

const Card: React.FC<Data> = ({
  id,
  username,
  profilePic,
  image,
  timestamp,
  title,
  type,
  likesQuantity,
  hidden,
}) => {
  const navigate = useNavigate();

  const navToRecipe = () => {
    if (!hidden) {
      navigate({
        pathname: `/recipe/${id}`,
      });
    }
  };

  return (
    <div onClick={navToRecipe} className={hidden ? "hidden" : "card"}>
      <img
        src={image}
        alt="recipe"
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
              <Avatar src={profilePic} />
              <p>{username}</p>
            </div>
          </div>
          <div className="card__dataRight">
            <div className="card__type">
              <LocalDining fontSize="small" />
              <p>{type && capitalizeLetter(type)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
