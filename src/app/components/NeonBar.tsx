import React from 'react';
import { Box } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface NeonBarProps {
    triggerAnimation: boolean;
}

const NeonBar: React.FC<NeonBarProps> = ({ triggerAnimation }) => {
    const [springProps, api] = useSpring(() => ({
        scale: [1, 1, 1],
        opacity: 1,
        config: { mass: 1, tension: 170, friction: 26 },
    }));

    React.useEffect(() => {
        if (triggerAnimation) {
            api.start({
                scale: [0, 0, 0], // Scale down to zero
                opacity: 0, // Fade out
            });
        } else {
            api.start({
                scale: [200, 20, 1], // Vertical thick rectangle
                opacity: 1, // Restore opacity
            });
        }
    }, [triggerAnimation, api]);

    return (
        <animated.mesh
            position={[0, 0, -700]} // Centered at origin
            scale={springProps.scale as unknown as [number, number, number]}
            renderOrder={0} // Ensure this is rendered behind other objects if needed
        >
            <Box args={[1, 25, 1]}>
                <animated.meshStandardMaterial
                    emissive="#5888A5" // Cyan glow color
                    emissiveIntensity={3} // Adjust intensity for a stronger glow
                    color="white"
                    flatShading={false}
                    transparent
                    opacity={springProps.opacity}
                />
            </Box>
        </animated.mesh>
    );
};

export default NeonBar;
