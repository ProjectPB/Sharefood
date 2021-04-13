import React, { useEffect, useState } from "react";
import "./Main.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { selectSidebarIsOpen } from "../../features/sidebarSlice";
import { CircularProgress } from "@material-ui/core";
import { db } from "../../firebase";

function Main() {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        db.collection("recipes")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setRecipes(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );
        setIsLoading(false);
    }, []);

    /* WITH A REFRESH .get()
            .then((querySnapshot) => {
                setRecipes(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
                setIsLoading(false);
            }); */

    return isLoading ? (
        <CircularProgress className="processingIcon" size={60} />
    ) : (
        <div className="main">
            {sidebarIsOpen ? (
                <div className="main--wide">
                    {recipes.map(({ id, data }) => (
                        <Card
                            wide
                            id={id}
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
                            id={id}
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
