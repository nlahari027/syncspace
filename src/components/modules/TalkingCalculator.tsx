import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

const BUTTONS = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['C', '0', '=', '+'],
];

const isOperator = (v: string) => ['/', '*', '-', '+'].includes(v);

const TalkingCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      setJustEvaluated(false);
      return;
    }

    if (val === '=') {
      try {
        // eslint-disable-next-line no-new-func
        const result = Function(`'use strict'; return (${display})`)();
        setEquation(`${display} =`);
        setDisplay(String(result));
        setJustEvaluated(true);
      } catch {
        setDisplay('Error');
        setJustEvaluated(true);
      }
      return;
    }

    // If last action was evaluate, start fresh unless it's an operator continuation
    if (justEvaluated) {
      if (isOperator(val)) {
        setDisplay(display + val);
      } else {
        setDisplay(val);
      }
      setJustEvaluated(false);
      return;
    }

    setDisplay(prev => prev === '0' || prev === 'Error' ? val : prev + val);
  };

  const speakResult = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(display);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 32, background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexShrink: 0 }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Talking Calculator</h3>
          <p style={{ fontSize: 12, marginTop: 4, color: 'rgba(255,255,255,0.4)' }}>Full calculation support</p>
        </div>
        {'speechSynthesis' in window && (
          <button
            onClick={speakResult}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 9999,
              background: isSpeaking ? 'rgba(253,186,116,0.25)' : 'rgba(253,186,116,0.12)',
              border: `1px solid ${isSpeaking ? 'rgba(253,186,116,0.6)' : 'rgba(253,186,116,0.3)'}`,
              color: '#FDBA74', cursor: 'pointer', fontSize: 13, fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            <Volume2 size={15} />
            {isSpeaking ? 'Speaking...' : 'Speak result'}
          </button>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '100%', maxWidth: 340,
          borderRadius: 24,
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}>
          {/* Display */}
          <div style={{
            padding: '20px 24px 16px',
            minHeight: 110,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
          }}>
            {isSpeaking && (
              <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
                {[0, 0.1, 0.2, 0.3].map((d, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [0.2, 1, 0.3, 0.8, 0.2] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                    style={{ width: 3, height: 16, background: '#FDBA74', borderRadius: 2, transformOrigin: 'bottom' }}
                  />
                ))}
              </div>
            )}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4, letterSpacing: '0.02em', minHeight: 18 }}>
              {equation}
            </div>
            <motion.div
              key={display}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ fontSize: 42, fontWeight: 300, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', wordBreak: 'break-all' }}
            >
              {display}
            </motion.div>
          </div>

          {/* Keypad */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.04)', padding: 1 }}>
            {BUTTONS.map((row, ri) =>
              row.map((btn, ci) => {
                const isEq = btn === '=';
                const isOp = isOperator(btn);
                const isClear = btn === 'C';

                return (
                  <motion.button
                    key={`${ri}-${ci}`}
                    whileTap={{ scale: 0.93, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    onClick={() => handlePress(btn)}
                    style={{
                      aspectRatio: '1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, fontWeight: 400,
                      border: 'none', cursor: 'pointer',
                      background: isEq ? '#FDBA74'
                        : isOp ? 'rgba(253,186,116,0.1)'
                        : isClear ? 'rgba(255,255,255,0.04)'
                        : 'rgba(255,255,255,0.06)',
                      color: isEq ? '#0f0f0f' : isOp ? '#FDBA74' : isClear ? 'rgba(255,255,255,0.5)' : '#FDFBF7',
                      transition: 'background 0.15s',
                    }}
                  >
                    {btn}
                  </motion.button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkingCalculator;
