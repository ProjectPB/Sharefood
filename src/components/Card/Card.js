import React, { useEffect, useState } from "react";
import "./Card.css";
import { useHistory } from "react-router-dom";

function Card({ user, image, title, UserImage, wide }) {

    const history = useHistory();

    const navToRecipe = () => {
        history.push(`/recipe`);
    };

    return (
        <div
            onClick={navToRecipe}
            className={`card ${wide ? "card--wide" : "card--narrow"}`}
        >
            <h2>MAIN</h2>
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
