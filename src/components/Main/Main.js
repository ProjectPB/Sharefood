import React, { useEffect, useState } from "react";
import "./Main.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { selectSidebarIsOpen } from "../../features/sidebarSlice";
import { Avatar } from "@material-ui/core";
import { db } from "../../firebase";

function Main() {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);
    const [recipes, setRecipes] = useState([]);

    /* recipesData:
    authorId,
    authorName,
    authorProfilePic,
    image
    ingredients,
    method,
    timestamp,
    title,
    type */

    useEffect(() => {
        db.collection("recipes")
            .orderBy("timestamp", "desc")
            .get()
            .then((querySnapshot) => {
                setRecipes(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
    }, []);

    console.log(recipes);

    return (
        <div className="main">
            {sidebarIsOpen ? (
                <div className="main--wide">
                    {recipes.map(({ id, data }) => (
                        <Card
                            wide
                            authorId={data.authorId}
                            authorName={data.authorName}
                            authorProfilePic={data.authorProfilePic}
                            image={data.image}
                            ingredients={data.ingredients}
                            method={data.method}
                            timestamp={data.timestamp}
                            title={data.title}
                            type={data.type}
                        />
                    ))}
                </div>
            ) : (
                <div className="main--narrow">
                    {recipes.map(({ id, data }) => (
                        <Card
                            authorId={data.authorId}
                            authorName={data.authorName}
                            authorProfilePic={data.authorProfilePic}
                            image={data.image}
                            ingredients={data.ingredients}
                            method={data.method}
                            timestamp={data.timestamp}
                            title={data.title}
                            type={data.type}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Main;
