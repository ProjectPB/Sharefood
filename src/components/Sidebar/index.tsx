import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLanguage, useWidth } from "../../hooks";
import { NavLink } from "react-router-dom";
import { Favorite, Home, MenuBook } from "@mui/icons-material";
import { State } from "../../shared/types";
import { LocalDining } from "@material-ui/icons";

import SidebarOption from "../SidebarOption";

import "./styles.scss";

const mapState = ({ user, ui }: State) => ({
  currentUser: user.currentUser,
  sidebarIsOpen: ui.sidebarOpen,
});

const Sidebar = ({ narrow }: { narrow?: boolean }) => {
  const { currentUser, sidebarIsOpen } = useSelector(mapState);
  const [className, setClassName] = useState('');
  const LANG = useLanguage();
  const width = useWidth();

  useEffect(() => {
    const getClassName = () => {
      if (sidebarIsOpen) {
        if (narrow && width > 600) {
          setClassName('sidebar--narrow');
        } else {
          setClassName('sidebar');
        }
      } else {
        setClassName('sidebar--hidden');
      }
    }

    getClassName();
  }, [width, sidebarIsOpen, narrow])

  return (
    <div className={className}>
      <NavLink to="/" className={(navData) => navData.isActive ? "active orange" : ""}>
        <SidebarOption Icon={Home} title={LANG.SIDEBAR.HOME} />
      </NavLink>

      <NavLink to="/all" className={(navData) => navData.isActive ? "active darkred" : ""}>
        <SidebarOption Icon={LocalDining} title={LANG.SIDEBAR.ALL} />
      </NavLink>

      {currentUser ? (
        <NavLink to="/my" className={(navData) => navData.isActive ? "active teal" : ""}>
          <SidebarOption Icon={MenuBook} title={LANG.SIDEBAR.YOUR} />
        </NavLink>
      ) : (
        <NavLink to="/auth" className={(navData) => navData.isActive ? "active teal" : ""}>
          <SidebarOption Icon={MenuBook} title={LANG.SIDEBAR.YOUR} blocked />
        </NavLink>
      )}

      {currentUser ? (
        <NavLink to="/favorite" className={(navData) => navData.isActive ? "active red" : ""}>
          <SidebarOption Icon={Favorite} title={LANG.SIDEBAR.FAVORITE} />
        </NavLink>
      ) : (
        <NavLink to="/auth" className={(navData) => navData.isActive ? "active red" : ""}>
          <SidebarOption Icon={Favorite} title={LANG.SIDEBAR.FAVORITE} blocked />
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
