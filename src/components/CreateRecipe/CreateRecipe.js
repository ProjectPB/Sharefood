import { Close } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeNewRecipe,
    selectNewRecipeIsOpen,
} from "../../features/newRecipeSlice";
import "./CreateRecipe.css";

function CreateRecipe() {
    const dispatch = useDispatch();
    const newRecipeIsOpen = useSelector(selectNewRecipeIsOpen);

    const closeRecipe = () => {
        if (newRecipeIsOpen) {
            dispatch(closeNewRecipe());
        }
    };

    return (
        <div className="createRecipe__container">
            <form className="createRecipe">
                <Close onClick={closeRecipe} />
                <div className="createRecipe__upper">
                    <img
                        src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
                        alt=""
                    />
                    <div className="createRecipe__info">
                        <select className="createRecipe__types">
                            <option value="main">Main</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="soup">Soup</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="drink">Drink</option>
                            <option value="dessert">Dessert</option>
                            <option value="other">Other</option>
                        </select>
                        <div className="createRecipe__title">
                            <h3>Recipe name</h3>
                            <input
                                type="text"
                                className="createRecipe__titleInput"
                                placeholder="Title"
                            />
                        </div>
                    </div>
                </div>
                <div className="createRecipe__body">
                    <div className="createRecipe__textarea">
                        <h3>Ingredients</h3>
                        <textarea placeholder="Ingredients" />
                    </div>
                    <div className="createRecipe__textarea">
                        <h3>Method</h3>
                        <textarea placeholder="Method" />
                    </div>
                </div>
                <button className="createRecipe__button">CREATE</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
