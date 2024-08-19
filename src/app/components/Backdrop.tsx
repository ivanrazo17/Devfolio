'use client';

import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // Import OrbitControls
import { Suspense, useCallback, useMemo, useRef } from 'react';

const Points: React.FC = () => {
  const imgTex = useLoader(THREE.TextureLoader, './circle.png');
  const bufferRef = useRef<THREE.BufferAttribute>(null);

  // Constants for the sine wave
  const f = 0.002; // Frequency of the wave
  const a = 3; // Amplitude of the wave

  // Graph function for sinusoidal wave motion
  const graph = useCallback((x: number, z: number, t: number) => {
    return Math.sin(f * (x ** 2 + z ** 2) + t) * a;
  }, [f, a]);

  const count = 100;
  const sep = 3;
  const downwardOffset = -15; // Adjust this value to move points downward

  // Generate initial positions for the points
  const positions = useMemo(() => {
    const positions: number[] = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = graph(x, z, 0) + downwardOffset; // Apply downward offset
        positions.push(x, y, z);
      }
    }
    return new Float32Array(positions);
  }, [count, sep, graph, downwardOffset]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Get the elapsed time to create dynamic movement

    const buffer = bufferRef.current;
    if (buffer) {
      const positionsArray = buffer.array as Float32Array;

      let i = 0;
      for (let xi = 0; xi < count; xi++) {
        for (let zi = 0; zi < count; zi++) {
          const x = sep * (xi - count / 2);
          const z = sep * (zi - count / 2);

          positionsArray[i + 1] = graph(x, z, t) + downwardOffset; // Update y position based on the sinusoidal function and apply downward offset
          i += 3;
        }
      }

      buffer.needsUpdate = true; // Notify Three.js that the buffer needs to be updated
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[20, 20, 20]} intensity={1} color="white" />
      <pointLight position={[-20, -20, -20]} intensity={0.5} color="red" />

      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={bufferRef}
            attach="attributes-position"
            args={[positions, 3]} // Position array and itemSize
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          map={imgTex}
          color={0xFFFFFF}
          size={0.5}
          sizeAttenuation
          opacity={0.5} // Set opacity level (0 to 1)
          transparent={true} // Ensure transparency is enabled
        />
      </points>

      {/* Shadow Mask */}
      <mesh position={[0, 0, -1]}>
        <circleGeometry args={[50, 64]} />
        <shadowMaterial opacity={0.8} /> {/* Darken outside the center */}
      </mesh>
    </>
  );
};

// Define the BackdropCanvas component with OrbitControls
const BackdropCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [100, 10, 0], fov: 75 }} // Adjust camera position
      style={{ height: '100vh', width: '100vw', background: '#000000' }} // Set canvas size and background color
    >
      <Suspense fallback={null}>
        <Points />
      </Suspense>
      <OrbitControls autoRotate autoRotateSpeed={-0.2} /> {/* Add OrbitControls */}
    </Canvas>
  );
};

export default BackdropCanvas;
