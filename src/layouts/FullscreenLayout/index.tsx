import React from 'react';
import { Outlet } from 'react-router';

import "./styles.css";

const FullscreenLayout: React.FC = () => {
  return <div className="fullscreen"><Outlet /></div>;
};

export default FullscreenLayout;
