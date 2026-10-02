import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Target,
} from 'lucide-react';

// 0 = path, 1 = wall, 2 = goal
const MAZE: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const ROWS = MAZE.length;
const COLS = MAZE[0].length;

const DESKTOP_CELL = 36;

const START = { x: 1, y: 1 };

const Maze: React.FC = () => {
  const [pos, setPos] = useState(START);
  const [completed, setCompleted] = useState(false);
  const [cellSize, setCellSize] = useState(DESKTOP_CELL);

  useEffect(() => {
    const updateCellSize = () => {
      const width = window.innerWidth;

      if (width <= 390) {
        setCellSize(Math.min(30, Math.floor((width - 56) / COLS)));
      } else if (width <= 480) {
        setCellSize(Math.min(32, Math.floor((width - 64) / COLS)));
      } else if (width <= 768) {
        setCellSize(Math.min(34, Math.floor((width - 80) / COLS)));
      } else {
        setCellSize(DESKTOP_CELL);
      }
    };

    updateCellSize();

    window.addEventListener('resize', updateCellSize);

    return () => {
      window.removeEventListener('resize', updateCellSize);
    };
  }, []);

  const move = useCallback(
    (dx: number, dy: number) => {
      if (completed) return;

      setPos((prev) => {
        const nx = prev.x + dx;
        const ny = prev.y + dy;

        // Stay inside maze
        if (ny < 0 || ny >= ROWS || nx < 0 || nx >= COLS) {
          return prev;
        }

        // Wall
        if (MAZE[ny][nx] === 1) {
          return prev;
        }

        // Goal
        if (MAZE[ny][nx] === 2) {
          setCompleted(true);
        }

        return {
          x: nx,
          y: ny,
        };
      });
    },
    [completed]
  );

  /*
   * Keyboard controls for desktop.
   */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        ![
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
        ].includes(e.key)
      ) {
        return;
      }

      e.preventDefault();

      switch (e.key) {
        case 'ArrowUp':
          move(0, -1);
          break;

        case 'ArrowDown':
          move(0, 1);
          break;

        case 'ArrowLeft':
          move(-1, 0);
          break;

        case 'ArrowRight':
          move(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [move]);

  const reset = () => {
    setPos(START);
    setCompleted(false);
  };

  const gridW = COLS * cellSize;
  const gridH = ROWS * cellSize;

  return (
    <div
      className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8"
      style={{
        background: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5 md:mb-6 shrink-0 gap-3">
        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-bold tracking-tight">
            Maze
          </h3>

          <p
            className="text-[11px] md:text-xs mt-1"
            style={{
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            <span className="hidden sm:inline">
              Use arrow keys or buttons below
            </span>

            <span className="sm:hidden">
              Use the buttons to move
            </span>
          </p>
        </div>

        <button
          onClick={reset}
          className="
            flex items-center gap-2
            px-3 py-2 md:px-4 md:py-2
            rounded-full
            text-xs md:text-sm
            font-medium
            transition-colors
            shrink-0
          "
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Game Area */}
      <div
        className="
          flex-1
          flex
          flex-col
          md:flex-row
          items-center
          justify-center
          gap-7
          md:gap-12
          min-h-0
        "
      >
        {/* Maze */}
        <div
          className="relative rounded-2xl overflow-hidden shrink-0"
          style={{
            width: gridW,
            height: gridH,
            maxWidth: '100%',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            touchAction: 'none',
          }}
        >
          {MAZE.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  position: 'absolute',
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,

                  background:
                    cell === 1
                      ? 'rgba(255,255,255,0.08)'
                      : cell === 2
                        ? completed
                          ? 'rgba(251,113,133,0.2)'
                          : 'rgba(255,255,255,0.02)'
                        : completed
                          ? 'rgba(251,113,133,0.08)'
                          : 'transparent',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  transition: 'background 0.5s ease',

                  boxSizing: 'border-box',
                }}
              >
                {cell === 2 && (
                  <Target
                    size={Math.max(13, cellSize * 0.45)}
                    style={{
                      color: completed
                        ? '#FB7185'
                        : 'rgba(251,113,133,0.4)',
                    }}
                  />
                )}
              </div>
            ))
          )}

          {/* Player */}
          <motion.div
            style={{
              position: 'absolute',
              width: cellSize,
              height: cellSize,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              pointerEvents: 'none',
              zIndex: 10,
            }}
            animate={{
              left: pos.x * cellSize,
              top: pos.y * cellSize,
            }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 30,
            }}
          >
            <div
              style={{
                width: Math.max(11, cellSize * 0.39),
                height: Math.max(11, cellSize * 0.39),
                borderRadius: '50%',
                background: '#FB7185',
                boxShadow:
                  '0 0 16px #FB7185, 0 0 30px rgba(251,113,133,0.4)',
              }}
            />
          </motion.div>
        </div>

        {/* Controls & Status */}
        <div className="flex flex-col items-center gap-5 md:gap-6">
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div
                key="done"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="text-center"
              >
                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    type: 'spring',
                    damping: 12,
                    delay: 0.1,
                  }}
                  className="
                    w-14 h-14
                    md:w-16 md:h-16
                    rounded-full
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-3
                    md:mb-4
                  "
                  style={{
                    background: 'rgba(251,113,133,0.15)',
                    border: '2px solid #FB7185',
                    boxShadow:
                      '0 0 30px rgba(251,113,133,0.3)',
                  }}
                >
                  <Target
                    size={25}
                    style={{
                      color: '#FB7185',
                    }}
                  />
                </motion.div>

                <h4 className="text-xl md:text-2xl font-bold mb-1">
                  Focus achieved
                </h4>

                <p
                  className="text-xs md:text-sm mb-5 md:mb-6"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  Target reached.
                </p>

                <button
                  onClick={reset}
                  className="
                    px-5
                    md:px-6
                    py-2.5
                    rounded-full
                    font-medium
                    text-sm
                  "
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border:
                      '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  Try again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="controls"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                {/* Mobile / Desktop controls */}
                <div
                  className="grid grid-cols-3 gap-2"
                  style={{
                    touchAction: 'manipulation',
                  }}
                >
                  <div />

                  <button
                    onClick={() => move(0, -1)}
                    aria-label="Move up"
                    className="
                      w-12 h-12
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-transform
                      active:scale-90
                    "
                    style={{
                      background:
                        'rgba(255,255,255,0.07)',
                      border:
                        '1px solid rgba(255,255,255,0.1)',
                      WebkitTapHighlightColor:
                        'transparent',
                    }}
                  >
                    <ArrowUp size={18} />
                  </button>

                  <div />

                  <button
                    onClick={() => move(-1, 0)}
                    aria-label="Move left"
                    className="
                      w-12 h-12
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-transform
                      active:scale-90
                    "
                    style={{
                      background:
                        'rgba(255,255,255,0.07)',
                      border:
                        '1px solid rgba(255,255,255,0.1)',
                      WebkitTapHighlightColor:
                        'transparent',
                    }}
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button
                    onClick={() => move(0, 1)}
                    aria-label="Move down"
                    className="
                      w-12 h-12
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-transform
                      active:scale-90
                    "
                    style={{
                      background:
                        'rgba(255,255,255,0.07)',
                      border:
                        '1px solid rgba(255,255,255,0.1)',
                      WebkitTapHighlightColor:
                        'transparent',
                    }}
                  >
                    <ArrowDown size={18} />
                  </button>

                  <button
                    onClick={() => move(1, 0)}
                    aria-label="Move right"
                    className="
                      w-12 h-12
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-transform
                      active:scale-90
                    "
                    style={{
                      background:
                        'rgba(255,255,255,0.07)',
                      border:
                        '1px solid rgba(255,255,255,0.1)',
                      WebkitTapHighlightColor:
                        'transparent',
                    }}
                  >
                    <ArrowRight size={18} />
                  </button>
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