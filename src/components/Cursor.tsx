import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth ring animation loop
    let animationFrameId: number;
    let rx = -100;
    let ry = -100;

    const loop = () => {
      rx += (pos.x - rx) * 0.15;
      ry += (pos.y - ry) * 0.15;
      setRingPos({ x: rx, y: ry });
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    // Check hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.dataset.cursor === 'hover') {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner Dot */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#B7F36B] rounded-full pointer-events-none z-[9999] transition-transform duration-75"
        style={{ transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)` }}
      />
      {/* Outer Ring */}
      <div 
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B7F36B]/60 pointer-events-none z-[9998] transition-all duration-100 ${
          isHovered ? 'scale-150 border-[#B7F36B] bg-[#B7F36B]/10' : 'scale-100'
        }`}
        style={{ transform: `translate3d(${ringPos.x - 16}px, ${ringPos.y - 16}px, 0)` }}
      />
    </>
  );
}
