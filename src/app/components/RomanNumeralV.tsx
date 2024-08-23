import React from 'react';
import { Box } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

interface NeonBarProps {
    triggerAnimation: boolean;
    position: [number, number, number];
    width: number;
}

const NeonBar: React.FC<NeonBarProps> = ({ triggerAnimation, position, width }) => {
    const [springProps, api] = useSpring(() => ({
        scale: [1, 1, 1],
        opacity: 1,
        config: { tension: 800, friction: 50 },
    }));

    React.useEffect(() => {
        if (triggerAnimation) {
            api.start({
                scale: [0, 0, 0],
                opacity: 0,
            });
        } else {
            api.start({
                scale: [200, 20, 1], 
                opacity: 1, 
            });
        }
    }, [triggerAnimation, api]);


    const boxArgs: [number, number, number] = [width / 2, 20, 1];
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
            position={position}
            scale={springProps.scale as unknown as [number, number, number]}
        >
            {/* Left leg of V */}
            <animated.mesh position={[-width / 3, 0, 0]} rotation={[0, 0, Math.PI / 100]}>
                <Box args={boxArgs}>
                    <animated.meshStandardMaterial {...materialProps} />
                </Box>
            </animated.mesh>
            {/* Right leg of V */}
            <animated.mesh position={[width / 3, 0, 0]} rotation={[0, 0, -Math.PI / 100]}>
                <Box args={boxArgs}>
                    <animated.meshStandardMaterial {...materialProps} />
                </Box>
            </animated.mesh>
        </animated.group>
        
    );
};

export default NeonBar;
