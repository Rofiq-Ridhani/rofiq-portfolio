import { useEffect, useState } from 'react';

export function RealClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-[10px] text-[#527A63]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#B7F36B]" />
      <span>LOC_TIME: {time || '00:00:00'}</span>
    </div>
  );
}

export function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-[#14251F] z-[99]">
      <div 
        className="h-full bg-[#B7F36B] transition-all duration-75 shadow-[0_0_8px_#B7F36B]" 
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
