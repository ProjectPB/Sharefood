import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "./../../redux/UI/ui.actions";
import useWidth from "./../../hooks/useWidth";
import "./styles.css";

const mapState = ({ ui }) => ({
  sidebarIsOpen: ui.sidebarOpen,
});

const SidebarOption = ({ Icon, title, hidden }) => {
  const { sidebarIsOpen } = useSelector(mapState);
  const width = useWidth();
  const dispatch = useDispatch();

  const minimalizeSidebar = () => {
    if (sidebarIsOpen && width < 600) {
      dispatch(closeSidebar());
    }
  };

  return (
    <div
      onClick={minimalizeSidebar}
      className={`${
        sidebarIsOpen ? `sidebar__option` : `sidebar__option--narrow`
      } ${hidden ? `sidebar__option--hidden` : ``}`}
    >
      <Icon fontSize="large" />
      <h2>{title}</h2>
    </div>
  );
};

export default SidebarOption;
