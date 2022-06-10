import React from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../hooks";
import { NavLink } from "react-router-dom";
import { FavoriteBorderOutlined, FavoriteOutlined, Home, MenuBook, Whatshot } from "@material-ui/icons";
import { State } from "../../shared/types";

import SidebarOption from "../SidebarOption";

import "./styles.scss";

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
});

const Sidebar: React.FC = () => {
  const { currentUser, sidebarIsOpen } = useSelector(mapState);
  const LANG = useLanguage();

  return (
    <div className={sidebarIsOpen ? "sidebar" : "sidebar--hidden"}>
      <NavLink to="/" className={(navData) => navData.isActive ? "active" : ""}>
        <SidebarOption Icon={Home} title={LANG.SIDEBAR.HOME} />
      </NavLink>

      <NavLink to="/popular" className={(navData) => navData.isActive ? "active" : ""}>
        <SidebarOption Icon={Whatshot} title={LANG.SIDEBAR.POPULAR} />
      </NavLink>

      {currentUser ? (
        <NavLink to="/my" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={MenuBook} title={LANG.SIDEBAR.YOUR} />
        </NavLink>
      ) : (
        <NavLink to="/auth" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={MenuBook} title={LANG.SIDEBAR.YOUR} hidden />
        </NavLink>
      )}

      {currentUser ? (
        <NavLink to="/favorite" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={FavoriteBorderOutlined} title={LANG.SIDEBAR.FAVORITE} />
        </NavLink>
      ) : (
        <NavLink to="/auth" className={(navData) => navData.isActive ? "active" : ""}>
          <SidebarOption Icon={FavoriteBorderOutlined} title={LANG.SIDEBAR.FAVORITE} hidden />
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
