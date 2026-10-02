import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'Demo' | 'Session';
}

const ROLES = [
  { id: 'psychologist', label: 'Psychologist', description: 'Licensed psychologist providing structured therapy.' },
  { id: 'counselor',    label: 'Counselor',    description: 'Counselor supporting client wellbeing.' },
  { id: 'client',       label: 'Client',       description: 'Individual seeking therapeutic support.' },
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, context }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', date: '' });
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = { name: '', email: '', date: '' };
    let ok = true;
    if (!name.trim()) { e.name = 'Name is required'; ok = false; }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { e.email = 'Valid email required'; ok = false; }
    if (!date) { e.date = 'Please select a date'; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = () => {
    if (step === 1) { if (role) setStep(2); return; }
    if (step === 2) {
      if (!validate()) return;
      setSubmitting(true);
      setTimeout(() => { setSubmitting(false); setStep(3); }, 1600);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1); setRole(''); setName(''); setEmail(''); setDate('');
      setErrors({ name: '', email: '', date: '' });
    }, 400);
  };

  // Escape key
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(10px)',
            }}
          />

          {/* Modal */}
          <div style={{
            position: 'fixed', inset: 0, zIndex: 51,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16, pointerEvents: 'none',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                pointerEvents: 'all',
                width: '100%', maxWidth: 480,
                background: '#181818',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 28,
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                maxHeight: '90vh',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px 28px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                    Book a {context}
                  </h2>
                  {step < 3 && (
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                      Step {step} of 2
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: 'none', cursor: 'pointer', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Progress Bar */}
              {step < 3 && (
                <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', display: 'flex' }}>
                  <motion.div
                    animate={{ width: step === 1 ? '50%' : '100%' }}
                    transition={{ duration: 0.4 }}
                    style={{ height: '100%', background: '#FDFBF7' }}
                  />
                </div>
              )}

              {/* Body */}
              <div style={{ flex: 1, overflow: 'auto', padding: '28px 28px' }}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Who are you?</h3>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>
                        Help us tailor your {context.toLowerCase()} experience.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                        {ROLES.map(r => (
                          <button
                            key={r.id}
                            onClick={() => setRole(r.id)}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '16px 18px', borderRadius: 14,
                              border: `1.5px solid ${role === r.id ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                              background: role === r.id ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)',
                              cursor: 'pointer', textAlign: 'left', color: '#FDFBF7',
                              transition: 'all 0.2s',
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 3 }}>{r.label}</div>
                              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.description}</div>
                            </div>
                            {role === r.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                  width: 22, height: 22, borderRadius: '50%',
                                  background: '#6EE7B7',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  flexShrink: 0, marginLeft: 12, fontSize: 12, color: '#0f0f0f', fontWeight: 700,
                                }}
                              >
                                ✓
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={!role}
                        style={{
                          width: '100%', padding: '15px', borderRadius: 14,
                          background: role ? '#FDFBF7' : 'rgba(255,255,255,0.1)',
                          color: role ? '#0f0f0f' : 'rgba(255,255,255,0.3)',
                          fontWeight: 700, fontSize: 16, border: 'none', cursor: role ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                        }}
                      >
                        Continue →
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Your details</h3>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>
                        We'll confirm your {context.toLowerCase()} via email.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                        {[
                          { id: 'name', label: 'Full Name', value: name, set: setName, type: 'text', placeholder: 'Alex Doe', error: errors.name },
                          { id: 'email', label: 'Email Address', value: email, set: setEmail, type: 'email', placeholder: 'alex@example.com', error: errors.email },
                          { id: 'date', label: 'Preferred Date', value: date, set: setDate, type: 'date', placeholder: '', error: errors.date },
                        ].map(f => (
                          <div key={f.id}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 }}>
                              {f.label}
                            </label>
                            <input
                              type={f.type}
                              value={f.value}
                              onChange={e => { f.set(e.target.value); setErrors(prev => ({ ...prev, [f.id]: '' })); }}
                              placeholder={f.placeholder}
                              style={{
                                width: '100%', padding: '12px 14px', borderRadius: 12, fontSize: 15,
                                background: 'rgba(0,0,0,0.3)',
                                border: `1.5px solid ${f.error ? 'rgba(251,113,133,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                color: '#FDFBF7', outline: 'none', boxSizing: 'border-box',
                                colorScheme: 'dark',
                                transition: 'border-color 0.2s',
                              }}
                              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = f.error ? 'rgba(251,113,133,0.5)' : 'rgba(255,255,255,0.1)'; }}
                            />
                            {f.error && (
                              <p style={{ fontSize: 12, color: '#FB7185', marginTop: 5 }}>{f.error}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          onClick={() => setStep(1)}
                          style={{
                            padding: '15px 20px', borderRadius: 14,
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#FDFBF7', fontWeight: 600, fontSize: 15, cursor: 'pointer',
                          }}
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={submitting}
                          style={{
                            flex: 1, padding: '15px', borderRadius: 14,
                            background: '#FDFBF7', color: '#0f0f0f',
                            fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            opacity: submitting ? 0.8 : 1, transition: 'opacity 0.2s',
                          }}
                        >
                          {submitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#0f0f0f', borderRadius: '50%' }}
                              />
                              Sending...
                            </>
                          ) : 'Submit Request'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', damping: 16 }}
                      style={{ textAlign: 'center', padding: '32px 0' }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10, delay: 0.15 }}
                        style={{
                          width: 80, height: 80, borderRadius: '50%',
                          background: 'rgba(110,231,183,0.12)',
                          border: '2px solid #6EE7B7',
                          boxShadow: '0 0 50px rgba(110,231,183,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 24px', fontSize: 32,
                        }}
                      >
                        ✓
                      </motion.div>
                      <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>
                        Request received
                      </h3>
                      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 32 }}>
                        We've sent a confirmation to<br />
                        <span style={{ color: '#FDFBF7', fontWeight: 600 }}>{email}</span>
                      </p>
                      <button
                        onClick={handleClose}
                        style={{
                          padding: '13px 32px', borderRadius: 14,
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#FDFBF7', fontWeight: 600, fontSize: 15, cursor: 'pointer',
                        }}
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
