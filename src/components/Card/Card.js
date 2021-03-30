import { FavoriteOutlined } from "@material-ui/icons";
import React from "react";
import "./Card.css";
import { useHistory } from "react-router-dom";

function Card({ user, image, title, UserImage }) {
    const history = useHistory();

    const navToRecipe = () => {
        history.push("/recipe");
    };

    return (
        <div onClick={navToRecipe} className="card">
            <h1>MAIN</h1>
            <img src={image} alt="" />
            <div className="card__info">
                <h1>{title}</h1>
                <div className="card__right">
                    <div className="card__favorite">
                        <FavoriteOutlined />
                        <p>345</p>
                    </div>
                    <div className="card__user">
                        <UserImage />
                        <p>{user}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
