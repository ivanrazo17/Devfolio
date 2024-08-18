import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NeonBar from './NeonBar';
import ShadingNeonBar from './ShadingNeonBar';
import RotatingSphere from './RotatingSphere';
import Stage from './Stage';
import { Object3D } from 'three';

// Component to manage lighting
const Lighting: React.FC = () => {
    const { scene } = useThree();
    const leftTargetRef = useRef<Object3D>(null);
    const rightTargetRef = useRef<Object3D>(null);

    useEffect(() => {
        if (leftTargetRef.current) {
            scene.add(leftTargetRef.current);
        }
        if (rightTargetRef.current) {
            scene.add(rightTargetRef.current);
        }
        return () => {
            if (leftTargetRef.current) {
                scene.remove(leftTargetRef.current);
            }
            if (rightTargetRef.current) {
                scene.remove(rightTargetRef.current);
            }
        };
    }, [scene]);

    return (
        <>
            <spotLight 
                position={[-15, 5, 10]} 
                angle={Math.PI / 4} 
                penumbra={1} 
                intensity={1} 
                target={leftTargetRef.current || undefined}
            />
            <spotLight 
                position={[15, 5, 10]} 
                angle={Math.PI / 4} 
                penumbra={1} 
                intensity={1} 
                target={rightTargetRef.current || undefined}
            />
            <pointLight 
                position={[0, 0, -1]} 
                intensity={50}
                color='#457A8F' 
            />
            
            <rectAreaLight
                position={[2, 0, 0]}    // Position of the RectAreaLight
                width={4}                // Width of the light area
                height={4}               // Height of the light area
                intensity={0.5}           // Intensity of the light
                color='#457A8F'            // Color of the light
            />
            <rectAreaLight
                position={[-2, 0, 0]}    // Position of the RectAreaLight
                width={4}                // Width of the light area
                height={4}               // Height of the light area
                intensity={0.5}           // Intensity of the light
                color='#457A8F'           // Color of the light
            />
            
        </>
    );
};

const NeonLights: React.FC = () => {
    const [triggerAnimation, setTriggerAnimation] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [showSphere, setShowSphere] = useState(false);

    const handleButtonClick = () => {
        if (!animationStarted) {
            setAnimationStarted(true);
        }
    };

    useEffect(() => {
        const sequence = async () => {
            if (animationStarted) {
                setTriggerAnimation(true);
                await new Promise(resolve => setTimeout(resolve, 500)); // Wait for NeonBar animations
                setShowSphere(true); // Show the sphere after NeonBar animations
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for the sphere to be fully visible
                setTriggerAnimation(false); // Start shrinking the sphere
                await new Promise(resolve => setTimeout(resolve, 200)); // Wait for the sphere to disappear
                setShowSphere(false); // Hide the sphere after its animation
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for bars to complete their movement
              
                setAnimationStarted(false); // Reset animation started state
            }
        };

        sequence();
    }, [animationStarted]);

    return (
        <>
            <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 0, 10], fov: 75 }}>
                <Stage triggerAnimation={triggerAnimation} />
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
                <Lighting />
                
                
                {/* Left Side ShadingNeonBars */}
                <ShadingNeonBar position={[-7, 2.5, 2]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[-7, 1, 0.3]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[-7, 0.3, 0]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[-7, -1.4, 0.3]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[-7, -2.4, 2]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />

                {/* Left Side NeonBars */}
                <group>
                    <NeonBar position={[-5, 1.5, 4]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[-5, 0.8, 3]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[-5, 0, 2.5]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[-5, -0.8, 3]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[-5, -1.5, 4]} rotation={[0, Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                </group>

                {/* Right Side ShadingNeonBars */}
                <ShadingNeonBar position={[7, 2.5, 2]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[7, 1, 0.3]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[7, 0.3, 0]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[7, -1.4, 0.3]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                <ShadingNeonBar position={[7, -2.4, 2]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />

                {/* Right Side NeonBars */}
                <group>
                    <NeonBar position={[5, 1.5, 4]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[5, 0.8, 3]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[5, 0, 2.5]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[5, -0.8, 3]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                    <NeonBar position={[5, -1.5, 4]} rotation={[0, -Math.PI / 2, 0]} triggerAnimation={triggerAnimation} />
                </group>

                {showSphere && <RotatingSphere triggerAnimation={triggerAnimation} />}

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.1}
                        intensity={1.5}
                    />
                </EffectComposer>
            </Canvas>

            <button
                onClick={handleButtonClick}
                style={{ position: 'fixed', top: '20px', left: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', zIndex: 1 }}
            >
                Animate Neon Bars
            </button>
        </>
    );
};

export default NeonLights;
