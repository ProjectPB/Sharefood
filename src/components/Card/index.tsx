import React, { useState } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import 'moment/locale/pl';
import { Link } from "react-router-dom";
import { AccessTimeOutlined, LocalDining } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { State } from "../../shared/types";
import { translateType } from "../../shared/functions";

import './styles.scss';

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

const mapState = ({ ui }: State) => ({
  language: ui.language,
});

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
  const { language } = useSelector(mapState);

  return (
    <div onClick={() => keepScrollHeight()} className={`${hidden ? "card--hidden" : "card"}`}>
      <Link to={`/recipe/${id}`} >
        <div className="card__container">
          <img
            src={image}
            onLoad={() => setLoaded(true)}
            alt="recipe"
            className="card__img"
          />

          {!loaded && <div className='cardImg--loading__overlay' />}

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
                  <p className="card__text card__type">{type && translateType(type, language)}</p>
                </div>
                <div className="card__infoContainer card__timestamp">
                  <AccessTimeOutlined className="card__icon" />
                  <Moment locale={(language === 'polish') ? 'pl' : 'en'} fromNow className="card__text">
                    {timestamp?.toDate()}
                  </Moment>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </Link >
    </div >
  );
};

export default Card;
