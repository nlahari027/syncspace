import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Video, MonitorUp, PhoneOff, Lock, Wifi } from 'lucide-react';

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const WaveBar: React.FC<{ delay: number; height: number }> = ({ delay, height }) => (
  <motion.div
    animate={{ scaleY: [0.2, 1, 0.4, 0.9, 0.2] }}
    transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
    style={{
      width: 3,
      height: height,
      borderRadius: 2,
      background: '#6EE7B7',
      transformOrigin: 'bottom',
    }}
  />
);

interface CardData { id: number; value: string; isFlipped: boolean; isMatched: boolean }

const getInitialCards = (): CardData[] =>
  [
    { id: 0, value: '◉', isFlipped: false, isMatched: false },
    { id: 1, value: '◉', isFlipped: false, isMatched: false },
    { id: 2, value: '◈', isFlipped: false, isMatched: false },
    { id: 3, value: '◈', isFlipped: false, isMatched: false },
  ].sort(() => Math.random() - 0.5).map((c, i) => ({ ...c, id: i }));

const HeroMockup: React.FC = () => {
  const [sessionTime, setSessionTime] = useState(2538);
  const [cards, setCards] = useState<CardData[]>(getInitialCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [syncPulse, setSyncPulse] = useState(false);
  const [mayaSpeaking, setMayaSpeaking] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSessionTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      setSyncPulse(true);
      setTimeout(() => setSyncPulse(false), 1200);
    }, 3500);
    const speakInterval = setInterval(() => {
      setMayaSpeaking(true);
      setTimeout(() => setMayaSpeaking(false), 2000 + Math.random() * 1500);
    }, 5000);
    return () => { clearInterval(syncInterval); clearInterval(speakInterval); };
  }, []);

  const handleCardClick = (idx: number) => {
    if (locked || cards[idx].isFlipped || cards[idx].isMatched) return;
    const newCards = cards.map((c, i) => i === idx ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      const [a, b] = newFlipped;
      if (newCards[a].value === newCards[b].value) {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, isMatched: true } : c));
          setFlipped([]);
          setLocked(false);
        }, 400);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === a || i === b) ? { ...c, isFlipped: false } : c));
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const matchCount = cards.filter(c => c.isMatched).length / 2;

  return (
    <div
      className="w-full rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(18,18,18,0.95)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        aspectRatio: '16/9',
        minHeight: 280,
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {['#FF5F56','#FFBD2E','#27C93F'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span className="text-xs font-semibold tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>SYNCSPACE</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#6EE7B7' }}
          />
          <span className="text-xs font-semibold" style={{ color: '#6EE7B7', letterSpacing: '0.08em' }}>LIVE</span>
          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Session {formatTime(sessionTime)}
          </span>
        </div>

        <div style={{ width: 80 }} />
      </div>

      {/* ── Main Grid ── */}
      <div className="flex-1 grid gap-3 p-3 md:p-4 overflow-hidden" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto 1fr' }}>

        {/* Therapist Video */}
        <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(15,15,15,0.8) 100%)',
          border: '1px solid rgba(167,139,250,0.2)',
        }}>
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '60%',
              aspectRatio: '1',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.4) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #A78BFA, rgba(167,139,250,0.3))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
            border: '2px solid rgba(167,139,250,0.4)',
            zIndex: 1,
          }}>
            👩‍⚕️
          </div>

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
              <span className="text-xs font-semibold">Dr. Maya</span>
              <span className="text-[9px] px-1 rounded" style={{ background: 'rgba(167,139,250,0.3)', color: '#A78BFA' }}>Therapist</span>
            </div>
            {mayaSpeaking && (
              <div className="flex items-end gap-0.5 px-1.5">
                {[0, 0.1, 0.2].map(d => <WaveBar key={d} delay={d} height={12} />)}
              </div>
            )}
          </div>
        </div>

        {/* Client Video */}
        <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, rgba(110,231,183,0.12) 0%, rgba(15,15,15,0.8) 100%)',
          border: '1px solid rgba(110,231,183,0.2)',
        }}>
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{
              position: 'absolute',
              width: '60%',
              aspectRatio: '1',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(110,231,183,0.35) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6EE7B7, rgba(110,231,183,0.3))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
            border: '2px solid rgba(110,231,183,0.4)',
            zIndex: 1,
          }}>
            🧑
          </div>

          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
            <span className="text-xs font-semibold">Alex</span>
            <span className="text-[9px] px-1 rounded" style={{ background: 'rgba(110,231,183,0.3)', color: '#6EE7B7' }}>Client</span>
          </div>
        </div>

        {/* Shared Activity — Memory Match mini */}
        <div className="col-span-2 rounded-2xl flex flex-col overflow-hidden" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div className="flex justify-between items-center px-4 py-2 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-xs font-semibold tracking-widest" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
              SHARED · MEMORY MATCH
            </span>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Matches:
              <span style={{ color: '#FDFBF7', fontWeight: 600 }}>{matchCount} / 2</span>
              <motion.div
                animate={{ opacity: syncPulse ? 1 : 0.2 }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#6EE7B7', marginLeft: 6 }}
              />
              <span style={{ color: syncPulse ? '#6EE7B7' : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}>sync</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-4 py-3">
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 56px)' }}>
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  style={{ width: 56, height: 72, perspective: 1000, cursor: locked ? 'default' : 'pointer' }}
                >
                  <motion.div
                    animate={{ rotateY: (card.isFlipped || card.isMatched) ? 180 : 0 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 180, damping: 18 }}
                    style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
                  >
                    {/* Front */}
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: 10,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1.5px solid rgba(255,255,255,0.12)',
                      backfaceVisibility: 'hidden',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, color: 'rgba(255,255,255,0.1)',
                    }}>
                      ?
                    </div>
                    {/* Back */}
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: 10,
                      background: card.isMatched ? 'rgba(110,231,183,0.12)' : 'rgba(167,139,250,0.12)',
                      border: `1.5px solid ${card.isMatched ? 'rgba(110,231,183,0.5)' : 'rgba(167,139,250,0.4)'}`,
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22,
                      boxShadow: card.isMatched ? '0 0 15px rgba(110,231,183,0.2)' : 'none',
                    }}>
                      {card.value}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Controls ── */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Lock size={12} />
          <span>Secure session</span>
        </div>

        <div className="flex items-center gap-2">
          {[{ Icon: Mic, label: 'Mute' }, { Icon: Video, label: 'Camera' }, { Icon: MonitorUp, label: 'Share' }].map(({ Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="rounded-full flex items-center justify-center transition-colors"
              style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Icon size={15} />
            </button>
          ))}
          <button
            aria-label="End session"
            className="rounded-full flex items-center justify-center transition-colors"
            style={{ width: 36, height: 36, background: 'rgba(251,113,133,0.15)', border: '1px solid rgba(251,113,133,0.3)', color: '#FB7185' }}
          >
            <PhoneOff size={15} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Wifi size={12} style={{ color: syncPulse ? '#6EE7B7' : undefined, transition: 'color 0.3s' }} />
          <span>Activity synchronized</span>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
