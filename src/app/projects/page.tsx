'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NeonBar from '../components/NeonBar';
import RotatingSphere from '../components/RotatingSphere';
import Stage from '../components/Stage';
import ProjectList from './ProjectList'; 
import RomanNumeralV from '../components/RomanNumeralV';
import SmokeEffects from '../components/SmokeEffects';
import ProjectDetails from './ProjectDetails'; 
import BackdropCanvas from '../components/Backdrop';
import NavBar from '../components/NavBar';

// Lighting component
const Lighting: React.FC = () => (
  <>
    <pointLight position={[0, 0, -1]} intensity={50} color='#457A8F' />
    <rectAreaLight position={[0, 0, -2.8]} width={4} height={10} intensity={5} color='#457A8F' />
  </>
);

const Project: React.FC = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showSphere, setShowSphere] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768); // Assuming 768px as the breakpoint for small devices

  const currentProject = ProjectList[currentProjectIndex];
  const { projectNum } = currentProject;

  // Debounced handle scroll
  const handleScroll = useCallback((event: WheelEvent) => {
    if (!animationStarted) {
      if (event.deltaY > 0) {
        setTriggerAnimation(true);
        setAnimationStarted(true);
        setCurrentProjectIndex(prev => (prev + 1) % ProjectList.length);
      } else if (event.deltaY < 0) {
        setTriggerAnimation(true);
        setAnimationStarted(true);
        setCurrentProjectIndex(prev => (prev - 1 + ProjectList.length) % ProjectList.length);
      }
    }
  }, [animationStarted]);

  // Debounced handle touch
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (event.touches.length > 0) {
      const { clientY } = event.touches[0];
      (event.target as HTMLElement).dataset.touchStart = clientY.toString();
    }
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    const touchStart = parseFloat((event.target as HTMLElement).dataset.touchStart || '0');
    if (event.touches.length > 0) {
      const { clientY } = event.touches[0];
      const deltaY = clientY - touchStart;

      if (!animationStarted) {
        if (deltaY > 75) { 
          setTriggerAnimation(true);
          setAnimationStarted(true);
          setCurrentProjectIndex(prev => (prev - 1 + ProjectList.length) % ProjectList.length);
          (event.target as HTMLElement).dataset.touchStart = clientY.toString(); 
        } else if (deltaY < -75) { 
          setTriggerAnimation(true);
          setAnimationStarted(true);
          setCurrentProjectIndex(prev => (prev + 1) % ProjectList.length);
          (event.target as HTMLElement).dataset.touchStart = clientY.toString(); 
        }
      }
    }
  }, [animationStarted]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleScroll, handleTouchStart, handleTouchMove]);

  useEffect(() => {
    const sequence = async () => {
      if (animationStarted) {
        setTriggerAnimation(true);
        await new Promise(resolve => setTimeout(resolve, 0)); // Wait for NeonBar animations

        setShowSphere(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for the sphere to be fully visible

        setTriggerAnimation(false);
        await new Promise(resolve => setTimeout(resolve, 200)); // Wait for sphere to start disappearing
        setShowSphere(false); // Hide the sphere

        setAnimationStarted(false); // Reset animation started state
      }
    };

    sequence();
  }, [animationStarted]);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth < 768);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const barSpacing = 150;
  const totalWidth = projectNum * barSpacing; // Total width for all bars
  const startPosition = -totalWidth / 2 + barSpacing / 2; // Start position to center bars

  const romanNumeralPosition: [number, number, number] = [0, 70, -700];
  const romanNumeralWidth = 1.3;

  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 z-[4]'>
        <NavBar/>
      </div>
      
      <div className={`fixed top-0 left-0 right-0 bottom-0 z-[1] transition-opacity duration-1000`}>
        <BackdropCanvas />
      </div>

      <div className="fixed bottom-0 translate-x-0 lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:p-[6rem] z-[4] pointer-events-auto">
        <ProjectDetails projectNum={currentProject.projectNum} triggerAnimation={triggerAnimation}  />
      </div>

      <div className={`fixed top-0 left-0 right-0 bottom-0 z-[2] transition-opacity duration-1000`}>
        <Canvas style={{ height: '100vh', width: '100vw', pointerEvents: 'none' }} camera={{ position: [0, 0, 10], fov: 75 }}>
          <Lighting />

          {projectNum === 5 ? (
            <RomanNumeralV
              triggerAnimation={triggerAnimation} 
              position={romanNumeralPosition} 
              width={romanNumeralWidth} 
            />
          ) : (
            Array.from({ length: projectNum }, (_, i) => {
              const position: [number, number, number] = [startPosition + i * barSpacing, 0, -700];
              const width = projectNum === 1 ? 1 : 0.5; 
              return (
                <NeonBar 
                  key={i} 
                  triggerAnimation={triggerAnimation} 
                  position={position}
                  width={width}
                />
              );
            })
          )}

          {showSphere && <RotatingSphere triggerAnimation={triggerAnimation} projectName={currentProject.projectName} />}
          <Stage 
            triggerAnimation={triggerAnimation} 
            modelSrc={currentProject.modelSrc}
            position={currentProject.position}
            scale={currentProject.scale}
          />
          
          {!isSmallDevice && showSphere && <SmokeEffects textureUrl="/smoke.png" triggerAnimation={triggerAnimation} />}
          
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.1}
              intensity={1.5}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
};

export default Project;
