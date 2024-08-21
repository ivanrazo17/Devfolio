'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import PongLoader from './PongLoader'; // Adjust path as needed
import Backdrop from './components/Backdrop';
import AboutPage from './about/page'; // Adjust path as needed
import './globals.css';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aboutPageVisible, setAboutPageVisible] = useState(false); // Initially false to show loader
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAboutPageVisible(true); // Show AboutPage after loader
    }, 3000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  const handleAboutPageLoad = () => {
    setAboutPageVisible(false); // Hide AboutPage after loading is complete
    router.push('/projects'); // Navigate to /projects when AboutPage loading is complete
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {isLoading ? (
        <PongLoader />
      ) : (
        <>
          {/* Render AboutPage with higher zIndex */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3, // Ensure it is on top
              transition: 'opacity 0.5s',
              opacity: aboutPageVisible ? 1 : 0, // Fade out effect
            }}
          >
            <AboutPage onFinishLoading={handleAboutPageLoad} />
          </div>          
        </>
      )}
    </div>
  );
};

export default Home;
