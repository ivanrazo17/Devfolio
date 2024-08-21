'use client'
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NeonBar from '../components/NeonBar';
import RotatingSphere from '../components/RotatingSphere';
import Stage from '../components/Stage';
import ProjectList from './ProjectList'; // Adjust import path as necessary
import RomanNumeralV from '../components/RomanNumeralV'; // Import RomanNumeralV component
import SmokeEffects from '../components/SmokeEffects';
import ProjectDetails from './ProjectDetails'; // Import ProjectDetails component
import BackdropCanvas from '../components/Backdrop';

const Lighting: React.FC = () => {
  return (
    <>
      <pointLight
        position={[0, 0, -1]}
        intensity={50}
        color='#457A8F'
      />
      <rectAreaLight
        position={[0, 0, -2.8]}
        width={4}
        height={10}
        intensity={5}
        color='#457A8F'
      />
    </>
  );
};

interface ProjectProps {
  aboutPageVisible: boolean; // New prop to control scroll behavior
}

const Project: React.FC<ProjectProps> = ({ aboutPageVisible }) => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showSphere, setShowSphere] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const currentProject = ProjectList[currentProjectIndex];
  const { projectNum } = currentProject;

  const handleScroll = (event: WheelEvent) => {
    if (!aboutPageVisible && !animationStarted) {
      if (event.deltaY > 0) {
        // Scrolling down
        setTriggerAnimation(true);
        setAnimationStarted(true);
        setCurrentProjectIndex(prev => (prev + 1) % ProjectList.length);
      } else if (event.deltaY < 0) {
        // Scrolling up
        setTriggerAnimation(true);
        setAnimationStarted(true);
        setCurrentProjectIndex(prev => (prev - 1 + ProjectList.length) % ProjectList.length);
      }
    }
  };

  useEffect(() => {
    if (!aboutPageVisible) {
      window.addEventListener('wheel', handleScroll, { passive: false });
      return () => window.removeEventListener('wheel', handleScroll);
    }
  }, [aboutPageVisible, animationStarted]);

  useEffect(() => {
    const sequence = async () => {
      if (animationStarted) {
        setTriggerAnimation(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for NeonBar animations

        // Show the sphere and trigger model update
        setShowSphere(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for the sphere to be fully visible

        setTriggerAnimation(false);
        await new Promise(resolve => setTimeout(resolve, 200)); // Wait for sphere to start disappearing
        setShowSphere(false); // Hide the sphere

        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for bars to complete their movement

        setAnimationStarted(false); // Reset animation started state
      }
    };

    sequence();
  }, [animationStarted]);

  // Use 150 units for spacing between NeonBars
  const barSpacing = 150;
  const totalWidth = projectNum * barSpacing; // Total width for all bars
  const startPosition = -totalWidth / 2 + barSpacing / 2; // Start position to center bars

  // Calculate position and width for RomanNumeralV
  const romanNumeralPosition: [number, number, number] = [0, 70, -700];
  const romanNumeralWidth = 1.3;

  return (
    <>
      {/* Render Backdrop and Project with lower zIndex */}
      <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            pointerEvents: aboutPageVisible ? 'none' : 'auto', // Disable interaction when AboutPage is visible
            transition: 'opacity 1s',
            opacity: aboutPageVisible ? 0 : 1, // Fade in effect for Backdrop and Project
          }}
      >
        <BackdropCanvas />
      </div>

      <div style={{
        position: 'fixed',
        top: '50%',
        left: '0',
        transform: 'translateY(-50%)',
        padding: '6rem',
        color: '#fff',
        zIndex: 3, // Ensure it is higher than other components
        pointerEvents: 'auto' // Ensure pointer events are enabled
      }}>
        <ProjectDetails projectNum={currentProject.projectNum} triggerAnimation={triggerAnimation}  />
      </div>

      <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            pointerEvents: aboutPageVisible ? 'none' : 'auto', // Disable interaction when AboutPage is visible
            transition: 'opacity 1s',
            opacity: aboutPageVisible ? 0 : 1, // Fade in effect for Backdrop and Project
          }}
        >
          <Canvas style={{ height: '100vh', width: '100vw', pointerEvents: 'none' }} camera={{ position: [0, 0, 10], fov: 75 }}>
          <Lighting />

          {projectNum === 5 ? (
            <RomanNumeralV
              triggerAnimation={triggerAnimation} 
              position={romanNumeralPosition} // Pass calculated position
              width={romanNumeralWidth} // Pass calculated width
            />
          ) : (
            Array.from({ length: projectNum }, (_, i) => {
              const position: [number, number, number] = [startPosition + i * barSpacing, 0, -700];
              const width = projectNum === 1 ? 1 : 0.5; // Set width based on projectNum
              return (
                <NeonBar 
                  key={i} 
                  triggerAnimation={triggerAnimation} 
                  position={position} // Calculate position
                  width={width} // Pass width prop
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
          
          {showSphere && <SmokeEffects textureUrl="/smoke.png" triggerAnimation={triggerAnimation} />}
          
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
