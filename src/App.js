import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleOpen = () => {
    setOpenSidebar(!openSidebar);
    console.log(openSidebar);
  };

  return (
    <div className="app">
      <Header />
      <MenuIcon className="app__menuIcon" fontSize="large" onClick={handleOpen} />
      <div className="app__main">
        {openSidebar ? <Sidebar hidden /> : <Sidebar />}
        <Main />
      </div>
    </div>
  );
}

export default App;
