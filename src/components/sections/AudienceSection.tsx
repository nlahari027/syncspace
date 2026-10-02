import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONDITIONS = [
  { id: 'adhd', title: 'ADHD', desc: 'Support activities designed around focus, attention, and executive functioning.', color: '#FB7185' },
  { id: 'sld', title: 'Specific Learning Disabilities', desc: 'Visual and interactive tools that accommodate different processing needs.', color: '#FDBA74' },
  { id: 'autism', title: 'Autism', desc: 'Structured, predictable modules designed for sensory regulation and engagement.', color: '#6EE7B7' },
  { id: 'anxiety', title: 'Anxiety', desc: 'Grounding activities that help redirect focus and manage overwhelming feelings.', color: '#A78BFA' },
  { id: 'depression', title: 'Depression', desc: 'Low-barrier interactions that gently encourage participation and completion.', color: 'rgba(255,255,255,0.7)' },
  { id: 'id', title: 'Intellectual Disabilities', desc: 'Accessible, clear, and adaptable tools tailored to varying cognitive levels.', color: 'rgba(255,255,255,0.7)' },
];

const AudienceSection: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="professionals"
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
            letterSpacing: '-0.03em', marginBottom: 64, maxWidth: 640, lineHeight: 1.15,
          }}
        >
          Different minds.<br />
          Different needs.<br />
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>One shared space.</span>
        </motion.h2>

        {/* Condition Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 80 }}>
          {CONDITIONS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '24px 28px',
                borderRadius: 20,
                background: hovered === c.id ? `${c.color}0d` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${hovered === c.id ? `${c.color}30` : 'rgba(255,255,255,0.07)'}`,
                cursor: 'default',
                transition: 'all 0.3s ease',
                minHeight: 130,
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                fontSize: 17, fontWeight: 600,
                letterSpacing: '-0.01em',
                color: hovered === c.id ? c.color : '#FDFBF7',
                transition: 'color 0.3s, transform 0.3s',
                transform: hovered === c.id ? 'translateY(-6px)' : 'translateY(0)',
                marginBottom: 8,
              }}>
                {c.title}
              </div>

              <AnimatePresence>
                {hovered === c.id && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}
                  >
                    {c.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Provider Cards */}
        <div id="clients" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: 40,
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(167,139,250,0.2)',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#A78BFA', marginBottom: 16, textTransform: 'uppercase' }}>
              For Psychologists
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.25 }}>
              Launch structured activities during live sessions.
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
              Integrate evidence-based modules directly into your existing workflow without switching applications or breaking rapport.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              padding: 40,
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(110,231,183,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(110,231,183,0.2)',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#6EE7B7', marginBottom: 16, textTransform: 'uppercase' }}>
              For Counselors
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.25 }}>
              Keep clients engaged without interrupting the conversation.
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
              Use gentle, low-stakes interactions to help clients regulate and remain present during difficult discussions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
