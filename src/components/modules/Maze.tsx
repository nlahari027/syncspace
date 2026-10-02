import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Target } from 'lucide-react';

// 0=path, 1=wall, 2=goal
const MAZE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,0,2,1],
  [1,1,1,1,1,1,1,1,1,1],
];
const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const CELL = 36; // px per cell

const START = { x: 1, y: 1 };

const Maze: React.FC = () => {
  const [pos, setPos] = useState(START);
  const [completed, setCompleted] = useState(false);

  const move = useCallback((dx: number, dy: number) => {
    if (completed) return;
    setPos(prev => {
      const nx = prev.x + dx;
      const ny = prev.y + dy;
      if (ny < 0 || ny >= ROWS || nx < 0 || nx >= COLS) return prev;
      if (MAZE[ny][nx] === 1) return prev;
      if (MAZE[ny][nx] === 2) setCompleted(true);
      return { x: nx, y: ny };
    });
  }, [completed]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      switch(e.key) {
        case 'ArrowUp':    move(0, -1); break;
        case 'ArrowDown':  move(0,  1); break;
        case 'ArrowLeft':  move(-1, 0); break;
        case 'ArrowRight': move( 1, 0); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move]);

  const reset = () => { setPos(START); setCompleted(false); };

  const gridW = COLS * CELL;
  const gridH = ROWS * CELL;

  return (
    <div className="w-full h-full flex flex-col p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Maze</h3>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Use arrow keys or buttons below</p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Maze Grid */}
        <div className="relative rounded-2xl overflow-hidden shrink-0" style={{
          width: gridW,
          height: gridH,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          {MAZE.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  position: 'absolute',
                  left: x * CELL,
                  top: y * CELL,
                  width: CELL,
                  height: CELL,
                  background: cell === 1
                    ? 'rgba(255,255,255,0.08)'
                    : cell === 2
                    ? (completed ? 'rgba(251,113,133,0.2)' : 'rgba(255,255,255,0.02)')
                    : (completed ? 'rgba(251,113,133,0.08)' : 'transparent'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.5s ease',
                }}
              >
                {cell === 2 && (
                  <Target size={16} style={{ color: completed ? '#FB7185' : 'rgba(251,113,133,0.4)' }} />
                )}
              </div>
            ))
          )}

          {/* Player */}
          <motion.div
            style={{
              position: 'absolute',
              width: CELL,
              height: CELL,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
            animate={{ left: pos.x * CELL, top: pos.y * CELL }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          >
            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#FB7185',
              boxShadow: '0 0 16px #FB7185, 0 0 30px rgba(251,113,133,0.4)',
            }} />
          </motion.div>
        </div>

        {/* Controls & Status */}
        <div className="flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'rgba(251,113,133,0.15)',
                    border: '2px solid #FB7185',
                    boxShadow: '0 0 30px rgba(251,113,133,0.3)',
                  }}
                >
                  <Target size={28} style={{ color: '#FB7185' }} />
                </motion.div>
                <h4 className="text-2xl font-bold mb-1">Focus achieved</h4>
                <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>Target reached.</p>
                <button
                  onClick={reset}
                  className="px-6 py-2.5 rounded-full font-medium text-sm"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Try again
                </button>
              </motion.div>
            ) : (
              <motion.div key="controls" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-3 gap-2">
                  <div />
                  <button onClick={() => move(0, -1)} aria-label="Up" className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors active:scale-90" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}><ArrowUp size={18} /></button>
                  <div />
                  <button onClick={() => move(-1, 0)} aria-label="Left" className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors active:scale-90" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}><ArrowLeft size={18} /></button>
                  <button onClick={() => move(0, 1)} aria-label="Down" className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors active:scale-90" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}><ArrowDown size={18} /></button>
                  <button onClick={() => move(1, 0)} aria-label="Right" className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors active:scale-90" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}><ArrowRight size={18} /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Maze;
