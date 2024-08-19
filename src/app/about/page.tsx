'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Raleway } from 'next/font/google';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/web';

const raleway = Raleway({
  weight: ['200'],
  subsets: ['latin'],
});

const Monitor: React.FC<{ scale: number; dragOffsetY: number }> = ({ scale, dragOffsetY }) => {
  const { scene } = useGLTF('/monitor.gltf');

  const positionY = -4.15 * (scale / 70) - dragOffsetY * 0.004; // Adjust position based on dragOffsetY
  const adjustedScale = scale / 5;

  return (
    <primitive
      object={scene}
      scale={[adjustedScale, adjustedScale, adjustedScale]} 
      position={[0, positionY, 0]} 
      rotation={[0, -Math.PI / 2, 0]} 
    />
  );
};

const AboutPage: React.FC = () => {
  const [scale, setScale] = useState(70); 
  const [isHidden, setIsHidden] = useState(false); 
  const [dragging, setDragging] = useState(false); 
  const [startDragY, setStartDragY] = useState<number | null>(null);
  const [dragOffsetY, setDragOffsetY] = useState(0); // Track the drag offset
  const [springProps, setSpring] = useSpring(() => ({
    transform: 'scale(1) translateY(0)',
    opacity: 1,
    config: { tension: 280, friction: 60 },
  }));

  const MIN_SCALE = 30;
  const MAX_SCALE = 70;

  const handleScroll = (event: WheelEvent) => {
    if (dragging) return;

    event.preventDefault();

    const increment = 10;

    if (event.deltaY > 0) {
      setScale((prev) => Math.max(prev - increment, MIN_SCALE));
    } else {
      setScale((prev) => Math.min(prev + increment, MAX_SCALE));
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (isHidden || scale !== MIN_SCALE) return;

    setDragging(true);
    setStartDragY(event.clientY);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!dragging) return;

    if (startDragY !== null) {
      const newDragY = event.clientY - startDragY;
      setDragOffsetY(newDragY); // Update the drag offset

      if (newDragY > 100) { // Adjust threshold as needed
        setSpring.start({
          transform: `scale(${scale / 80}) translateY(${newDragY}px)`,
          opacity: 1,
          onRest: () => {
            if (newDragY > 200) { // Hide when dragging far enough
              setIsHidden(true);
            }
          },
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (isHidden || scale !== MIN_SCALE) return;

    setDragging(true);
    setStartDragY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!dragging) return;

    if (startDragY !== null) {
      const newDragY = event.touches[0].clientY - startDragY;
      setDragOffsetY(newDragY);

      if (newDragY > 100) {
        setSpring.start({
          transform: `scale(${scale / 80}) translateY(${newDragY}px)`,
          opacity: 1,
          onRest: () => {
            if (newDragY > 200) {
              setIsHidden(true);
            }
          },
        });
      }
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging, startDragY, scale, isHidden]);

  const imageScale = Math.max(scale / 60, 0.9);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {!isHidden && (
        <Canvas
          className="absolute inset-0"
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          camera={{ position: [0, 0, 5], fov: 75 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight 
            position={[0, 0, -1]} 
            intensity={50}
            color='#457A8F' 
          />
          <Monitor scale={scale} dragOffsetY={dragOffsetY} />
        </Canvas>
      )}

      {!isHidden && (
        <animated.div
          style={{ 
            ...springProps, 
            zIndex: 10, 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            pointerEvents: dragging ? 'none' : 'auto', 
            transform: springProps.transform.to((t) => `scale(${scale / 80}) translateY(${dragOffsetY}px)`)
          }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div 
            className="relative w-full h-full overflow-hidden perspective-1000"
            style={{ 
              transform: `scale(${imageScale})`, 
              border: 'none',
              userSelect: 'none', 
              pointerEvents: 'none', 
            }}
          >
            <Image
              src="/HeroBanner.svg"
              alt="Hero Banner"
              layout="fill"
              objectFit="cover"
              priority={true}
              className="absolute inset-0 w-full h-full border-none"
              style={{ 
                userSelect: 'none', 
                pointerEvents: 'none' 
              }}
            />
            <div className="relative flex flex-col items-center justify-center w-full h-full pb-12">
                <h1 className="text-white text-6xl font-extrabold mb-2">Hi, I'm <span className="text-[#915eff]">Ivan</span></h1>
                <h2 className={`${raleway.className} text-white text-5xl pb-10`}>A <span className="text-[#915eff]">Web</span> Developer</h2>
            </div>
            <div className="absolute bottom-10 w-full flex flex-col items-center">
                <div className="w-16 h-1 bg-white rounded-full animate-pulse mb-4"></div>
                <h1 className="text-white text-2xl font-semibold">Scroll Down</h1>
            </div>
          </div>
        </animated.div>
      )}

      {scale === MIN_SCALE && !isHidden && (
        <h1 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-semibold animate-pulse"
            style={{ userSelect: 'none' }} 
        >
          Drag Down
        </h1>
      )}
    </div>
  );
};

export default AboutPage;
