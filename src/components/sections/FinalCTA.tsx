import React from 'react';
import { motion } from 'framer-motion';

interface FinalCTAProps {
  onBookDemo: () => void;
  onExplore: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onBookDemo, onExplore }) => {
  return (
    <section style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Animated orbital rings */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 800,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {[500, 360, 240].map((size, i) => (
          <div
            key={size}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size, height: size,
              borderRadius: '50%',
              border: `1px solid rgba(255,255,255,${0.03 + i * 0.015})`,
            }}
          />
        ))}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <div style={{
            position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
            width: 12, height: 12, borderRadius: '50%',
            background: '#A78BFA',
            boxShadow: '0 0 20px #A78BFA, 0 0 40px rgba(167,139,250,0.4)',
          }} />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: 70 }}
        >
          <div style={{
            position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
            width: 10, height: 10, borderRadius: '50%',
            background: '#6EE7B7',
            boxShadow: '0 0 16px #6EE7B7, 0 0 30px rgba(110,231,183,0.4)',
          }} />
        </motion.div>

        {/* Center glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(36px, 7vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Make every session{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FDFBF7 30%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            more engaging.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 48, lineHeight: 1.65 }}
        >
          Bring secure connection and meaningful interaction into the same therapeutic experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={onBookDemo}
            style={{
              padding: '16px 36px', borderRadius: 9999,
              background: '#FDFBF7', color: '#0f0f0f',
              fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer',
              boxShadow: '0 0 50px rgba(253,251,247,0.12)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Book a Demo
          </button>
          <button
            onClick={onExplore}
            style={{
              padding: '16px 36px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FDFBF7', fontWeight: 500, fontSize: 16, cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            Explore Modules
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
