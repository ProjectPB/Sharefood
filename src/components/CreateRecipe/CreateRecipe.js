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
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAANlBMVEXMzMzPz8+VlZWRkZHJycnGxsaWlpaZmZmqqqrExMSlpaWhoaHLy8uxsbG6urqenp64uLiurq4Z3VcBAAAFOElEQVR4nO2d6XLkKgyFAYNZzPr+L3slwEvPpDOpTJJyzz1fJd2WDcQ6RgL8gwgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAjpTyifGJKh+rfzOkaaH5eePSX4znUClX91I6XaqYD9W/C2Ex/CXzqojaz8mqTuM5jQstYda3bCRxaSx9421/IeTt0MAotVq6c8+GvxpPqVyKPHf8vI0dRn4wvv3+vwJtpwZOFS9NUBsbgQ2/qfBe1VhUoCpJKW6gKdvr29HYMMq33/9X4NTaNTDWcvjyF3WDbkjfjaeYpVeRm6KUoMvKPYB0ydxKNzR9/ZQff0FWbusa5MX1E22pFB/TcMvhw57mL+k+Lxsfy7Q0KfzSOxAZia+E07g9do1dA0m+d4dIFCHdiGrKFW73ONm1h0xY91PD9/nN7vbzeQ3xNN4PpnvANzs02OYj9+smZJnJ0KvtGPhW1QS7uBzhYfIYEBzFgnTLGES8LVqGvTG7xZ9y5bOQw3FqYEdm5IQg5KqmoeyuAfUJSg4U7u2xCRmzoh5CrQxtdLFGlt2w9u4a8MOXhwa6n4tWsQbD0Ot6RL8uFBh5GRFxkN22Kur4hwakEmtg9sb0j3jyeSj19btnDdQyT9pFyEVNY10ODSTNGXKZgX6cTIviYVQcbgtq7hBUlOXmGoxxcGqw/kkDHgPtWh67gUw8HaRmXlQDGgooEjgWNH3ut01j+tuxwBluzgKvjUhNc+QQXzQWpFUbw1/pkhPXS0580CBuan3DJVobUBo8c6I6c6J5AQ0666ooL5xjY7mOjeUSC/VxFRT9HCVJG89jYy9Kc8vr2HjzcUFupbOqUtoxR6pjjlR/nSMR1GGUveSDbS6JyGV/nRa90hxJDno+uMyV03WuXE8NkrJ9fDyqh3mVlgpGnnPldp0r/zKbuCljXJjLnLlMemvNZArNA2g+dK4gqirc02ls2PS+ZhrLJDMMavP9xfddmBqMtTMtly9r53LpyhQshfLb9RRNGJqhtfPas8QLr50PDfTMkP3JmavR8WrhR0vrhXN4dKPU8FTPFJsvxot0g2N288u7tPXwpxPD0h+wCEs5Ur3eFn59Vvyo//AuzX7kXdxt2F8ISJ1cMrthLsYo9dv7A3a1ubb3Cxmpin/LeCXwbh0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+F9Rj49/lJjzHzYGk0HOj7MSV/E6E9r0YyP8ca1vXey52b5TY773VoyED9n1rUmPM/2YP/aDqUG3+o/QvKet87W1qlOJwth6iORSpavZJWrWBfoDy+03X/NJChe3kETKMsmaRQouyhZCTCFoUYPbugaOiuQkI++/pxsp0qLMpF5KiX4PDSrvZCgiNREd6UE6tBfQgDyj22zeJ7/FZnJ3tWXpG10kZ8zoB1TECKczJ4ZoQwiWNRAyeedd3jWQrW/EGrmjtOiM863eX4PikqCOnjw9sZydzJujXty0zIUO+InvsUBFcnIc3aMf6KlB3rI/NBgbzkXez9OREmnzL6BBIncqPUwjm9Oh0uPX3kt65qZpkwVF/YgFKqKF3uqZD3YNoo/cD7Q2ohodsqHwSslTjAShvUi318DwXossAqdyUSP/R5YURdZ8QB3bpDrGxsxF9NiNM3Ilyvec933f0ZS6SCMNM1dofLU2qtb3cfTmyZ++G9eR7xgj+oG8FNHpnWnCuVPjby3+S+R6+7EeAPAS/AeHcS6vbrevowAAAABJRU5ErkJggg=="
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
                    <div className="createRecipe__ingredientsText">
                        <h3>Ingredients</h3>
                        <textarea placeholder="Ingredients" />
                    </div>
                    <div className="createRecipe__methodText">
                        <h3>Method</h3>
                        <textarea placeholder="Method" />
                    </div>
                </div>
                <button className="createRecipe__button">Create</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
