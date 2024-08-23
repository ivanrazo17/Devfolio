'use client';

import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import MonitorCanvas from './MonitorCanvas';
import { useMonitorControls } from './useMonitorControls';
import { useRouter } from 'next/navigation';


const IntroPage: React.FC = () => {
  const [scale, setScale] = useState<number>(100);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768); // Example breakpoint

  const router = useRouter(); // Initialize useRouter

  const MIN_SCALE = 60;
  const MAX_SCALE = 100;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Example breakpoint
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setScale(MIN_SCALE);
    } else {
      setScale(MAX_SCALE);
    }
  }, [isMobile]);

  const { springProps, setDragging, setStartDragY, dragOffsetY, dragging } = useMonitorControls(
    scale,
    MIN_SCALE,
    MAX_SCALE,
    () => {
      // When dragging is finished, call the onFinishLoading callback
      setIsHidden(true);
    },
    setScale,
    setIsHidden
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isHidden || scale !== MIN_SCALE) return;

    setDragging(true);
    setStartDragY(event.clientY);
  };

  const handleButtonClick = () => {
    router.push('/projects');
  };

  useEffect(() => {
    if (isHidden) {
      router.push('/projects'); // Navigate to /projects after hiding the monitor
    }
  }, [isHidden, router]);

  return (
    <div className="relative w-full h-screen overflow-hidden" onMouseDown={handleMouseDown}>
      {!isHidden && (
        <>
          <MonitorCanvas scale={scale} dragOffsetY={dragOffsetY} />
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
              transform: springProps.transform.to((t) => `scale(${scale / 80}) translateY(${dragOffsetY}px)`),
              display: scale === MIN_SCALE ? 'none' : 'block',
            }}
            className="flex flex-col items-center justify-center text-center"
          >
            {!isMobile && (
              <div className="absolute bottom-[80px] lg:bottom-[100px] w-full flex flex-col animate-pulse items-center">
                <div className="w-20 h-1 bg-white rounded-full mb-4"></div>
                <h1 className="text-white text-2xl font-semibold">Scroll Down</h1>
              </div>
            )}
          </animated.div>
          {!isMobile && scale === MIN_SCALE && !isHidden && (
            <div className="absolute bottom-[80px] lg:bottom-[100px] left-1/2 transform -translate-x-1/2 animate-pulse flex flex-col items-center">
              <div className="w-20 h-1 bg-[#915EFF] rounded-full mb-4"></div>
              <h1
                className="text-[#915EFF] font-bold text-3xl"
                style={{ zIndex: 10, userSelect: 'none' }}
              >
                Drag Down
              </h1>
            </div>
          )}
        </>
      )}
      {isMobile && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 bg-[#151030] text-white rounded shadow-lg"
            style={{
              boxShadow: '0 0 10px 10px rgba(145, 94, 255, 0.5)',
              whiteSpace: 'nowrap'
            }}
          >
            Go to Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default IntroPage;
