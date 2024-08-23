'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import PongLoader from './PongLoader';
import './globals.css';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [introPageVisible, setIntroPageVisible] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIntroPageVisible(true); 
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const handleIntroPageLoad = () => {
    // Navigate to /introduction after PongLoader is done
    router.push('/introduction');
  };

  useEffect(() => {
    if (!isLoading && introPageVisible) {
      handleIntroPageLoad(); // Call the function when it's appropriate
    }
  }, [isLoading, introPageVisible]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {isLoading ? (
        <PongLoader />
      ) : (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            transition: 'opacity 0.5s',
            opacity: introPageVisible ? 1 : 0,
          }}
        >
          {/* You can render anything else here if needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
