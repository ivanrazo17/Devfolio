import React from 'react';
import { RoundedBox, Line } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface NeonBarProps {
    position: [number, number, number];
    rotation: [number, number, number];
}

const WhiteBar: React.FC<NeonBarProps> = ({ position, rotation }) => {
    const [springProps] = useSpring(() => ({
        position: position,
        scale: [1, 1, 1],
        opacity: 1,
        config: { mass: 1, tension: 170, friction: 26 },
    }));

    return (
        <>
            <animated.mesh
                position={springProps.position as unknown as [number, number, number]}
                scale={springProps.scale as unknown as [number, number, number]}
                rotation={rotation}
                renderOrder={0} // Ensure this is rendered behind CylinderStage
            >
                <RoundedBox args={[7.5, 0.2, 0.2]} radius={0.1} smoothness={2}>
                    <animated.meshStandardMaterial
                        emissive="white"
                        emissiveIntensity={2} // Adjust intensity for a stronger glow
                        color="white"
                        flatShading={false}
                        transparent
                        opacity={springProps.opacity}
                    />
                </RoundedBox>
            </animated.mesh>
        </>
    );
};

export default WhiteBar;
