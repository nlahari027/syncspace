import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  popped: boolean;
}

const COLORS = [
  '#6EE7B7', // mint
  '#A78BFA', // lavender
  '#FDBA74', // peach
  '#FB7185', // coral
  'rgba(255,255,255,0.7)',
];

const BubbleSplash: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(0);

  const addBubble = useCallback(() => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const size = Math.random() * 50 + 40;
    const newBubble: Bubble = {
      id: `bubble-${nextIdRef.current++}`,
      x: Math.random() * (width - size - 20) + 10,
      y: 0,
      size,
      speed: Math.random() * 8 + 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.3 + 0.5,
      popped: false,
    };
    setBubbles(prev => [...prev.slice(-15), newBubble]);
  }, []);

  useEffect(() => {
    const timers = [0, 600, 1200, 1800, 2400].map(delay =>
      setTimeout(addBubble, delay)
    );
    const interval = setInterval(addBubble, 1800);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [addBubble]);

  const popBubble = (id: string) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setPoppedCount(prev => prev + 1);
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex justify-between items-center mb-8 z-10 relative shrink-0">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Bubble Splash</h3>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Tap the bubbles to interact</p>
        </div>
        <div className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {poppedCount} bubbles explored
        </div>
      </div>

      <div ref={containerRef} className="flex-1 relative w-full overflow-hidden rounded-2xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <AnimatePresence>
          {bubbles.map(bubble => (
            <motion.div
              key={bubble.id}
              initial={{ x: bubble.x, bottom: -80, scale: 0.2, opacity: 0 }}
              animate={bubble.popped
                ? { scale: 1.8, opacity: 0 }
                : { bottom: '110%', scale: 1, opacity: bubble.opacity }
              }
              exit={{ scale: 0, opacity: 0 }}
              transition={bubble.popped
                ? { duration: 0.4, ease: 'easeOut' }
                : { duration: bubble.speed, ease: 'linear' }
              }
              onClick={() => !bubble.popped && popBubble(bubble.id)}
              className="absolute rounded-full cursor-pointer select-none"
              style={{
                width: bubble.size,
                height: bubble.size,
                background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, ${bubble.color} 40%, rgba(0,0,0,0.1) 100%)`,
                boxShadow: `0 0 20px ${bubble.color}40, inset 0 -4px 10px rgba(0,0,0,0.2)`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BubbleSplash;
