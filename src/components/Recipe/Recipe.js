import { Avatar, CircularProgress } from "@material-ui/core";
import {
    DeleteOutlined,
    Favorite,
    FavoriteBorderOutlined,
    DateRange,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import "./Recipe.css";
import "../../util/Colors.css";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import firebase from "firebase";
import NoData from "../NoData/NoData";
import Moment from "react-moment";

function Recipe() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const history = useHistory();
    const recipeId = location.pathname.substring(8);
    const [recipeData, setRecipeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        db.collection("recipes")
            .doc(recipeId)
            .onSnapshot((doc) => {
                setRecipeData(doc.data());
                setIsLoading(false);
            });
    }, []);

    const likeRecipe = (e) => {
        e.preventDefault();

        db.collection("recipes")
            .doc(recipeId)
            .update({
                likesUsers: firebase.firestore.FieldValue.arrayUnion(user.uid),
                likesQuantity: firebase.firestore.FieldValue.increment(1),
            });
    };

    const dislikeRecipe = (e) => {
        e.preventDefault();

        db.collection("recipes")
            .doc(recipeId)
            .update({
                likesUsers: firebase.firestore.FieldValue.arrayRemove(user.uid),
                likesQuantity: firebase.firestore.FieldValue.increment(-1),
            });
    };

    const deleteRecipe = (e) => {
        e.preventDefault();

        const answer = window.confirm(
            "Are you sure you want to delete this recipe?"
        );

        if (answer) {
            db.collection("recipes").doc(recipeId).delete();
            storage.refFromURL(recipeData?.image).delete();
            alert("Recipe deleted");
            history.push("/");
        } else {
            return;
        }
    };

    return isLoading ? (
        <div className="recipe__processing">
            <CircularProgress size={60} />
        </div>
    ) : (
        <div className="recipe__container">
            {!recipeData ? (
                <NoData />
            ) : (
                <div className="recipe">
                    <div className="recipe__upper">
                        <img
                            className="recipe__image"
                            src={recipeData?.image}
                            alt=""
                        />
                        <div className="recipe__info">
                            <h2 className={`${recipeData?.type}__color`}>
                                {recipeData?.type?.toUpperCase()}
                            </h2>
                            <h1 className="recipe__title">
                                {recipeData?.title}
                            </h1>
                            <div className="recipe__infoBottom">
                                <div className="recipe__likes">
                                    {!recipeData?.likesUsers?.includes(
                                        user.uid
                                    ) ? (
                                        <FavoriteBorderOutlined
                                            onClick={likeRecipe}
                                            fontSize="large"
                                        />
                                    ) : (
                                        <Favorite
                                            onClick={dislikeRecipe}
                                            fontSize="large"
                                        />
                                    )}
                                    <p>{recipeData?.likesQuantity}</p>
                                </div>
                                <div className="recipe__timeContainer">
                                    <DateRange />
                                    <Moment
                                        format="YYYY MMMM DD"
                                        className="recipe__time"
                                    >
                                        {recipeData?.timestamp?.toDate()}
                                    </Moment>
                                </div>
                                <div className="recipe__author">
                                    <p>{recipeData?.authorName}</p>
                                    <Avatar
                                        src={recipeData?.authorProfilePic}
                                        alt=""
                                    />
                                </div>
                                {recipeData?.authorId === user.uid && (
                                    <div className="recipe__delete">
                                        <DeleteOutlined
                                            className="recipe__delete"
                                            onClick={deleteRecipe}
                                            fontSize="large"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="recipe__body">
                        <div className="recipe__ingredients">
                            <h2 className={`${recipeData?.type}__color`}>
                                Ingredients
                            </h2>
                            <ul className="recipe__ingredientsList">
                                {recipeData?.ingredients?.map(
                                    (ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="recipe__method">
                            <h2 className={`${recipeData?.type}__color`}>
                                Method
                            </h2>
                            <ul className="recipe__steps">
                                {recipeData?.method?.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipe;
