import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sphere, Text } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';


const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

interface RotatingSphereProps {
    triggerAnimation: boolean;
    projectName: string;
}

const RotatingSphere: React.FC<RotatingSphereProps> = ({ triggerAnimation, projectName }) => {
    const [sphereSize, setSphereSize] = useState<number>(6);
    const [textSize, setTextSize] = useState<number>(1);


    const handleResize = useCallback(
        debounce(() => {
            if (window.innerWidth <= 767) {
                setSphereSize(5);
                setTextSize(0.32);
            } else {
                setSphereSize(6);
                setTextSize(1);
            }
        }, 150), 
        []
    );

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

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

        window.addEventListener('resize', handle);
        handle();

        return () => window.removeEventListener('resize', handle);
    }, []);

    return (
        <animated.group
            rotation={springProps.rotation as unknown as [number, number, number]}
            position={[0, 0, 0]}
        >
            <Sphere args={[sphereSize, 64, 64]}>
                <meshStandardMaterial color="black"/>
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
