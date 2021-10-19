import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectSidebarIsOpen } from "../../redux/features/sidebarSlice";
import SidebarOption from "../SidebarOption";
import { Favorite, Home, MenuBook, Whatshot } from "@material-ui/icons";
import "./styles.css";

const Sidebar = () => {
  const sidebarIsOpen = useSelector(selectSidebarIsOpen);

  return (
    <div className={sidebarIsOpen ? "sidebar" : "sidebar--hidden"}>
      <NavLink to="/" exact activeClassName="selected">
        <SidebarOption selected Icon={Home} title="MAIN" />
      </NavLink>

      <NavLink to="/popular" activeClassName="selected">
        <SidebarOption Icon={Whatshot} title="POPULAR" />
      </NavLink>

      <NavLink to="/my" activeClassName="selected">
        <SidebarOption Icon={MenuBook} title="MY RECIPES" />
      </NavLink>

      <NavLink to="/favorite" activeClassName="selected">
        <SidebarOption Icon={Favorite} title="FAVORITE" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
