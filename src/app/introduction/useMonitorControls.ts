import { useState, useEffect } from 'react';
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
  
  const [springProps, setSpring] = useSpring(() => ({
    transform: 'scale(1) translateY(0)',
    opacity: 1,
    config: { tension: 280, friction: 60 },
  }));

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

  const handleMouseMove = (event: MouseEvent) => {
    if (!dragging || startDragY === null) return;

    const newDragY = event.clientY - startDragY;
    setDragOffsetY(newDragY);

    if (newDragY > 100) {
      setSpring.start({
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
  };

  const handleMouseUp = () => {
    setDragging(false);

    if (dragOffsetY < 200) {
      setSpring.start({
        transform: 'scale(1) translateY(0)',
        opacity: 1,
      });
      setDragOffsetY(0);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, startDragY, scale, dragOffsetY]);

  return { springProps, setDragging, setStartDragY, dragOffsetY, dragging }; // Add dragging to return
};
