import React from "react";
import "./Card.css";

function Card({ user, image, title, UserImage }) {
  return (
    <div className="card">
      <img src={image} alt="" />
      <div className="card__info">
        <h1>{title}</h1>
      <div className="card__user">
        <UserImage />
        <p>{user}</p>
      </div>
      </div>
    </div>
  );
}

export default Card;
