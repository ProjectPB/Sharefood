import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLanguage, useWidth } from "../../hooks";
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
      <SidebarOption Icon={Home} title={LANG.SIDEBAR.HOME} link="/" color="orange" />

      <SidebarOption Icon={LocalDining} title={LANG.SIDEBAR.ALL} link="/all" color="darkred" />

      {currentUser ? (
        <SidebarOption Icon={MenuBook} title={LANG.SIDEBAR.YOUR} link="/my" color="teal" />
      ) : (
        <SidebarOption Icon={MenuBook} title={LANG.SIDEBAR.YOUR} blocked link="/auth" />
      )}

      {currentUser ? (
        <SidebarOption Icon={Favorite} title={LANG.SIDEBAR.FAVORITE} link="/favorite" color="red" />
      ) : (
        <SidebarOption Icon={Favorite} title={LANG.SIDEBAR.FAVORITE} blocked link="/auth" />
      )}
    </div>
  );
};

export default Sidebar;
