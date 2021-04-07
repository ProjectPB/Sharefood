import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeNewRecipe,
    selectNewRecipeIsOpen,
} from "../../features/newRecipeSlice";
import "./CreateRecipe.css";
import { stringToArray } from "../../util/TextFormat";
import { Close } from "@material-ui/icons";
import { storage } from "../../firebase";
import { CircularProgress } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function CreateRecipe() {
    const [ingredients, setIngredients] = useState("");
    const [method, setMethod] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("none");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [previewImage, setPreviewImage] = useState(
        "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
    );
    const dispatch = useDispatch();
    const newRecipeIsOpen = useSelector(selectNewRecipeIsOpen);

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

    const handleCreate = (e) => {
        e.preventDefault();

        const imageName = new Date().getTime() + image.name;

        const uploadTask = storage.ref(`images/${imageName}`).put(image);

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
                    .ref("images")
                    .child(imageName)
                    .getDownloadURL()
                    .then(() => {
                        console.log(title);
                        console.log(stringToArray(ingredients));
                        console.log(stringToArray(method));
                        console.log(type);
                        alert("RECIPE ADDED!");
                        dispatch(closeNewRecipe());
                    });
            }
        );
    };

    return (
        <div className="createRecipe__container">
            {progress > 0 && (
                <CircularProgress
                    className="createRecipe__processingIcon"
                    value={progress}
                    size={60}
                />
            )}
            <form className="createRecipe">
                <Close onClick={closeRecipe} />
                <div className="createRecipe__upper">
                    <div className="createRecipe__image">
                        <img src={previewImage} alt="image" />
                        {!image && <p>For the best results, please attach 4:3 image</p> }
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
                                className="createRecipe__titleInput"
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
