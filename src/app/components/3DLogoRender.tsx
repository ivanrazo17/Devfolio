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
