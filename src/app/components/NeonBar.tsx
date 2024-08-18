import React from 'react';
import { RoundedBox, Line } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface NeonBarProps {
    position: [number, number, number];
    rotation: [number, number, number];
    triggerAnimation: boolean;
}

const NeonBar: React.FC<NeonBarProps> = ({ position, rotation, triggerAnimation }) => {
    const [springProps, api] = useSpring(() => ({
        position: position,
        scale: [1, 1, 1],
        opacity: 1,
        config: { mass: 1, tension: 170, friction: 26 },
    }));

    const [linesVisible, setLinesVisible] = React.useState(true);

    React.useEffect(() => {
        if (triggerAnimation) {
            api.start({
                position: [0, 0, 0], // Move to the center
                scale: [0, 0, 0], // Scale down to zero
                opacity: 0, // Fade out
            });
            setLinesVisible(false); // Hide lines during animation
        } else {
            api.start({
                position: position, // Return to original position
                scale: [1, 1, 1], // Restore original scale
                opacity: 1, // Restore opacity
            });
            setLinesVisible(true); // Show lines when not animating
        }
    }, [triggerAnimation, api, position]);

    return (
        <>
            <animated.mesh
                position={springProps.position as unknown as [number, number, number]}
                scale={springProps.scale as unknown as [number, number, number]}
                rotation={rotation}
            >
                <RoundedBox args={[7, 0.2, 0.2]} radius={0.1} smoothness={2}>
                    <animated.meshStandardMaterial
                        emissive="#5888A5" // Cyan glow color based on RGB values
                        emissiveIntensity={3} // Adjust intensity for a stronger glow
                        color="white"
                        flatShading={false}
                        transparent
                        opacity={springProps.opacity}
                    />
                </RoundedBox>
            </animated.mesh>

            {/* Light rays */}
            {linesVisible && (
                <>
                    <Line
                        points={[position, [position[0] + 1, position[1] + 1, position[2]]]} // Example ray direction
                        color="#5888A5" // Cyan color for the rays
                        lineWidth={1} // Adjust the thickness of the rays
                    />
                    <Line
                        points={[position, [position[0] - 1, position[1] + 1, position[2]]]} // Example ray direction
                        color="#5888A5"
                        lineWidth={0.5}
                    />
                    <Line
                        points={[position, [position[0] + 1, position[1] - 1, position[2]]]} // Example ray direction
                        color="#5888A5"
                        lineWidth={0.1}
                    />
                    <Line
                        points={[position, [position[0] - 1, position[1] - 1, position[2]]]} // Example ray direction
                        color="#5888A5"
                        lineWidth={0.1}
                    />
                </>
            )}
        </>
    );
};

export default NeonBar;
