import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from './Reveal';
import { petals } from '../lib/petals';
import { COUPLE, COUPLE_PHOTO as CP } from '../config';

const HEART = 'M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11Z';
const STAR = 'M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z';
const STARS = [['-4%', '14%', 0], ['96%', '10%', 0.9], ['102%', '52%', 1.7], ['-8%', '62%', 2.3], ['10%', '98%', 0.5], ['92%', '96%', 1.3]];
const EASE = [0.65, 0, 0.25, 1];

function Halo() {
  return (
    <svg viewBox="-100 -100 200 200" className="cp-halo" aria-hidden>
      <g fill="none" stroke="#B8924A" strokeWidth=".7">
        <circle r="96" strokeDasharray="1 6" strokeLinecap="round" />
        <circle r="80" opacity=".5" />
        {[...Array(16)].map((_, i) => (
          <path key={i} d="M0 -96 l3 4.5 l-3 4.5 l-3 -4.5Z" fill="#B8924A" fillOpacity={i % 2 ? 0.3 : 0.85} transform={`rotate(${i * 22.5})`} />
        ))}
      </g>
    </svg>
  );
}

export default function CouplePhoto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [hearts, setHearts] = useState([]);

  const love = (e) => {
    const r = ref.current.getBoundingClientRect();
    const batch = [0, 1, 2].map((h) => ({ id: Math.random(), h, x: e.clientX - r.left + (h - 1) * 16, y: e.clientY - r.top - 8 }));
    setHearts((a) => [...a, ...batch]);
    petals.sparkle(e.clientX, e.clientY, 8, true);
    navigator.vibrate?.(10);
    setTimeout(() => setHearts((a) => a.filter((x) => !batch.includes(x))), 1700);
  };

  return (
    <section className="section couple" id="couple">
      <Reveal className="head">
        <span className="eyebrow">{CP.eyebrow}</span>
      </Reveal>

      <div className="cp-wrap" ref={ref}>
        <Halo />
        <div className="cp-float">
          <div className="cp-arch" onClick={love} role="img" aria-label={CP.alt}>
            <svg className="cp-lines" viewBox="0 0 300 380" aria-hidden>
              <motion.path className="o" d="M1 379 V150 A149 149 0 0 1 299 150 V379" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.9, ease: EASE }} />
              <motion.path className="i" d="M7 379 V150 A143 143 0 0 1 293 150 V379" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.9, delay: 0.25, ease: EASE }} />
            </svg>

            <div className="cp-window">
              <motion.div
                style={{ position: 'absolute', inset: 0 }}
                initial={{ scale: 1.4, filter: 'blur(8px)' }}
                animate={inView ? { scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 2.6, delay: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <img src={CP.src} alt="" draggable={false} style={{ objectPosition: CP.pos }} />
              </motion.div>
              <i className="cp-sheen" aria-hidden />
              <motion.i className="cp-cur l" initial={{ x: '0%' }} animate={inView ? { x: '-102%' } : {}} transition={{ duration: 1.7, delay: 1.2, ease: EASE }} />
              <motion.i className="cp-cur r" initial={{ x: '0%' }} animate={inView ? { x: '102%' } : {}} transition={{ duration: 1.7, delay: 1.2, ease: EASE }} />
            </div>

            {STARS.map(([l, t, d], i) => (
              <svg key={i} className="cp-star" viewBox="-12 -12 24 24" style={{ left: l, top: t, animationDelay: `${d + 2.4}s` }} aria-hidden><path d={STAR} /></svg>
            ))}
          </div>
          {hearts.map((h) => (
            <motion.svg
              key={h.id} viewBox="0 0 24 24" className="cp-heart" style={{ left: h.x - 13, top: h.y - 13 }} aria-hidden
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.25, 1, 0.9], y: -120 - h.h * 28, x: (h.h - 1) * 26 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
            >
              <path d={HEART} fill={['#7a8fbf', '#3e5da5', '#abbbe1'][h.h]} />
            </motion.svg>
          ))}
        </div>
      </div>

      <Reveal className="cp-cap" delay={0.15}>
        <span className="cp-names">{COUPLE.groom}<em>&amp;</em>{COUPLE.bride}</span>
        <span className="cp-note"><svg viewBox="0 0 24 24" aria-hidden><path d={HEART} /></svg>{CP.note}</span>
      </Reveal>
      <p className="cp-hint">{CP.hint}</p>
    </section>
  );
}
