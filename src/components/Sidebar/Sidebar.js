import { Favorite, Home, MenuBook, Whatshot } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectSidebarIsOpen } from "../../features/sidebarSlice";
import "./Sidebar.css";

function Sidebar() {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);

    return (
        <div className={sidebarIsOpen ? "sidebar--hidden" : "sidebar"}>
            <Link to="/">
                <div
                    className={
                        sidebarIsOpen
                            ? "sidebar__option--hidden"
                            : "sidebar__option"
                    }
                >
                    <Home fontSize="large" />
                    <h1>MAIN</h1>
                </div>
            </Link>

            <Link to="/popular">
                <div
                    className={
                        sidebarIsOpen
                            ? "sidebar__option--hidden"
                            : "sidebar__option"
                    }
                >
                    <Whatshot fontSize="large" />
                    <h1>POPULAR</h1>
                </div>
            </Link>
            <hr />
            <Link to="/my">
                <div
                    className={
                        sidebarIsOpen
                            ? "sidebar__option--hidden"
                            : "sidebar__option"
                    }
                >
                    <MenuBook fontSize="large" />
                    <h1>CREATED BY ME</h1>
                </div>
            </Link>
            <Link to="/favorite">
                <div
                    className={
                        sidebarIsOpen
                            ? "sidebar__option--hidden"
                            : "sidebar__option"
                    }
                >
                    <Favorite fontSize="large" />
                    <h1>FAVORITE</h1>
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
