import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/features/userSlice";
import { auth } from "./firebase/firebase";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import Authentication from "./components/Authentication";
import { CircularProgress } from "@material-ui/core";
import "./App.css";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
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
      <Router>
        <Switch>
          <Route path="/results">
            <Header />
            {width <= 600 && <SearchBar />}
            <Main fetch="search" />
          </Route>
          <Route path="/recipe/:recipeId">
            <Header />
            {width <= 600 && <SearchBar />}
            <Main recipe />
          </Route>
          <Route path="/auth">
            <Authentication />
          </Route>
          <Route path="/favorite">
            <Header />
            {width <= 600 && <SearchBar />}
            <Main fetch="favorite" />
          </Route>
          <Route path="/my">
            <Header />
            {width <= 600 && <SearchBar />}
            <Main fetch="my" />
          </Route>
          <Route path="/popular">
            <Header />
            {width <= 600 && <SearchBar />}
            <Main fetch="popular" />
          </Route>
          <Route path="/">
            <Header />
            {width <= 600 && <SearchBar />}
            <Main fetch="all" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
