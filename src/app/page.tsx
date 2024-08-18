'use client';

import React from 'react';
import NeonLights from './components/NeonLights';
import Backdrop from './components/Backdrop'; 
import "./globals.css";

const Home: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Backdrop as the full-screen background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <Backdrop />
      </div>
      
      {/* NeonLights or any other components that should be displayed on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <NeonLights />
      </div>
    </div>
  );
};

export default Home;
