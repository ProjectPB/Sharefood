import React, { useState } from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { AccessTimeOutlined, LocalDining } from "@material-ui/icons";
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
  keepScrollHeight?: () => void;
}

const Card: React.FC<Data> = ({
  id,
  username,
  profilePic,
  image,
  timestamp,
  title,
  type,
  hidden,
  keepScrollHeight,
}) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const navToRecipe = () => {
    keepScrollHeight && keepScrollHeight();
    if (!hidden) {
      navigate({
        pathname: `/recipe/${id}`,
      });
    }
  };

  return (
    <div onClick={navToRecipe} className={`${hidden ? "card--hidden" : "card"}`}>
      {!loaded && <div className='cardImg--loading__overlay' />}
      <img
        src={image}
        onLoad={() => setLoaded(true)}
        alt="recipe"
      />

      {!loaded &&
        <div className="cardBody--loading__overlay">
          <div className="cardTitle--loading__overlay" />
          <div className="cardAvatar--loading__overlay" />
          <div className="cardInfo--loading__overlay" />
        </div >}

      {loaded && <div className="card__body">
        <h1 className="card__title">{title}</h1>
        <div className="card__dataContainer">
          <div className="card__data">
            <div className="card__infoContainer">
              <Avatar className="card__icon" src={profilePic} />
              <p className="card__text">{username}</p>
            </div>
          </div>
          <div className="card__data">
            <div className="card__infoContainer">
              <LocalDining className="card__icon" />
              <p className="card__text">{type && capitalizeLetter(type)}</p>
            </div>
            <div className="card__infoContainer card__timestamp">
              <AccessTimeOutlined className="card__icon" />
              <Moment fromNow className="card__text">
                {timestamp?.toDate()}
              </Moment>
            </div>
          </div>
        </div>
      </div>
      }
    </div >
  );
};

export default Card;
