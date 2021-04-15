import React, { useEffect, useState } from "react";
import "./Main.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { selectSidebarIsOpen } from "../../features/sidebarSlice";
import { CircularProgress } from "@material-ui/core";
import { db } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import { useLocation } from "react-router";

function Main({ fetch }) {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);
    const user = useSelector(selectUser);
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const location = useLocation();

    useEffect(() => {
        switch (fetch) {
            case "all":
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
                        setIsLoading(false);
                    });
                return;
            case "popular":
                db.collection("recipes")
                    .orderBy("likesQuantity", "desc")
                    .get()
                    .then((querySnapshot) => {
                        setRecipes(
                            querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }))
                        );
                        setIsLoading(false);
                    });
                return;
            case "my":
                db.collection("recipes")
                    .where("authorId", "==", user.uid)
                    .orderBy("timestamp", "desc")
                    .get()
                    .then((querySnapshot) => {
                        setRecipes(
                            querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }))
                        );
                        setIsLoading(false);
                    });
                return;
            case "favorite":
                db.collection("recipes")
                    .where("likesUsers", "array-contains", `${user.uid}`)
                    .orderBy("timestamp", "desc")
                    .get()
                    .then((querySnapshot) => {
                        setRecipes(
                            querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }))
                        );
                        setIsLoading(false);
                    });
                return;
        }
    }, [location.pathname]);

    return isLoading ? (
        <CircularProgress className="processingIcon" size={60} />
    ) : (
        <div className="main">
            {recipes.length === 0 && <h2>TU NIKOGO NIE MA</h2>}
            {sidebarIsOpen ? (
                <div className="main--wide">
                    {recipes.map(({ id, data }) => (
                        <Card
                            wide
                            key={id}
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
                            likesQuantity={data.likesQuantity}
                        />
                    ))}
                </div>
            ) : (
                <div className="main--narrow">
                    {recipes.map(({ id, data }) => (
                        <Card
                            id={id}
                            key={id}
                            authorId={data.authorId}
                            authorName={data.authorName}
                            authorProfilePic={data.authorProfilePic}
                            image={data.image}
                            ingredients={data.ingredients}
                            method={data.method}
                            timestamp={data.timestamp}
                            title={data.title}
                            type={data.type}
                            likesQuantity={data.likesQuantity}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Main;
