import React, { useState } from 'react';
import { Box } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface NeonBarProps {
    triggerAnimation: boolean;
    position: [number, number, number]; // Position prop
    width: number; // Add width prop
}

const NeonBar: React.FC<NeonBarProps> = ({ triggerAnimation, position, width }) => {
    const [originPosition] = useState<[number, number, number]>([0, 0, 0]); // Declare originPosition state

    const [springProps, api] = useSpring(() => ({
        scale: [1, 1, 1],
        opacity: 1,
        position,
        config: { tension: 800, friction: 50 },
    }));

    React.useEffect(() => {
        if (triggerAnimation) {
            api.start({
                scale: [0, 0, 0], // Scale down to zero
                opacity: 0, // Fade out
                position: originPosition, // Move to origin position during fade-out
            });
        } else {
            api.start({
                scale: [200, 20, 1], // Vertical thick rectangle
                opacity: 1, // Restore opacity
                position, // Move back to the initial position
            });
        }
    }, [triggerAnimation, api, position, originPosition]);

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
            position={springProps.position as unknown as [number, number, number]} 
            scale={springProps.scale as unknown as [number, number, number]}
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
