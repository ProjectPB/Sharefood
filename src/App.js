import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import SearchBar from "./components/SearchBar/SearchBar";
import Recipe from "./components/Recipe/Recipe";
import Authentication from "./components/Authentication/Authentication";
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
                            <div className="app__main">
                                <Sidebar />
                                <Main fetch="search" />
                            </div>
                        </Route>
                        <Route path="/recipe/:recipeId">
                            <Recipe />
                        </Route>
                        <Route path="/favorite">
                            <div className="app__main">
                                <Sidebar />
                                <Main fetch="favorite" />
                            </div>
                        </Route>
                        <Route path="/my">
                            <div className="app__main">
                                <Sidebar />
                                <Main fetch="my" />
                            </div>
                        </Route>
                        <Route path="/popular">
                            <div className="app__main">
                                <Sidebar />
                                <Main fetch="popular" />
                            </div>
                        </Route>
                        <Route path="/">
                            <div className="app__main">
                                <Sidebar />
                                <Main fetch="all" />
                            </div>
                        </Route>
                    </Switch>
                </Router>
            )}
        </div>
    );
}

export default App;
