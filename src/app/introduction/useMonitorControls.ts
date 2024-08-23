import { useState, useEffect, useCallback } from 'react';
import { useSpring } from '@react-spring/web';

export const useMonitorControls = (
  scale: number,
  MIN_SCALE: number,
  MAX_SCALE: number,
  onFinishLoading: () => void,
  setScale: React.Dispatch<React.SetStateAction<number>>,
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [dragging, setDragging] = useState(false);
  const [startDragY, setStartDragY] = useState<number | null>(null);
  const [dragOffsetY, setDragOffsetY] = useState(0);

  const [springProps, api] = useSpring(() => ({
    transform: 'scale(1) translateY(0)',
    opacity: 1,
    config: { tension: 280, friction: 60 },
  }));

  const handleScroll = useCallback((event: WheelEvent) => {
    if (dragging) return;

    event.preventDefault();
    const increment = 10;

    if (event.deltaY > 0) {
      setScale((prev) => Math.max(prev - increment, MIN_SCALE));
    } else {
      setScale((prev) => Math.min(prev + increment, MAX_SCALE));
    }
  }, [dragging, setScale, MIN_SCALE, MAX_SCALE]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!dragging || startDragY === null) return;

    const newDragY = event.clientY - startDragY;
    setDragOffsetY(newDragY);

    if (newDragY > 100) {
      api.start({
        transform: `scale(${scale / 80}) translateY(${newDragY}px)`,
        opacity: 1,
        onRest: () => {
          if (newDragY > 200) {
            setIsHidden(true);
            onFinishLoading();
          }
        },
      });
    }
  }, [dragging, startDragY, scale, api, setIsHidden, onFinishLoading]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);

    if (dragOffsetY < 200) {
      api.start({
        transform: 'scale(1) translateY(0)',
        opacity: 1,
      });
      setDragOffsetY(0);
    }
  }, [dragOffsetY, api]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleScroll, handleMouseMove, handleMouseUp]);

  return { springProps, setDragging, setStartDragY, dragOffsetY, dragging };
};
