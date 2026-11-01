import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-6 h-6 bg-[#C5F467] border border-[#151515] rounded-full pointer-events-none z-50 transition-transform duration-75 ease-out translate-x-[-50%] translate-y-[-50%]"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
    />
  );
}
