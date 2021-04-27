import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { Favorite } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import "./Card.css";
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
    hidden,
}) {
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
            <h2 className={`card__type ${type}__color`}>
                {type?.toUpperCase()}
            </h2>
            <img
                style={imgLoaded ? {} : { visibility: "none" }}
                onLoad={() => setImgLoaded(true)}
                src={image}
                alt=""
            />
            <div className="card__info">
                <h1 className="card__title">{title}</h1>
                <div className="card__data">
                    <div className="card__likes">
                        <Favorite fontSize="small" />
                        <p>{likesQuantity}</p>
                    </div>
                    <Moment fromNow className="card__dataTime">
                        {timestamp?.toDate()}
                    </Moment>
                    <div className="card__user">
                        <p>{authorName}</p>
                        <Avatar src={authorProfilePic} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
