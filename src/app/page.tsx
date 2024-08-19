'use client';

import React from 'react';
import PongLoader from './PongLoader'; // Adjust path as needed
import Project from './projects/page';
import Backdrop from './components/Backdrop';
import AboutPage from './about/page';
import './globals.css';

const Home: React.FC = () => {
  // Simulate a condition to display the loader
  // For demonstration purposes, this will show the loader for 3 seconds and then hide it
  // Adjust this logic based on how you want to control loading visibility

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {isLoading ? (
        <PongLoader />
      ) : (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
            <AboutPage />
          </div>

          {/* Backdrop as the full-screen background */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
            <Backdrop />
          </div>

          {/* NeonLights positioned fixed to remain visible during scroll */}
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
            <Project />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
