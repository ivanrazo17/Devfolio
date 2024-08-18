import React, { useRef, useState, useEffect } from 'react';
import { Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import BaganiBladesLogo from './BaganiBladesLogo'; // Import ThreeScene
import * as THREE from 'three';

interface StageProps {
  triggerAnimation: boolean;
}

const CylinderStage: React.FC<StageProps> = ({ triggerAnimation }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [mouseX, setMouseX] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth * 2 - 1; // Normalize to -1 to 1
      setMouseX(x);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const { position, scale, opacity } = useSpring({
    position: triggerAnimation ? [0, 0, -25] : [0, -2.5, 0],
    scale: triggerAnimation ? [0, 0, 0] : [1, 1, 1],
    opacity: triggerAnimation ? 0 : 1,
    config: { tension: 250, friction: 40 },
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(Date.now() / 1000) * 0.5 - 2.9;
    }
  });

  const maxRotation = Math.PI / 6; // 30 degrees in radians
  const speedFactor = 0.1;

  const rotationY = Math.max(-maxRotation, Math.min(maxRotation, -mouseX * speedFactor * Math.PI));

  return (
    <animated.group ref={groupRef} position={position as any} scale={scale as any}>
      <BaganiBladesLogo url="/VAHCINET3D.gltf" position={[0, 2.5, 0]} /> {/* Adjust position here */}
      <animated.mesh rotation={[0, rotationY, 0]}>
        <Cylinder args={[4, 4, 0.5, 32]}>
          <animated.meshStandardMaterial
            attach="material"
            color='black'
            emissive='black' // Darker cyan color for emissive effect
            emissiveIntensity={0.3} // Adjust intensity for a stronger or weaker glow
            opacity={opacity}
            roughness={0.5} // Add roughness to simulate lighting interaction
            metalness={0.2} // Add metalness for a reflective effect
          />
        </Cylinder>
      </animated.mesh>
    </animated.group>
  );
};

export default CylinderStage;
