import React from 'react';

const Footer: React.FC = () => {
  const links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Modules', href: '#modules' },
    { label: 'Professionals', href: '#professionals' },
    { label: 'Clients', href: '#clients' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '48px 24px',
      marginTop: 0,
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'center', gap: 32,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <svg width="28" height="16" viewBox="0 0 28 16">
              <circle cx="6" cy="8" r="5.5" fill="none" stroke="#6EE7B7" strokeWidth="1.5"/>
              <circle cx="22" cy="8" r="5.5" fill="none" stroke="#A78BFA" strokeWidth="1.5"/>
            </svg>
            <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.02em' }}>syncspace</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Therapy that works together.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px' }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#FDFBF7'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: 1100, margin: '32px auto 0',
        paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)',
        fontSize: 12, color: 'rgba(255,255,255,0.2)',
      }}>
        © {new Date().getFullYear()} SyncSpace Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
