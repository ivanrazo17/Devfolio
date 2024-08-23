'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; 
import PongLoader from './PongLoader';
import IntroPage from './introduction/page'; 
import './globals.css';


const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [introPageVisible, setIntroPageVisible] = useState(false); 
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIntroPageVisible(true); 
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  const handleIntroPageLoad = () => {
    // Navigate to /projects only if we are not already on /about
    if (pathname !== '/about') {
      router.push('/projects');
    }
    setIntroPageVisible(false);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {isLoading ? (
        <PongLoader />
      ) : (
        <>
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
            <IntroPage onFinishLoading={handleIntroPageLoad} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
