import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import SearchBar from "./components/SearchBar";
import Recipe from "./components/Recipe/Recipe";

function App() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
    }, []);

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/recipe">
                        <Header />
                        {width <= 600 && <SearchBar />}
                        <Recipe />
                    </Route>
                    <Route path="/">
                        <Header sidebarIconDisplayed />
                        {width <= 600 && <SearchBar />}
                        <div className="app__main">
                            <Sidebar />
                            <Main />
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
