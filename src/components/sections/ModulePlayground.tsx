import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Waves, Calculator, Map } from 'lucide-react';
import MemoryMatch from '../modules/MemoryMatch';
import BubbleSplash from '../modules/BubbleSplash';
import TalkingCalculator from '../modules/TalkingCalculator';
import Maze from '../modules/Maze';

const MODULES = [
  {
    id: 'memory-match',
    title: 'MEMORY MATCH',
    subtitle: 'Working memory & pattern recall',
    icon: LayoutGrid,
    component: MemoryMatch,
    accent: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.12)',
    accentBorder: 'rgba(167,139,250,0.35)',
  },
  {
    id: 'bubble-splash',
    title: 'BUBBLE SPLASH',
    subtitle: 'Sensory regulation & reflexes',
    icon: Waves,
    component: BubbleSplash,
    accent: '#6EE7B7',
    accentBg: 'rgba(110,231,183,0.12)',
    accentBorder: 'rgba(110,231,183,0.35)',
  },
  {
    id: 'talking-calculator',
    title: 'TALKING CALCULATOR',
    subtitle: 'Numeracy & SLD support',
    icon: Calculator,
    component: TalkingCalculator,
    accent: '#FDBA74',
    accentBg: 'rgba(253,186,116,0.12)',
    accentBorder: 'rgba(253,186,116,0.35)',
  },
  {
    id: 'maze',
    title: 'MAZE',
    subtitle: 'Executive functioning & focus',
    icon: Map,
    component: Maze,
    accent: '#FB7185',
    accentBg: 'rgba(251,113,133,0.12)',
    accentBorder: 'rgba(251,113,133,0.35)',
  },
] as const;

const ModulePlayground: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(MODULES[0].id);
  const active = MODULES.find(m => m.id === activeId)!;
  const ActiveComponent = active.component;

  return (
    <section
      id="modules"
      style={{
        padding: '96px 24px',
        background: '#0f0f0f',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}
          >
            One session.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FDFBF7 30%, rgba(255,255,255,0.4) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Four ways to engage.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}
          >
            Interactive therapeutic modules designed to complement different cognitive, sensory, and learning needs.
          </motion.p>
        </div>

        {/* Layout */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280, flexShrink: 0 }}>
            {MODULES.map(mod => {
              const isActive = mod.id === activeId;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveId(mod.id)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '16px 18px',
                    borderRadius: 16,
                    border: `1px solid ${isActive ? mod.accentBorder : 'rgba(255,255,255,0.06)'}`,
                    background: isActive ? mod.accentBg : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    textAlign: 'left',
                    color: '#FDFBF7',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <mod.icon
                    size={22}
                    style={{ color: isActive ? mod.accent : 'rgba(255,255,255,0.3)', marginTop: 2, flexShrink: 0, transition: 'color 0.25s' }}
                  />
                  <div>
                    <div style={{
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
                      color: isActive ? mod.accent : 'rgba(255,255,255,0.7)',
                      marginBottom: 4, transition: 'color 0.25s',
                    }}>
                      {mod.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
                      {mod.subtitle}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="tab-glow"
                      style={{
                        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                        width: 3, height: '60%', borderRadius: 3,
                        background: mod.accent,
                        boxShadow: `0 0 12px ${mod.accent}`,
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Playground */}
          <div style={{
            flex: 1,
            minWidth: 280,
            minHeight: 540,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.01, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulePlayground;
