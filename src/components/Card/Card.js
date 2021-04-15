import React from "react";
import "./Card.css";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "../../util/Colors.css";

function Card({
    wide,
    id,
    authorId,
    authorName,
    authorProfilePic,
    image,
    ingredients,
    method,
    timestamp,
    title,
    type,
    likesQuantity,
}) {
    const history = useHistory();

    const navToRecipe = () => {
        history.push({
            pathname: `/recipe/${id}`,
        });
    };

    return (
        <div
            onClick={navToRecipe}
            className={`card ${wide ? "card--wide" : "card--narrow"}`}
        >
            <h2 className={`${type}__color`}>{type.toUpperCase()}</h2>
            <img src={image} alt="" />
            <div className="card__info">
                <h1>{title}</h1>
                <div className="card__user">
                    <Avatar src={authorProfilePic} />
                    <p>{authorName}</p>
                </div>
            </div>
            <p>{likesQuantity} polubienia</p>
            <p>{timestamp?.toDate().toLocaleString()}</p>
        </div>
    );
}

export default Card;
