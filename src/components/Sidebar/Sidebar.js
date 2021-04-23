import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectSidebarIsOpen } from "../../features/sidebarSlice";
import SidebarOption from "./SidebarOption/SidebarOption";
import { Favorite, Home, MenuBook, Whatshot } from "@material-ui/icons";
import "./Sidebar.css";

function Sidebar() {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);

    return (
        <div className={sidebarIsOpen ? "sidebar--hidden" : "sidebar"}>
            <NavLink to="/" exact activeClassName="selected">
                <SidebarOption selected Icon={Home} title="MAIN" />
            </NavLink>

            <NavLink to="/popular" activeClassName="selected">
                <SidebarOption Icon={Whatshot} title="POPULAR" />
            </NavLink>

            <hr />

            <NavLink to="/my" activeClassName="selected">
                <SidebarOption Icon={MenuBook} title="CREATED BY ME" />
            </NavLink>

            <NavLink to="/favorite" activeClassName="selected">
                <SidebarOption Icon={Favorite} title="FAVORITE" />
            </NavLink>
        </div>
    );
}

export default Sidebar;
