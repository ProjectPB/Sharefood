import { Avatar } from "@material-ui/core";
import { FavoriteOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import "./Recipe.css";

function Recipe() {
    const [ingredients, setIngredients] = useState([
        "jajka",
        "chleb",
        "masło",
        "ziemniaczki",
        "sól",
        "pieprz",
    ]);

    const [steps, setSteps] = useState([
        "Zetrzyj sobie ser tu na tarce, żeby był dobrze starty i ładnie elegancko",
        "obróć",
        "mieszaj",
        "gotuj",
        "podrzuć",
        "obróć",
        "mieszaj",
        "gotuj",
        "podrzuć",
        "obróć",
        "mieszaj",
        "gotuj",
    ]);

    return (
        <div className="recipe__container">
            <div className="recipe">
                <div className="recipe__upper">
                    <img
                        className="recipe__image"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAANlBMVEXMzMzPz8+VlZWRkZHJycnGxsaWlpaZmZmqqqrExMSlpaWhoaHLy8uxsbG6urqenp64uLiurq4Z3VcBAAAFOElEQVR4nO2d6XLkKgyFAYNZzPr+L3slwEvPpDOpTJJyzz1fJd2WDcQ6RgL8gwgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAjpTyifGJKh+rfzOkaaH5eePSX4znUClX91I6XaqYD9W/C2Ex/CXzqojaz8mqTuM5jQstYda3bCRxaSx9421/IeTt0MAotVq6c8+GvxpPqVyKPHf8vI0dRn4wvv3+vwJtpwZOFS9NUBsbgQ2/qfBe1VhUoCpJKW6gKdvr29HYMMq33/9X4NTaNTDWcvjyF3WDbkjfjaeYpVeRm6KUoMvKPYB0ydxKNzR9/ZQff0FWbusa5MX1E22pFB/TcMvhw57mL+k+Lxsfy7Q0KfzSOxAZia+E07g9do1dA0m+d4dIFCHdiGrKFW73ONm1h0xY91PD9/nN7vbzeQ3xNN4PpnvANzs02OYj9+smZJnJ0KvtGPhW1QS7uBzhYfIYEBzFgnTLGES8LVqGvTG7xZ9y5bOQw3FqYEdm5IQg5KqmoeyuAfUJSg4U7u2xCRmzoh5CrQxtdLFGlt2w9u4a8MOXhwa6n4tWsQbD0Ot6RL8uFBh5GRFxkN22Kur4hwakEmtg9sb0j3jyeSj19btnDdQyT9pFyEVNY10ODSTNGXKZgX6cTIviYVQcbgtq7hBUlOXmGoxxcGqw/kkDHgPtWh67gUw8HaRmXlQDGgooEjgWNH3ut01j+tuxwBluzgKvjUhNc+QQXzQWpFUbw1/pkhPXS0580CBuan3DJVobUBo8c6I6c6J5AQ0666ooL5xjY7mOjeUSC/VxFRT9HCVJG89jYy9Kc8vr2HjzcUFupbOqUtoxR6pjjlR/nSMR1GGUveSDbS6JyGV/nRa90hxJDno+uMyV03WuXE8NkrJ9fDyqh3mVlgpGnnPldp0r/zKbuCljXJjLnLlMemvNZArNA2g+dK4gqirc02ls2PS+ZhrLJDMMavP9xfddmBqMtTMtly9r53LpyhQshfLb9RRNGJqhtfPas8QLr50PDfTMkP3JmavR8WrhR0vrhXN4dKPU8FTPFJsvxot0g2N288u7tPXwpxPD0h+wCEs5Ur3eFn59Vvyo//AuzX7kXdxt2F8ISJ1cMrthLsYo9dv7A3a1ubb3Cxmpin/LeCXwbh0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+F9Rj49/lJjzHzYGk0HOj7MSV/E6E9r0YyP8ca1vXey52b5TY773VoyED9n1rUmPM/2YP/aDqUG3+o/QvKet87W1qlOJwth6iORSpavZJWrWBfoDy+03X/NJChe3kETKMsmaRQouyhZCTCFoUYPbugaOiuQkI++/pxsp0qLMpF5KiX4PDSrvZCgiNREd6UE6tBfQgDyj22zeJ7/FZnJ3tWXpG10kZ8zoB1TECKczJ4ZoQwiWNRAyeedd3jWQrW/EGrmjtOiM863eX4PikqCOnjw9sZydzJujXty0zIUO+InvsUBFcnIc3aMf6KlB3rI/NBgbzkXez9OREmnzL6BBIncqPUwjm9Oh0uPX3kt65qZpkwVF/YgFKqKF3uqZD3YNoo/cD7Q2ohodsqHwSslTjAShvUi318DwXossAqdyUSP/R5YURdZ8QB3bpDrGxsxF9NiNM3Ilyvec933f0ZS6SCMNM1dofLU2qtb3cfTmyZ++G9eR7xgj+oG8FNHpnWnCuVPjby3+S+R6+7EeAPAS/AeHcS6vbrevowAAAABJRU5ErkJggg=="
                        alt=""
                    />
                    <div className="recipe__info">
                        <h2>MAIN</h2>
                        <h1>
                            Spaghetti z sosem pomidorowym, kurczakiem,
                            krewetkami, makaronem, ziemniaczkami i koperkiem
                        </h1>
                        <div className="recipe__infoBottom">
                            <div className="recipe__author">
                                <Avatar src="" alt="" />
                                <h5>by @autor@</h5>
                            </div>
                            <div className="recipe__likes">
                                <FavoriteOutlined fontSize="large" />
                                <p>345</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recipe__body">
                    <div className="recipe__ingredients">
                        <h2>INGREDIENTS</h2>
                        <ul className="recipe__ingredientsList">
                            {ingredients.map((ingredient) => (
                                <li>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="recipe__method">
                        <h2>METHOD</h2>
                        <ul className="recipe__steps">
                            {steps.map((step) => (
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
