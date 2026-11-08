import { motion } from 'framer-motion';
import { Emblem, CornerFlourish, Garland } from '../lib/art';
import { ArrowDown } from '../lib/icons';
import { BLESSING_TELUGU, COUPLE, OCCASION } from '../config';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } };
const letter = {
  hidden: { opacity: 0, y: 30, rotateX: -80, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } },
};
const fade = (delay) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: 'easeOut' } },
});

function Name({ text }) {
  return (
    <motion.h1 className="hero-name" variants={container} aria-label={text}>
      {text.split('').map((c, i) => (
        <motion.span key={i} variants={letter} aria-hidden style={{ display: 'inline-block', whiteSpace: 'pre' }}>{c}</motion.span>
      ))}
    </motion.h1>
  );
}

// jasmine strands that drop in from the top corners, then sway gently
const STRANDS = [
  { side: 'l', x: 14, len: 190, seed: 11, delay: 0.1 },
  { side: 'l', x: 44, len: 120, seed: 23, delay: 0.3 },
  { side: 'l', x: 72, len: 70, seed: 5, delay: 0.5 },
  { side: 'r', x: 14, len: 190, seed: 31, delay: 0.2 },
  { side: 'r', x: 44, len: 120, seed: 17, delay: 0.4 },
  { side: 'r', x: 72, len: 70, seed: 41, delay: 0.6 },
];

export default function Hero({ opened }) {
  const state = opened ? 'show' : 'hidden';
  return (
    <section className="hero" aria-label="Invitation">
      <div className="hero-garlands" aria-hidden>
        {STRANDS.map((s, i) => (
          <motion.div
            key={i}
            className="garland-drop"
            style={{ [s.side === 'l' ? 'left' : 'right']: s.x }}
            initial={{ y: -260 }}
            animate={{ y: opened ? 0 : -260 }}
            transition={{ type: 'spring', stiffness: 55, damping: 11, delay: s.delay + 0.2 }}
          >
            <Garland length={s.len} seed={s.seed} className="garland-sway" style={{ animationDelay: `${-i * 0.8}s` }} />
          </motion.div>
        ))}
      </div>

      <div className="hero-frame">
        <CornerFlourish className="c-tl" />
        <CornerFlourish className="c-tr" flip="flip-x" />
        <CornerFlourish className="c-bl" flip="flip-y" />
        <CornerFlourish className="c-br" flip="flip-xy" />
      </div>

      <motion.div initial="hidden" animate={state} className="hero-inner">
        <motion.div variants={fade(0.2)} className="hero-emblem">{opened && <Emblem />}</motion.div>
        <motion.p variants={fade(0.5)} className="sloka" lang="te">{BLESSING_TELUGU}</motion.p>

        <motion.div variants={fade(0.7)} className="occasion">
          <span className="occasion-te" lang="te">{OCCASION.telugu}</span>
          <span className="occasion-script">{OCCASION.script}</span>
          <span className="eyebrow">{OCCASION.english}</span>
        </motion.div>

        <motion.p variants={fade(0.95)} className="invite-line">
          With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the engagement of
        </motion.p>

        <div className="hero-names">
          <motion.div initial="hidden" animate={state} variants={container}><Name text={COUPLE.groom} /></motion.div>
          {COUPLE.groomTelugu && <motion.div variants={fade(1.6)} className="name-te" lang="te">{COUPLE.groomTelugu}</motion.div>}
          <motion.div variants={fade(1.8)} className="amp">&amp;</motion.div>
          <motion.div initial="hidden" animate={state} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 2.0 } } }}><Name text={COUPLE.bride} /></motion.div>
          {COUPLE.brideTelugu && <motion.div variants={fade(2.8)} className="name-te" lang="te">{COUPLE.brideTelugu}</motion.div>}
        </div>

        <motion.p variants={fade(3.0)} className="parents">
          Son of {COUPLE.groomParents}
          <span className="dot">✦</span>
          Daughter of {COUPLE.brideParents}
        </motion.p>
      </motion.div>

      <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: opened ? 1 : 0 }} transition={{ delay: 3.5, duration: 1 }}>
        <span>Scroll to continue</span>
        <ArrowDown className="bob" />
      </motion.div>
    </section>
  );
}
