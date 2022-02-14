import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Favorite, Home, MenuBook, Whatshot } from "@material-ui/icons";

import SidebarOption from "../SidebarOption";

import "./styles.css";

const mapState = ({ user, ui }) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
});

const Sidebar: React.FC = () => {
  const { currentUser, sidebarIsOpen } = useSelector(mapState);

  return (
    <div className={sidebarIsOpen ? "sidebar" : "sidebar--hidden"}>
      <NavLink to="/" exact activeClassName="selected">
        <SidebarOption Icon={Home} title="MAIN" />
      </NavLink>

      <NavLink to="/popular" activeClassName="selected">
        <SidebarOption Icon={Whatshot} title="POPULAR" />
      </NavLink>

      {currentUser ? (
        <NavLink to="/my" activeClassName="selected">
          <SidebarOption Icon={MenuBook} title="MY RECIPES" />
        </NavLink>
      ) : (
        <NavLink to="/auth" activeClassName="selected">
          <SidebarOption Icon={MenuBook} title="MY RECIPES" hidden />
        </NavLink>
      )}

      {currentUser ? (
        <NavLink to="/favorite" activeClassName="selected">
          <SidebarOption Icon={Favorite} title="FAVORITE" />
        </NavLink>
      ) : (
        <NavLink to="/auth" activeClassName="selected">
          <SidebarOption Icon={Favorite} title="FAVORITE" hidden />
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
