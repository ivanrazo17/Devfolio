import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';

interface ModelProps {
  url: string;
  position?: [number, number, number];
  scale?: [number, number, number]; 
}

const LogoRender: React.FC<ModelProps> = ({ url, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<Mesh>(null);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const maxRotation = Math.PI / 6; // 30 degrees
      const yRotation = -((event.clientX / window.innerWidth) - 0.5) * 2 * maxRotation; // Inverted rotation
      setRotation({ x: rotation.x, y: Math.max(-maxRotation, Math.min(yRotation, maxRotation)) });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotation.x]);

  useEffect(() => {
    if (modelRef.current && scene) {
      modelRef.current.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = new MeshStandardMaterial({
            color: 'white',
          });
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setTouchStartX(event.touches[0].clientX);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartX !== null) {
        const touchEndX = event.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        const maxRotation = Math.PI / 6; // 30 degrees
        const newYRotation = rotation.y + deltaX * 0.01; // Adjust sensitivity as needed
        setRotation({ x: rotation.x, y: Math.max(-maxRotation, Math.min(newYRotation, maxRotation)) });
        setTouchStartX(touchEndX);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [rotation.y, touchStartX]);

  return (
    <group position={position} scale={scale}>
      <primitive
        object={scene}
        ref={modelRef}
        rotation={[rotation.x, rotation.y, 0]}
      />
    </group>
  );
};

export default LogoRender;
