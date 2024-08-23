import React from 'react';
import { useGLTF } from '@react-three/drei';

const Monitor: React.FC<{ scale: number; dragOffsetY: number }> = ({ scale, dragOffsetY }) => {
  const { scene } = useGLTF('/3DModels/Monitor.glb');

  const positionY = -4.58 * (scale / 70) - dragOffsetY * 0.004; // Adjust position based on dragOffsetY
  const adjustedScale = scale / 5;

  return (
    <primitive
      object={scene}
      scale={[adjustedScale, adjustedScale, adjustedScale]}
      position={[0, positionY, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
};

export default Monitor;
