import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import SearchBar from "./components/SearchBar";
import Recipe from "./components/Recipe/Recipe";
import { auth } from "./firebase";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";

function App() {
    const [width, setWidth] = useState(window.innerWidth);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

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
        });
    }, []);

    return (
        <div className="app">
            {!user ? (
                <Authentication />
            ) : (
                <Router>
                    <Header />
                    {width <= 600 && <SearchBar />}
                    <Switch>
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
