import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeSidebar,
    selectSidebarIsOpen,
} from "../../../features/sidebarSlice";
import "./SidebarOption.css";

function SidebarOption({ Icon, title }) {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);
    const dispatch = useDispatch();

    const minimalizeSidebar = () => {
        if (sidebarIsOpen && window.innerWidth < 600) {
            dispatch(closeSidebar());
        }
    };

    return (
        <div
            onClick={minimalizeSidebar}
            className={
                sidebarIsOpen ? "sidebar__option" : "sidebar__option--hidden"
            }
        >
            <Icon fontSize="large" />
            <h2>{title}</h2>
        </div>
    );
}

export default SidebarOption;
