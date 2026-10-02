import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface CardData { id: number; value: string; isFlipped: boolean; isMatched: boolean }

const PAIRS = ['◯', '△', '◇', '☆'];

const shuffle = (): CardData[] => {
  const cards: CardData[] = [];
  PAIRS.forEach((v, i) => {
    cards.push({ id: i * 2,     value: v, isFlipped: false, isMatched: false });
    cards.push({ id: i * 2 + 1, value: v, isFlipped: false, isMatched: false });
  });
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const PAIR_COLORS: Record<string, string> = {
  '◯': '#A78BFA',
  '△': '#6EE7B7',
  '◇': '#FDBA74',
  '☆': '#FB7185',
};

const MemoryMatch: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>(shuffle);
  const [flippedIdxs, setFlippedIdxs] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleClick = (idx: number) => {
    if (locked || cards[idx].isFlipped || cards[idx].isMatched) return;

    const updated = cards.map((c, i) => i === idx ? { ...c, isFlipped: true } : c);
    setCards(updated);
    const newFlipped = [...flippedIdxs, idx];
    setFlippedIdxs(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setAttempts(a => a + 1);
      const [a, b] = newFlipped;

      if (updated[a].value === updated[b].value) {
        setTimeout(() => {
          const matched = updated.map((c, i) => (i === a || i === b) ? { ...c, isMatched: true } : c);
          setCards(matched);
          setFlippedIdxs([]);
          setLocked(false);
          if (matched.every(c => c.isMatched)) setTimeout(() => setCompleted(true), 400);
        }, 400);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, isFlipped: false } : c));
          setFlippedIdxs([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const reset = () => { setCards(shuffle()); setFlippedIdxs([]); setLocked(false); setCompleted(false); setAttempts(0); };

  const matchCount = cards.filter(c => c.isMatched).length / 2;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 32, background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexShrink: 0 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Memory Match</h3>
          <p style={{ fontSize: 12, marginTop: 4, color: 'rgba(255,255,255,0.4)' }}>Find all matching pairs</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            <span style={{ color: '#FDFBF7', fontWeight: 600 }}>{matchCount}</span> / 4 pairs
          </div>
          {completed && (
            <button onClick={reset} style={{
              padding: '7px 16px', borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: '#FDFBF7', color: '#0f0f0f', border: 'none',
            }}>
              Play again
            </button>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 20,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(8px)', borderRadius: 16,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, delay: 0.1 }}
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(110,231,183,0.15)',
                  border: '2px solid #6EE7B7',
                  boxShadow: '0 0 40px rgba(110,231,183,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Check size={34} style={{ color: '#6EE7B7' }} />
              </motion.div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
                Session activity complete
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
                {attempts} attempts · All pairs found
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          width: '100%',
          maxWidth: 460,
        }}>
          {cards.map((card, idx) => {
            const color = PAIR_COLORS[card.value];
            const revealed = card.isFlipped || card.isMatched;
            return (
              <div
                key={card.id}
                onClick={() => handleClick(idx)}
                style={{ perspective: 1000, cursor: (locked || card.isMatched) ? 'default' : 'pointer' }}
              >
                <motion.div
                  animate={{ rotateY: revealed ? 180 : 0 }}
                  transition={{ duration: 0.55, type: 'spring', stiffness: 190, damping: 20 }}
                  style={{ width: '100%', paddingBottom: '130%', position: 'relative', transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                    backfaceVisibility: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, color: 'rgba(255,255,255,0.08)',
                    transition: 'border-color 0.2s',
                  }}>
                    ?
                  </div>
                  {/* Back */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: 14,
                    background: card.isMatched ? `${color}18` : `${color}10`,
                    border: `1.5px solid ${card.isMatched ? `${color}90` : `${color}50`}`,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 30,
                    boxShadow: card.isMatched ? `0 0 20px ${color}30` : 'none',
                    transition: 'box-shadow 0.4s',
                    color,
                  }}>
                    {card.value}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemoryMatch;
