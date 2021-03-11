import {
    Favorite,
    Home,
    LibraryAdd,
    MenuBook,
    Whatshot,
} from "@material-ui/icons";
import React from "react";
import "./Sidebar.css";

function Sidebar({ hidden }) {
    return (
        <div className={hidden ? "sidebar--hidden" : "sidebar"}>
            <div
                className={
                    hidden ? "sidebar__option--hidden" : "sidebar__option"
                }
            >
                <Home fontSize="large" />
                <h1>MAIN</h1>
            </div>

            <div
                className={
                    hidden ? "sidebar__option--hidden" : "sidebar__option"
                }
            >
                <Whatshot fontSize="large" />
                <h1>POPULAR</h1>
            </div>

            <hr />

            <div
                className={
                    hidden ? "sidebar__option--hidden" : "sidebar__option"
                }
            >
                <MenuBook fontSize="large" />
                <h1>CREATED BY ME</h1>
            </div>

            <div
                className={
                    hidden ? "sidebar__option--hidden" : "sidebar__option"
                }
            >
                <Favorite fontSize="large" />
                <h1>FAVORITE</h1>
            </div>

            <hr />

            <div
                className={
                    hidden ? "sidebar__option--hidden" : "sidebar__option"
                }
            >
                <LibraryAdd fontSize="large" />
                <h1>COLLECTIONS</h1>
            </div>
        </div>
    );
}

export default Sidebar;
