import React, { useState } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import SatelliteIcon from "@material-ui/icons/Satellite";

function Sidebar({ hidden }) {
  return (
    <div className={hidden ? "sidebar--hidden" : "sidebar"}>
      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <SearchIcon />
        <h1>GŁÓWNA</h1>
      </div>

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <SatelliteIcon />
        <h1>POPULARNE</h1>
      </div>

      <hr />

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <SatelliteIcon />
        <h1>MOJE PRZEPISY</h1>
      </div>

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <SatelliteIcon />
        <h1>ULUBIONE</h1>
      </div>

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <SatelliteIcon />
        <h1>POLUBIONE</h1>
      </div>

      <hr />

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <SatelliteIcon />
        <h1>MOJE KOLEKCJE</h1>
      </div>
    </div>
  );
}

export default Sidebar;
