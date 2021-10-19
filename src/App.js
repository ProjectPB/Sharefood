import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/features/userSlice";
import { auth } from "./firebase/firebase";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Authentication from "./components/Authentication";
import Main from "./components/Main";
import { CircularProgress } from "@material-ui/core";
import "./App.css";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            profilePic: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div className="app__processing">
      <h1>Sharefood</h1>
      <CircularProgress size={60} />
    </div>
  ) : (
    <div className="app">
      {!user ? (
        <Authentication />
      ) : (
        <Router>
          <Header />
          {width <= 600 && <SearchBar />}
          <Switch>
            <Route path="/results">
              <Main fetch="search" />
            </Route>
            <Route path="/recipe/:recipeId">
              <Main recipe />
            </Route>
            <Route path="/favorite">
              <Main fetch="favorite" />
            </Route>
            <Route path="/my">
              <Main fetch="my" />
            </Route>
            <Route path="/popular">
              <Main fetch="popular" />
            </Route>
            <Route path="/">
              <Main fetch="all" />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
