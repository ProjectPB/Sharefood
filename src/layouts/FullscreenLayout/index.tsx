import React from 'react';
import { Outlet } from 'react-router';

import "./styles.scss";

const FullscreenLayout: React.FC = () => {
  return <div className="fullscreen"><Outlet /></div>;
};

export default FullscreenLayout;
