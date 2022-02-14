import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../redux/UI/ui.actions";
import { SvgIconComponent } from "@material-ui/icons";
import useWidth from "../../hooks/useWidth";

import "./styles.css";

const mapState = ({ ui }) => ({
  sidebarIsOpen: ui.sidebarOpen,
});

interface Props {
  title: string;
  Icon: SvgIconComponent;
  hidden?: boolean;
}

const SidebarOption: React.FC<Props> = ({ Icon, title, hidden }) => {
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
