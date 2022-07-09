import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../redux/UI/ui.actions";
import useWidth from "../../hooks/useWidth";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { State } from "../../shared/types";

import "./styles.scss";

const mapState = ({ ui }: State) => ({
  sidebarIsOpen: ui.sidebarOpen,
});

interface Props {
  title: string;
  blocked?: boolean;
  Icon: any;
  link?: string,
  color?: string,
}

const SidebarOption = ({ Icon, title, blocked, link, color }: Props) => {
  const { sidebarIsOpen } = useSelector(mapState);
  const width = useWidth();
  const dispatch = useDispatch();
  let resolved = useResolvedPath(link);
  let match = useMatch({ path: resolved.pathname, end: true })

  const minimalizeSidebar = () => {
    if (sidebarIsOpen && width < 600) {
      dispatch(closeSidebar());
    }
  };

  return (
    <NavLink to={link} className={match ? `active ${color}` : ""}>
      <div
        onClick={minimalizeSidebar}
        className={`sidebarOption ${blocked ? `sidebarOption--blocked` : ``}`}
      >
        <Icon />
        <h2>{title}</h2>
      </div>
    </NavLink>
  );
};

export default SidebarOption;
