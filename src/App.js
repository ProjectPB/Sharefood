import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleOpen = () => {
    setOpenSidebar(!openSidebar);
    console.log(openSidebar);
  };

  return (
    <div className="app">
      <Header />
      <div className="app__main">
        <div className="app__sidebar">
          <button onClick={handleOpen} />
          {openSidebar ? <Sidebar /> : <Sidebar hidden />}
        </div>
        <Main />
      </div>
    </div>
  );
}

export default App;
