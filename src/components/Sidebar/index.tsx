import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Favorite, Home, MenuBook, Whatshot } from "@material-ui/icons";
import { State } from "../../shared/types";

import SidebarOption from "../SidebarOption";

import "./styles.css";

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
});

const Sidebar: React.FC = () => {
  const { currentUser, sidebarIsOpen } = useSelector(mapState);

  return (
    <div className={sidebarIsOpen ? "sidebar" : "sidebar--hidden"}>
      <NavLink to="/" className={(navData) => navData.isActive ? "active" : ""}>
        <SidebarOption Icon={Home} title="MAIN" />
      </NavLink>

      <NavLink to="/popular" className={(navData) => navData.isActive ? "active" : ""}>
        <SidebarOption Icon={Whatshot} title="POPULAR" />
      </NavLink>

      {currentUser ? (
        <NavLink to="/my" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={MenuBook} title="MY RECIPES" />
        </NavLink>
      ) : (
        <NavLink to="/auth" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={MenuBook} title="MY RECIPES" hidden />
        </NavLink>
      )}

      {currentUser ? (
        <NavLink to="/favorite" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={Favorite} title="FAVORITE" />
        </NavLink>
      ) : (
        <NavLink to="/auth" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={Favorite} title="FAVORITE" hidden />
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
