import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PluginArchitectureProps {}

const MODULES = [
  { id: 'maze',       label: 'MAZE',               color: '#FB7185', desc: 'Focus & executive functioning module for ADHD support.' },
  { id: 'memory',     label: 'MEMORY MATCH',        color: '#A78BFA', desc: 'Working memory training through pattern recognition.' },
  { id: 'bubble',     label: 'BUBBLE SPLASH',       color: '#6EE7B7', desc: 'Sensory regulation through tactile bubble interaction.' },
  { id: 'calculator', label: 'TALKING CALCULATOR',  color: '#FDBA74', desc: 'Numeracy & SLD support with speech output.' },
];

const PluginArchitecture: React.FC<PluginArchitectureProps> = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section style={{
      padding: '96px 24px',
      background: '#0c0c0c',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.15 }}
        >
          The session stays the same.{' '}
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>The experience can evolve.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 64, lineHeight: 1.65 }}
        >
          Built for plug-in therapy modules. New activities can be introduced without changing the core session experience.
        </motion.p>

        {/* Architecture Diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Top node */}
          <div style={{
            padding: '12px 28px', borderRadius: 12,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: '#FDFBF7',
            boxShadow: '0 0 30px rgba(255,255,255,0.04)',
          }}>
            SYNCSPACE SESSION
          </div>

          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.06))' }} />

          {/* Engine node */}
          <div style={{
            padding: '10px 24px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)',
          }}>
            MODULE ENGINE
          </div>

          {/* Horizontal trunk */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 600, height: 40, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: 0, width: '75%', height: 1, background: 'rgba(255,255,255,0.08)' }} />
            {MODULES.map((mod, i) => {
              const positions = ['12.5%', '37.5%', '62.5%', '87.5%'];
              return (
                <div
                  key={mod.id}
                  style={{
                    position: 'absolute',
                    left: positions[i],
                    top: 0,
                    transform: 'translateX(-50%)',
                    width: 1,
                    height: 40,
                    background: hovered === mod.id ? mod.color : 'rgba(255,255,255,0.08)',
                    transition: 'background 0.3s',
                  }}
                />
              );
            })}
          </div>

          {/* Module nodes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 600, gap: 8, flexWrap: 'wrap' }}>
            {MODULES.map(mod => (
              <div
                key={mod.id}
                onMouseEnter={() => setHovered(mod.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  flex: '1 1 120px',
                  padding: '10px 12px', borderRadius: 10,
                  border: `1px solid ${hovered === mod.id ? mod.color + '60' : 'rgba(255,255,255,0.08)'}`,
                  background: hovered === mod.id ? `${mod.color}12` : 'rgba(255,255,255,0.03)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textAlign: 'center',
                  color: hovered === mod.id ? mod.color : 'rgba(255,255,255,0.45)',
                  cursor: 'default',
                  transition: 'all 0.25s ease',
                }}
              >
                {mod.label}
              </div>
            ))}
          </div>
        </div>

        {/* Description tooltip */}
        <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.p
                key={hovered}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55,
                  maxWidth: 420, margin: 0,
                }}
              >
                {MODULES.find(m => m.id === hovered)?.desc}
              </motion.p>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', margin: 0 }}
              >
                Hover over a module to learn more
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PluginArchitecture;
