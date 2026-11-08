import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { petals } from '../lib/petals';
import { COUPLE, INTRO } from '../config';

// Embossed floral motif — drawn twice (shadow + highlight) to fake a debossed paper texture.
function EmbossDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <g id="motif" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
          <g transform="translate(40 40)">
            {[0, 72, 144, 216, 288].map((r) => (<path key={r} d="M0 0 C-9 -8 -9 -20 0 -27 C9 -20 9 -8 0 0Z" transform={`rotate(${r})`} />))}
            <circle r="3.2" />
            <circle r="7.5" strokeDasharray="1.4 2.6" />
          </g>
          <path d="M70 70 C96 60 108 88 130 80 S150 52 146 34" />
          {[[86, 70, -30], [108, 82, 25], [128, 78, -40], [144, 52, 20]].map(([x, y, r], i) => (
            <path key={i} d="M0 0 C6 -8 16 -8 22 0 C16 8 6 8 0 0Z" transform={`translate(${x} ${y}) rotate(${r})`} />
          ))}
          <g transform="translate(112 118) rotate(18)">
            {[0, 60, 120, 180, 240, 300].map((r) => (<path key={r} d="M0 0 C-5 -5 -5 -12 0 -16 C5 -12 5 -5 0 0Z" transform={`rotate(${r})`} />))}
          </g>
          <path d="M10 130 C30 118 44 142 62 132" />
          <path d="M20 128 c4 -9 14 -10 18 -4 c-6 6 -12 8 -18 4Z" />
        </g>
        <pattern id="emb" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform="scale(0.62)">
          <use href="#motif" stroke="rgba(3, 10, 27,.5)" transform="translate(1 1.4)" />
          <use href="#motif" stroke="rgba(153, 180, 242,.34)" transform="translate(-.5 -.7)" />
          <use href="#motif" stroke="rgba(3, 10, 27,.5)" transform="translate(81 81.4)" />
          <use href="#motif" stroke="rgba(153, 180, 242,.34)" transform="translate(80.5 80.3)" />
        </pattern>
      </defs>
    </svg>
  );
}

const Emboss = () => (
  <svg className="emboss" aria-hidden><rect width="100%" height="100%" fill="url(#emb)" /></svg>
);

/* Opening: a closed envelope with a wax seal.
   Tap → seal breaks → the top flap folds back → the card slides out → it melts into the invitation. */
export default function Envelope({ onOpen, onStart }) {
  const [phase, setPhase] = useState('loading'); // loading → ready → opening → reveal

  useEffect(() => {
    let alive = true;
    const minWait = new Promise((r) => setTimeout(r, 2100));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.all([minWait, fonts]).then(() => alive && setPhase('ready'));
    return () => { alive = false; };
  }, []);

  const open = () => {
    if (phase !== 'ready') return;
    setPhase('opening');
    onStart?.(); // inside the tap, so browsers allow audio to start
    navigator.vibrate?.(20);
    const { w, h } = petals.size();
    petals.burst({ count: 40, x: w / 2, y: h * 0.55, spread: 1 });
    setTimeout(() => petals.burst({ count: 90, duration: 900 }), 1500);
    setTimeout(() => setPhase('reveal'), 2800);
    setTimeout(onOpen, 3700);
  };

  return (
    <div className={`fixed-frame env-layer env-${phase} ${phase === 'reveal' ? 'env-opening' : ''}`}>
      <motion.div className="env" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
        <EmbossDefs />

        <div className="env-head">
          <span className="env-head-te" lang="te">{INTRO.telugu}</span>
          <span className="env-head-en">{INTRO.english}</span>
        </div>

        <div className="env-stage" onClick={open}>
          <div className="env-back" />

          <div className="env-card">
            <div className="env-card-border">
              <span className="env-card-kicker">together with their families</span>
              <span className="env-card-names">{COUPLE.groom}<em>&amp;</em>{COUPLE.bride}</span>
              <span className="env-card-kicker">invite you to their engagement</span>
            </div>
          </div>

          <div className="pc pc-left"><Emboss /></div>
          <div className="pc pc-right"><Emboss /></div>
          <div className="pc pc-bottom"><Emboss /></div>
          <svg className="env-folds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path className="sh" d="M0 0 L50 58 L100 0" />
            <path d="M0 0 L50 58 M100 0 L50 58" />
            <path d="M0 100 L50 48 L100 100" />
          </svg>

          <div className="env-flapshadow" aria-hidden><i /></div>
          <div className="env-flap">
            <div className="flap-face flap-out">
              <Emboss />
              <svg className="edge" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d="M0 0 L50 100 L100 0" /></svg>
            </div>
            <div className="flap-face flap-in" />
          </div>

          <button className="env-seal" aria-label="Open the invitation" disabled={phase !== 'ready'}>
            <span className="seal-ping" /><span className="seal-ping p2" />
            <span className="seal-wax">
              <span className="seal-ring" />
              <img className="seal-mark" src="./images/ny-monogram.png" alt="N &amp; Y" draggable="false" />
            </span>
          </button>
        </div>

        <div className="env-label" aria-live="polite">
          <span className="env-label-load">Preparing your invitation</span>
          <span className="env-label-ready">Tap the envelope to open</span>
        </div>

        <div className="env-wash" aria-hidden />
      </motion.div>
    </div>
  );
}
