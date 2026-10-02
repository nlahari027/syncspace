import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookDemo: () => void;
}

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Modules', href: '#modules' },
  { label: 'For Professionals', href: '#professionals' },
  { label: 'For Clients', href: '#clients' },
];

const Logo: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  const s = size === 'sm' ? 14 : 18;
  return (
    <div className="flex items-center gap-2 group">
      <svg width={s * 2} height={s} viewBox={`0 0 ${s * 2} ${s}`}>
        <circle
          cx={s * 0.4} cy={s / 2} r={s * 0.38}
          fill="none"
          stroke="#6EE7B7"
          strokeWidth="2"
        />
        <circle
          cx={s * 1.6} cy={s / 2} r={s * 0.38}
          fill="none"
          stroke="#A78BFA"
          strokeWidth="2"
        />
      </svg>
      <span style={{ fontWeight: 600, fontSize: size === 'sm' ? 16 : 18, letterSpacing: '-0.02em' }}>
        syncspace
      </span>
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ onBookDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? '12px 16px' : '20px 24px',
          transition: 'padding 0.4s ease',
        }}
      >
        <div
          className="mx-auto max-w-6xl flex items-center justify-between"
          style={scrolled ? {
            background: 'rgba(15,15,15,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 9999,
            padding: '10px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'all 0.4s ease',
          } : {
            padding: '0',
            transition: 'all 0.4s ease',
          }}
        >
          <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBookDemo}
              className="hidden md:block"
              style={{
                padding: '9px 22px',
                borderRadius: 9999,
                background: '#FDFBF7',
                color: '#0f0f0f',
                fontWeight: 600,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.15s, opacity 0.15s',
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = '0.9'}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = '1'}
            >
              Book a Demo
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8 }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 60,
              background: 'rgba(15,15,15,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', padding: 24,
            }}
          >
            <div className="flex justify-between items-center mb-12">
              <Logo />
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 8 }}>
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{ fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', letterSpacing: '-0.03em' }}
                >
                  {label}
                </a>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingBottom: 40 }}>
              <button
                onClick={() => { setMobileOpen(false); onBookDemo(); }}
                style={{
                  width: '100%', padding: '18px', borderRadius: 16,
                  background: '#FDFBF7', color: '#0f0f0f',
                  fontWeight: 600, fontSize: 18, border: 'none', cursor: 'pointer',
                }}
              >
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
