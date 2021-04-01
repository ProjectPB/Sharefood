import React, { useEffect, useState } from "react";
import "./Card.css";
import { useHistory } from "react-router-dom";

function Card({ user, image, title, UserImage, wide }) {
    // const [viewWidth, setViewWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         setViewWidth(window.innerWidth);
    //     });
    // }, []);

    const history = useHistory();

    const navToRecipe = () => {
        history.push("/recipe");
    };

    // console.log(`vw ${viewWidth}`);

    return (
        <div onClick={navToRecipe} className={wide ? "card--wide" : "card"}>
            {/* <h1>MAIN</h1> */}
            <img src={image} alt="" />
            {/* <div className="card__info">
                <h1>{title}</h1>
                <div className="card__user">
                    <UserImage />
                    <p>{user}</p>
                </div>
            </div> */}
        </div>
    );
}

export default Card;
