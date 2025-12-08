import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <div 
      className="cursor-arrow"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        backgroundImage: 'url(/arrow-brand.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  );
}
