import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
    return (
        <div className="app">
            <Header />
            <div className="app__main">
                <Sidebar />
                <Main />
            </div>
        </div>
    );
}

export default App;
