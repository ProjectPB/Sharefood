import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { selectUser } from "../../redux/features/userSlice";
import { selectSidebarIsOpen } from "../../redux/features/sidebarSlice";
import { db } from "../../firebase/firebase";
import { useQuery } from "./../../hooks";
import Card from "../Card";
import NoData from "../NoData";
import "./styles.css";

const RenderRecipes = () => {
  const user = useSelector(selectUser);
  const sidebarIsOpen = useSelector(selectSidebarIsOpen);
  const query = useQuery().get("q");
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      db.collection("recipes")
        .where("tags", "array-contains", query)
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
    } else {
      switch (location.pathname) {
        case "/":
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
          break;
        case "/popular":
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
          break;
        case "/my":
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
          break;
        case "/favorite":
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
          break;
        default:
          setIsLoading(false);
          break;
      }
    }

    return () => {
      setIsLoading(true);
      setRecipes([]);
    };
  }, [location.pathname, query]);

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
      {query && (
        <h3 className="renderRecipes__text">
          Search results for {query} ({recipes.length})
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
            authorName={data?.authorName}
            authorProfilePic={data?.authorProfilePic}
            image={data?.image}
            timestamp={data?.timestamp}
            title={data?.title}
            type={data?.type}
            likesQuantity={data?.likesQuantity}
          />
        ))}
        {fillWithHiddenCards()}
      </div>
    </div>
  );
};

export default RenderRecipes;
