import React, { useRef } from 'react';
import { Sphere, Text } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

interface RotatingSphereProps {
    triggerAnimation: boolean;
    projectName: string; // Add projectName as a prop
}

const RotatingSphere: React.FC<RotatingSphereProps> = ({ triggerAnimation, projectName }) => {
    const [springProps, api] = useSpring(() => ({
        rotation: [Math.PI / 100, 0, 0],
        config: { mass: 1, tension: 80, friction: 10 }, // Slower rotation
        reset: true,
    }));

    React.useEffect(() => {
        if (triggerAnimation) {
            api.start({
                rotation: [Math.PI / 50, 0, 0], // Small rotation around the X-axis
                config: { mass: 1, tension: 80, friction: 10 },
                reset: true,
                onRest: () => api.start({ rotation: [Math.PI / 50, 0, 0] }), // Pause after rotation
            });
        }
    }, [triggerAnimation, api]);

    const textRef = useRef<THREE.Group>(null);

    // Make text face the camera
    React.useEffect(() => {
        const handle = () => {
            if (textRef.current) {
                textRef.current.lookAt(new THREE.Vector3(0, 0, 0)); // Make text face the camera
            }
        };

        // Attach the event listener for camera updates
        window.addEventListener('resize', handle);
        handle(); // Initial call to adjust text orientation

        return () => window.removeEventListener('resize', handle);
    }, []);

    return (
        <animated.group
            rotation={springProps.rotation as unknown as [number, number, number]}
            position={[0, 0, 0]}
        >
            <Sphere args={[6, 64, 64]}>
                <meshStandardMaterial color="black"/>
            </Sphere>
            <group ref={textRef}>
                <Text
                    position={[0, 0, 7]} // Adjusted position slightly closer to the sphere
                    fontSize={1} // Adjust size relative to the sphere
                    color="white" // Text color
                    anchorX="center"
                    anchorY="middle"
                    scale={[1, 1, 1]} // Scale text to match the sphere
                >
                    {projectName} {/* Display the projectName prop */}
                </Text>
            </group>
        </animated.group>
    );
};

export default RotatingSphere;
