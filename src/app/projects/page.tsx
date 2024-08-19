import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NeonBar from '../components/NeonBar';
import RotatingSphere from '../components/RotatingSphere';
import Stage from '../components/Stage';
import ProjectList from './ProjectList'; // Adjust import path as necessary

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

const Project: React.FC = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showSphere, setShowSphere] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const currentProject = ProjectList[currentProjectIndex];

  const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0 && !animationStarted) {
      setAnimationStarted(true);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [animationStarted]);

  useEffect(() => {
    const sequence = async () => {
      if (animationStarted) {
        setTriggerAnimation(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for NeonBar animations

        // Show the sphere and trigger model update
        setShowSphere(true);
        setCurrentProjectIndex(prev => (prev + 1) % ProjectList.length); // Update the model before shrinking
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

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 0, 10], fov: 75 }}>
      <Lighting />
      <NeonBar triggerAnimation={triggerAnimation} />
      {showSphere && <RotatingSphere triggerAnimation={triggerAnimation} projectName={currentProject.projectName} />}
      <Stage 
        triggerAnimation={triggerAnimation} 
        modelSrc={currentProject.modelSrc}
        position={currentProject.position}
        scale={currentProject.scale}
      />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.1}
          intensity={1.5}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Project;
