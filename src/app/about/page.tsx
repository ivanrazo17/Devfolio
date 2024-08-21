'use client';

import React, { useState } from 'react';
import { animated } from '@react-spring/web';
import MonitorCanvas from './MonitorCanvas';
import { useMonitorControls } from './useMonitorControls';

const AboutPage: React.FC<{ onFinishLoading: () => void }> = ({ onFinishLoading }) => {
  const [scale, setScale] = useState(100);
  const [isHidden, setIsHidden] = useState(false);

  const MIN_SCALE = 60;
  const MAX_SCALE = 100;

  const { springProps, setDragging, setStartDragY, dragOffsetY, dragging } = useMonitorControls(
    scale,
    MIN_SCALE,
    MAX_SCALE,
    onFinishLoading,
    setScale,
    setIsHidden
  );

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isHidden || scale !== MIN_SCALE) return;

    setDragging(true);
    setStartDragY(event.clientY);
  };

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
              display: scale === MIN_SCALE ? 'none' : 'block', // Hide when scale is MIN_SCALE
            }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="absolute bottom-[80px] lg:bottom-[100px] w-full flex flex-col animate-pulse items-center">
              <div className="w-20 h-1 bg-white rounded-full mb-4"></div>
              <h1 className="text-white text-2xl font-semibold">Scroll Down</h1>
            </div>
          </animated.div>
          {scale === MIN_SCALE && !isHidden && (
            <div className="absolute bottom-[80px] lg:bottom-[100px] left-1/2 transform -translate-x-1/2 animate-pulse flex flex-col items-center">
              <div className="w-20 h-1 bg-[#915EFF] rounded-full mb-4"></div>
              <h1
                className="text-[#915EFF] font-bold text-3xl"
                style={{ zIndex: 10, userSelect: 'none'}}
              >
                Drag Down
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AboutPage;
