import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface ShadingNeonBarProps {
    position: [number, number, number];
    rotation: [number, number, number];
    triggerAnimation: boolean;
}

const ShadingNeonBar: React.FC<ShadingNeonBarProps> = ({ position, rotation, triggerAnimation }) => {
    const [springProps, api] = useSpring(() => ({
        position: position,
        scale: [1, 1, 1],
        opacity: 1, // Start fully opaque
        config: { mass: 1, tension: 170, friction: 26 },
    }));

    React.useEffect(() => {
        if (triggerAnimation) {
            api.start({
                position: [0, 0, 0], // Move to the center
                scale: [0, 0, 0], // Scale down to zero
                opacity: 0, // Make it fully transparent
            });
        } else {
            api.start({
                position: position, // Return to original position
                scale: [1, 1, 1], // Restore original scale
                opacity: 1, // Restore opacity
            });
        }
    }, [triggerAnimation, api, position]);

    return (
        <animated.mesh
            position={springProps.position as unknown as [number, number, number]}
            scale={springProps.scale as unknown as [number, number, number]}
            rotation={rotation}
        >
            <RoundedBox args={[10, 0.1, 0.1]} radius={0.05} smoothness={2}>
                <animated.meshStandardMaterial
                    emissive="gray"
                    color="white"
                    flatShading={false}
                    transparent // Enable transparency
                    opacity={springProps.opacity} // Bind opacity to springProps
                />
            </RoundedBox>
        </animated.mesh>
    );
};

export default ShadingNeonBar;
