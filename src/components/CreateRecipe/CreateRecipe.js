import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeNewRecipe,
    selectNewRecipeIsOpen,
} from "../../features/newRecipeSlice";
import { selectUser } from "../../features/userSlice";
import "./CreateRecipe.css";
import { renderTags, stringToArray } from "../../util/TextFormat";
import { Close } from "@material-ui/icons";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import { CircularProgress } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function CreateRecipe() {
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [method, setMethod] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [previewImage, setPreviewImage] = useState(
        "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
    );
    const dispatch = useDispatch();
    const newRecipeIsOpen = useSelector(selectNewRecipeIsOpen);
    const user = useSelector(selectUser);

    const closeRecipe = () => {
        if (newRecipeIsOpen) {
            dispatch(closeNewRecipe());
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const validate = () => {
        const inputs = [type, title, ingredients, method, image];

        let checkedInputs = inputs.every((input) => input);

        return checkedInputs;
    };

    const handleCreate = (e) => {
        e.preventDefault();

        validate();

        if (!validate()) {
            return alert("PLEASE MAKE SURE THAT ALL INPUTS ARE FILLED");
        }

        const imageName = new Date().getTime() + image.name;

        const uploadTask = storage.ref(`recipeImages/${imageName}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                alert(error.message);
            },
            () => {
                storage
                    .ref("recipeImages")
                    .child(imageName)
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("recipes").add({
                            authorId: user.uid,
                            authorProfilePic: user.profilePic,
                            authorName: user.displayName,
                            type: type,
                            title: title,
                            image: url,
                            tags: renderTags(title, ingredients, type),
                            ingredients: stringToArray(ingredients),
                            method: stringToArray(method),
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            likesUsers: [],
                            likesQuantity: 0,
                        });
                        alert("Recipe added, Please refresh the website");
                        dispatch(closeNewRecipe());
                    });
            }
        );
    };

    return (
        <div className="createRecipe__container">
            {progress > 0 && progress < 100 && (
                <CircularProgress
                    className="processingIcon"
                    value={progress}
                    size={60}
                />
            )}
            <form className="createRecipe">
                <Close onClick={closeRecipe} />
                <div className="createRecipe__upper">
                    <div className="createRecipe__image">
                        <img src={previewImage} alt="image" />
                        {!image && (
                            <p>For the best results, please attach 4:3 image</p>
                        )}
                        {!image && <AddCircleIcon />}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="createRecipe__imageInput"
                        />
                    </div>
                    <div className="createRecipe__info">
                        <select
                            onChange={(e) => setType(e.target.value)}
                            className="createRecipe__types"
                        >
                            <option value="" hidden>
                                Type
                            </option>
                            <option value="breakfast">Breakfast</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="soup">Soup</option>
                            <option value="main">Main</option>
                            <option value="dessert">Dessert</option>
                            <option value="drink">Drink</option>
                            <option value="other">Other</option>
                        </select>
                        <div className="createRecipe__title">
                            <h3>Recipe</h3>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                required
                                placeholder="Title"
                            />
                        </div>
                    </div>
                </div>
                <div className="createRecipe__body">
                    <div className="createRecipe__ingredientsText">
                        <h3>Ingredients</h3>
                        <textarea
                            placeholder="Ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                    <div className="createRecipe__methodText">
                        <h3>Method</h3>
                        <textarea
                            placeholder="Method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="createRecipe__button"
                    onClick={handleCreate}
                >
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateRecipe;
