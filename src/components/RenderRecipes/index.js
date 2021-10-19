import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { selectUser } from "../../redux/features/userSlice";
import { selectSidebarIsOpen } from "../../redux/features/sidebarSlice";
import { db } from "../../firebase/firebase";
import Card from "../Card";
import NoData from "../NoData";
import "./styles.css";

const RenderRecipes = ({ fetch }) => {
  const user = useSelector(selectUser);
  const sidebarIsOpen = useSelector(selectSidebarIsOpen);

  const location = useLocation();
  const { search } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const searchParams = new URLSearchParams(search);
  const queryResult = searchParams.get("q");

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
      case "search":
        db.collection("recipes")
          .where("tags", "array-contains", queryResult)
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
  }, [location.pathname, search]);

  const fillWithHiddenCards = () => {
    if (recipes.length === 1) {
      return (
        <>
          <Card hidden />
          <Card hidden />
        </>
      );
    } else if (recipes.length === 2) {
      return <Card hidden />;
    }
  };

  return isLoading ? (
    <div className="renderRecipes__processing">
      <CircularProgress size={60} />
    </div>
  ) : (
    <div className="renderRecipes__container">
      {search.includes("?q=") && (
        <h3 className="renderRecipes__queryResult">
          Search results for {queryResult} ({recipes.length})
        </h3>
      )}
      {recipes.length === 0 && <NoData />}
      <div
        className={`renderRecipes ${sidebarIsOpen && "renderRecipes--narrow"}`}
      >
        {recipes.map(({ id, data }) => (
          <Card
            key={id}
            id={id}
            authorName={data.authorName}
            authorProfilePic={data.authorProfilePic}
            image={data.image}
            timestamp={data.timestamp}
            title={data.title}
            type={data.type}
            likesQuantity={data.likesQuantity}
          />
        ))}
        {fillWithHiddenCards()}
      </div>
    </div>
  );
};

export default RenderRecipes;
