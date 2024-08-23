import React, { useRef, useState, useEffect } from 'react';
import { Sphere, Text } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

// A stable debounce function implementation
const debounce = <T extends (...args: any[]) => void>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    }) as T;
};

interface RotatingSphereProps {
    triggerAnimation: boolean;
    projectName: string;
}

const RotatingSphere: React.FC<RotatingSphereProps> = ({ triggerAnimation, projectName }) => {
    const [sphereSize, setSphereSize] = useState<number>(6);
    const [textSize, setTextSize] = useState<number>(1);

    // Resize handler
    const handleResize = () => {
        if (window.innerWidth <= 767) {
            setSphereSize(5);
            setTextSize(0.32);
        } else {
            setSphereSize(6);
            setTextSize(1);
        }
    };

    const debouncedHandleResize = debounce(handleResize, 150);

    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [debouncedHandleResize]);

    const [springProps, api] = useSpring(() => ({
        rotation: [Math.PI / 100, 0, 0],
        config: { mass: 1, tension: 80, friction: 10 },
        reset: true,
    }));

    useEffect(() => {
        if (triggerAnimation) {
            api.start({
                rotation: [Math.PI / 50, 0, 0],
                config: { mass: 1, tension: 80, friction: 10 },
                reset: true,
                onRest: () => api.start({ rotation: [Math.PI / 50, 0, 0] }),
            });
        }
    }, [triggerAnimation, api]);

    const textRef = useRef<THREE.Group>(null);

    useEffect(() => {
        const handle = () => {
            if (textRef.current) {
                textRef.current.lookAt(new THREE.Vector3(0, 0, 0));
            }
        };

        handle(); // Initial call
        window.addEventListener('resize', handle);

        return () => {
            window.removeEventListener('resize', handle);
        };
    }, []); // No dependencies needed for this effect

    return (
        <animated.group
            rotation={springProps.rotation as unknown as [number, number, number]}
            position={[0, 0, 0]}
        >
            <Sphere args={[sphereSize, 64, 64]}>
                <meshStandardMaterial color="black" />
            </Sphere>
            <group ref={textRef}>
                <Text
                    position={[0, 0, sphereSize + 1]}
                    fontSize={textSize}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    scale={[1, 1, 1]}
                >
                    {projectName}
                </Text>
            </group>
        </animated.group>
    );
};

export default RotatingSphere;
