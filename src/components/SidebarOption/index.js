import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "./../../redux/UI/ui.actions";
import "./styles.css";

const mapState = ({ ui }) => ({
  sidebarIsOpen: ui.sidebarOpen,
});

const SidebarOption = ({ Icon, title }) => {
  const { sidebarIsOpen } = useSelector(mapState);
  const dispatch = useDispatch();

  const minimalizeSidebar = () => {
    if (sidebarIsOpen && window.innerWidth < 600) {
      dispatch(closeSidebar());
    }
  };

  return (
    <div
      onClick={minimalizeSidebar}
      className={sidebarIsOpen ? "sidebar__option" : "sidebar__option--hidden"}
    >
      <Icon fontSize="large" />
      <h2>{title}</h2>
    </div>
  );
};

export default SidebarOption;
