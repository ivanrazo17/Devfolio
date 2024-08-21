import React from 'react';
import { Box } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface NeonBarProps {
    triggerAnimation: boolean;
    position: [number, number, number]; // Position prop
    width: number; // Add width prop
}

const NeonBar: React.FC<NeonBarProps> = ({ triggerAnimation, position, width }) => {
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

    // Same properties as the main Box
    const boxArgs: [number, number, number] = [width, 25, 1];
    const materialProps = {
        emissive: "#5888A5",
        emissiveIntensity: 3,
        color: "white",
        flatShading: false,
        transparent: true,
        opacity: springProps.opacity,
    };

    return (
        <animated.group
            position={position} // Use the position prop
            scale={springProps.scale as unknown as [number, number, number]}
            renderOrder={0} // Ensure this is rendered behind other objects if needed
        >
            {/* NeonBar Box */}
            <animated.mesh>
                <Box args={boxArgs}>
                    <animated.meshStandardMaterial {...materialProps} />
                </Box>
            </animated.mesh>
        </animated.group>
        
    );
};

export default NeonBar;
