import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; 
import { Suspense, useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

// Optimized Points Component
const Points: React.FC = () => {
  const imgTex = useLoader(THREE.TextureLoader, './circle.png');
  const bufferRef = useRef<THREE.BufferAttribute>(null);

  // Constants for the sine wave
  const f = 0.002; // Frequency of the wave
  const a = 3; // Amplitude of the wave

  // Memoized graph function for sinusoidal wave motion
  const graph = useCallback((x: number, z: number, t: number) => {
    return Math.sin(f * (x ** 2 + z ** 2) + t) * a;
  }, [f, a]);

  const count = 100;
  const sep = 3;
  const downwardOffset = -15; // Adjust this value to move points downward

  // Memoized initial positions for the points
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
        opacity={1}
        transparent={true}
      />
    </points>
  );
};

// Optimized BackdropCanvas Component
const BackdropCanvas: React.FC = () => {
  const [triggered, setTriggered] = useState(false);

  const props = useSpring({
    backgroundColor: triggered ? 'black' : 'white',
    config: { duration: 2000 }, // Duration of the animation in milliseconds
    reset: false
  });

  useEffect(() => {
    // Trigger the background color change only once when the component mounts
    setTriggered(true);
  }, []);

  return (
    <animated.div
      style={{
        height: '100vh',
        width: '100vw',
        ...props
      }}
    >
      <Canvas
        camera={{ position: [100, 10, 0], fov: 75 }}
        style={{ height: '100%', width: '100%' }}
      >
        <Suspense fallback={null}>
          <Points />
        </Suspense>
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={-0.2}
          enablePan={false} 
          enableZoom={false} 
          enableRotate={false} 
        />
      </Canvas>
    </animated.div>
  );
};

export default BackdropCanvas;
