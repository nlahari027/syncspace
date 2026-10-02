import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Lock, CheckCircle2 } from 'lucide-react';

// ---------- Scheduling Card ----------
const SchedulingCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(15);
  const today = 15;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '32px 28px',
    }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#6EE7B7', marginBottom: 10, textTransform: 'uppercase' }}>
          Smart Session Scheduling
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.2 }}>
          Always in sync with your calendar.
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>
          Know when you're in a session and when you're not.
        </p>
      </div>

      <div style={{
        flex: 1,
        background: 'rgba(0,0,0,0.25)',
        borderRadius: 16,
        padding: '16px 14px',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>October 2026</span>
          <Calendar size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6, textAlign: 'center' }}>
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600, padding: '2px 0' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              style={{
                aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', fontSize: 11, fontWeight: d === today ? 600 : 400, cursor: 'pointer',
                border: 'none',
                background: selectedDate === d
                  ? '#6EE7B7'
                  : d === today && selectedDate !== today
                  ? 'rgba(110,231,183,0.15)'
                  : 'transparent',
                color: selectedDate === d ? '#0f0f0f' : d > 31 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)',
                transition: 'background 0.15s',
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {selectedDate === today && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: 12, padding: '10px 12px', borderRadius: 10,
              background: 'rgba(110,231,183,0.1)', border: '1px solid rgba(110,231,183,0.25)',
              fontSize: 12,
            }}
          >
            <div style={{ color: '#6EE7B7', fontWeight: 600, marginBottom: 2 }}>Today · 10:30 AM</div>
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>Alex — Therapy Session</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ---------- Clinical Notes Card ----------
const ClinicalNotesCard: React.FC = () => {
  const notes = [
    'Focus activity completed.',
    'Observed increased engagement.',
    'Memory task completed successfully.',
  ];
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= notes.length) return;
    const t = setTimeout(() => setVisibleCount(v => v + 1), 1800 + visibleCount * 1400);
    return () => clearTimeout(t);
  }, [visibleCount, notes.length]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '32px 28px' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 10, textTransform: 'uppercase' }}>
          Live Clinical Notes
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          Capture observations without breaking flow.
        </h3>
      </div>

      <div style={{
        flex: 1, background: 'rgba(0,0,0,0.25)', borderRadius: 16,
        padding: '16px 18px', border: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'monospace', fontSize: 13,
      }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          SESSION NOTES · Oct 2
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notes.slice(0, visibleCount).map((note, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <CheckCircle2 size={14} style={{ color: '#6EE7B7', flexShrink: 0, marginTop: 1 }} />
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{note}</span>
            </motion.div>
          ))}
          {visibleCount < notes.length && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ width: 2, height: 14, background: 'rgba(255,255,255,0.6)', borderRadius: 1 }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Encrypted Video Card ----------
const EncryptedVideoCard: React.FC = () => (
  <div style={{
    height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', padding: 32,
    textAlign: 'center',
  }}>
    <div style={{ position: 'relative', width: 96, height: 96, marginBottom: 24 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          border: '2px dashed rgba(167,139,250,0.3)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: -16, borderRadius: '50%',
          border: '1.5px dashed rgba(167,139,250,0.15)',
        }}
      />
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: 'rgba(167,139,250,0.1)',
        border: '1.5px solid rgba(167,139,250,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Lock size={30} style={{ color: '#A78BFA' }} />
      </div>
    </div>

    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#A78BFA', marginBottom: 12, textTransform: 'uppercase' }}>
      End-to-End Encrypted
    </div>
    <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.2 }}>
      Enterprise-grade security.
    </h3>
    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: 220 }}>
      Every session is protected with state-of-the-art encryption so you can focus on the conversation.
    </p>
  </div>
);

// ---------- Realtime Sync Card ----------
const RealtimeSyncCard: React.FC = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '32px 28px' }}>
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#FB7185', marginBottom: 10, textTransform: 'uppercase' }}>
        Real-Time Sync
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        Same state. Two screens. One moment.
      </h3>
    </div>

    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      {(['Therapist', 'Client'] as const).map((role, ri) => (
        <React.Fragment key={role}>
          <div style={{
            width: 100, borderRadius: 14,
            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '6px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
              {role.toUpperCase()}
            </div>
            <div style={{ height: 68, position: 'relative', overflow: 'hidden' }}>
              <motion.div
                animate={{ x: [8, 54, 8], y: [8, 30, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: ri === 0 ? 0 : 0 }}
                style={{
                  position: 'absolute',
                  width: 16, height: 16, borderRadius: '50%',
                  background: '#FB7185',
                  boxShadow: '0 0 12px rgba(251,113,133,0.6)',
                }}
              />
            </div>
          </div>

          {ri === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
              {[0, 0.15, 0.3].map((d, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d }}
                  style={{ width: 18, height: 2, borderRadius: 1, background: '#FB7185' }}
                />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// ---------- Main Bento Section ----------
const CapabilitiesBento: React.FC = () => {
  return (
    <section
      id="platform"
      style={{
        padding: '96px 24px',
        background: '#0f0f0f',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700,
            letterSpacing: '-0.03em', marginBottom: 56, textAlign: 'center',
          }}
        >
          Everything around the session,{' '}
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>designed together.</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 16 }}>
          {/* Scheduling - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              gridColumn: 'span 2',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              minHeight: 340,
            }}
          >
            <SchedulingCard />
          </motion.div>

          {/* Encrypted */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'rgba(167,139,250,0.05)',
              border: '1px solid rgba(167,139,250,0.15)',
              borderRadius: 24,
            }}
          >
            <EncryptedVideoCard />
          </motion.div>

          {/* Clinical Notes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              minHeight: 300,
            }}
          >
            <ClinicalNotesCard />
          </motion.div>

          {/* Realtime Sync - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              gridColumn: 'span 2',
              background: 'rgba(251,113,133,0.04)',
              border: '1px solid rgba(251,113,133,0.15)',
              borderRadius: 24,
              minHeight: 280,
            }}
          >
            <RealtimeSyncCard />
          </motion.div>
        </div>

        {/* Responsive fallback: stack on small screens */}
        <style>{`
          @media (max-width: 768px) {
            #bento-grid { grid-template-columns: 1fr !important; }
            #bento-grid > div { grid-column: span 1 !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default CapabilitiesBento;
