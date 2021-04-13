import { Avatar, CircularProgress } from "@material-ui/core";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./Recipe.css";
import "../../util/Colors.css";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import firebase from "firebase";

function Recipe() {
    const [recipeData, setRecipeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("recipes")
            .doc(location.pathname)
            .onSnapshot((doc) => {
                setRecipeData(doc.data());
                setIsLoading(false);
            });
    }, []);

    const likeRecipe = () => {
        db.collection("recipes")
            .doc(location.pathname)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
            });
        console.log(recipeData);
    };

    const dislikeRecipe = () => {
        db.collection("recipes")
            .doc(location.pathname)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
            });
        console.log(recipeData);
    };

    return isLoading ? (
        <CircularProgress className="processingIcon" size={60} />
    ) : (
        <div className="recipe__container">
            <div className="recipe">
                <div className="recipe__upper">
                    <img
                        className="recipe__image"
                        src={recipeData.image}
                        alt=""
                    />
                    <div className="recipe__info">
                        <h2 className={`${recipeData.type}__color`}>
                            {recipeData.type.toUpperCase()}
                        </h2>
                        <h1>{recipeData.title}</h1>
                        <div className="recipe__infoBottom">
                            <div className="recipe__author">
                                <Avatar
                                    src={recipeData.authorProfilePic}
                                    alt=""
                                />
                                <h5>{recipeData.authorName}</h5>
                            </div>
                            <div className="recipe__likes">
                                {!recipeData.likes.includes(user.uid) ? (
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
                                <p>{recipeData.likes.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recipe__body">
                    <div className="recipe__ingredients">
                        <h2 className={`${recipeData.type}__color`}>
                            Ingredients
                        </h2>
                        <ul className="recipe__ingredientsList">
                            {recipeData.ingredients.map((ingredient) => (
                                <li>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="recipe__method">
                        <h2 className={`${recipeData.type}__color`}>Method</h2>
                        <ul className="recipe__steps">
                            {recipeData.method.map((step) => (
                                <li>{step}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recipe;
