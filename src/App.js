import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";

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
