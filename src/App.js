import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import SearchBar from "./components/SearchBar";

function App() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });
    }, []);

    return (
        <div className="app">
            <Header />
            {width < 600 && <SearchBar />}
            <div className="app__main">
                <Sidebar />
                <Main />
            </div>
        </div>
    );
}

export default App;
