import React from "react";
import { useSelector } from "react-redux";
import { selectSidebarIsOpen } from "../../../features/sidebarSlice";
import "./SidebarOption.css";

function SidebarOption({ Icon, title }) {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);

    return (
        <div className={ sidebarIsOpen ? "sidebar__option--hidden" : "sidebar__option" }>
            <Icon fontSize="large" />
            <h1>{title}</h1>
        </div>
    );
}

export default SidebarOption;
