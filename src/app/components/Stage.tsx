import React, { useRef } from 'react';
import { Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import Model from './3DLogoRender'; // Import Model component
import * as THREE from 'three';

interface StageProps {
  triggerAnimation: boolean;
  modelSrc: string;
  position: [number, number, number];
  scale: [number, number, number];
}

const Stage: React.FC<StageProps> = ({ triggerAnimation, modelSrc, position, scale }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [mouseX, setMouseX] = React.useState<number>(0);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth * 2 - 1;
      setMouseX(x);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setTouchStartX(event.touches[0].clientX);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartX !== null) {
        const touchEndX = event.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        const x = deltaX / window.innerWidth * 2;
        setMouseX(mouseX - x);
        setTouchStartX(touchEndX);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mouseX, touchStartX]);

  const { position: springPos, scale: springScale, opacity } = useSpring({
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

  const maxRotation = Math.PI / 6;
  const speedFactor = 0.1;

  const rotationY = Math.max(-maxRotation, Math.min(maxRotation, -mouseX * speedFactor * Math.PI));

  return (
    <animated.group ref={groupRef} position={springPos as any} scale={springScale as any} renderOrder={1}>
      <Model url={modelSrc} position={position} scale={scale} />
      <animated.mesh rotation={[0, rotationY, 0]} renderOrder={1}>
        <Cylinder args={[4, 4, 0.5, 5]}>
          <animated.meshStandardMaterial
            attach="material"
            color='white'
            emissive='black'
            emissiveIntensity={0.5}
          />
        </Cylinder>
      </animated.mesh>
    </animated.group>
  );
};

export default Stage;
