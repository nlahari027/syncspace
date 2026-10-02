import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroMockup from '../ui/HeroMockup';

interface HeroProps {
  onBookDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookDemo }) => {
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 600], [0, 40]);
  const mockupScale = useTransform(scrollY, [0, 600], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: 140,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glows */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        background: 'radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)',
        width: 400, height: 400,
        background: 'radial-gradient(ellipse, rgba(110,231,183,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Hero Text */}
      <motion.div
        style={{ opacity: heroOpacity, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800, marginBottom: 64 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 9999,
            background: 'rgba(167,139,250,0.1)',
            border: '1px solid rgba(167,139,250,0.25)',
            fontSize: 12, fontWeight: 600,
            color: '#A78BFA', letterSpacing: '0.06em',
            marginBottom: 28,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#A78BFA', display: 'inline-block', animation: 'pulse-slow 3s ease-in-out infinite' }} />
          Introducing SyncSpace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            fontSize: 'clamp(40px, 7vw, 88px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 24,
            color: '#FDFBF7',
          }}
        >
          Where therapy becomes a{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FDFBF7 30%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            shared experience.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.65,
          }}
        >
          SyncSpace combines secure live sessions with real-time therapeutic activities, giving psychologists and counselors a more engaging way to connect with their clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}
        >
          <button
            onClick={onBookDemo}
            style={{
              padding: '14px 32px', borderRadius: 9999,
              background: '#FDFBF7', color: '#0f0f0f',
              fontWeight: 700, fontSize: 16, border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(253,251,247,0.15)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
          >
            Book a Demo
          </button>
          <button
            onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '14px 32px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FDFBF7', fontWeight: 500, fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
          >
            Explore the experience ↓
          </button>
        </motion.div>
      </motion.div>

      {/* Hero Mockup */}
      <motion.div
        style={{ y: mockupY, scale: mockupScale, width: '100%', maxWidth: 1000, position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroMockup />
      </motion.div>
    </section>
  );
};

export default Hero;
