import React, { useState } from "react";
import "./Sidebar.css";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


function Sidebar({ hidden }) {
  return (
    <div className={hidden ? "sidebar--hidden" : "sidebar"}>
      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <HomeIcon fontSize="large" />
        <h1>MAIN</h1>
      </div>

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <WhatshotIcon fontSize="large" />
        <h1>POPULAR</h1>
      </div>

      <hr />

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <MenuBookIcon fontSize="large" />
        <h1>CREATED BY ME</h1>
      </div>

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <FavoriteIcon fontSize="large" />
        <h1>FAVORITE</h1>
      </div>

      <hr />

      <div className={hidden ? "sidebar__option--hidden" : "sidebar__option"}>
        <LibraryAddIcon fontSize="large"/>
        <h1>COLLECTIONS</h1>
      </div>
    </div>
  );
}

export default Sidebar;
