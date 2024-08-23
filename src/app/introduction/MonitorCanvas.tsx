import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Monitor from '../components/Monitor';

const MonitorCanvas: React.FC<{ scale: number; dragOffsetY: number }> = ({ scale, dragOffsetY }) => {
  const MIN_SCALE = 60;

  return (
    <Canvas
      className="absolute inset-0"
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight intensity={3} />
      <directionalLight position={[0, 0, 5]} intensity={1} castShadow />
      <pointLight position={[0, 0, -1]} intensity={20} color="#457A8F" />
      <Monitor scale={scale} dragOffsetY={dragOffsetY} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        maxAzimuthAngle={scale === MIN_SCALE ? Math.PI : Infinity}
        minAzimuthAngle={scale === MIN_SCALE ? -Math.PI : -Infinity}
      />
    </Canvas>
  );
};

export default MonitorCanvas;
