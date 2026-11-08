import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import { CornerFlourish, Divider } from '../lib/art';
import { DETAILS, ENGAGEMENT_DATE } from '../config';

function calc() {
  const diff = ENGAGEMENT_DATE.getTime() - Date.now();
  const past = diff <= 0;
  const s = Math.max(0, Math.floor(diff / 1000));
  return {
    past,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

function Rosette() {
  // a slow orbit of diamonds and a faceted star — "the ring" in motion
  return (
    <svg viewBox="-100 -100 200 200" className="rosette" aria-hidden>
      <g fill="none" stroke="#B8924A" strokeWidth=".8">
        <circle r="96" strokeDasharray="1 6" strokeLinecap="round" />
        <circle r="72" opacity=".55" />
        <circle r="48" strokeDasharray="2 5" opacity=".8" />
        {[...Array(12)].map((_, i) => (
          <path key={i} d="M0 -96 l3.5 5 l-3.5 5 l-3.5 -5Z" fill="#B8924A" fillOpacity={i % 3 ? 0.35 : 0.9} transform={`rotate(${i * 30})`} />
        ))}
        {[...Array(8)].map((_, i) => (
          <path key={i} d="M0 -72 Q4 -36 0 0 Q-4 -36 0 -72Z" opacity=".45" transform={`rotate(${i * 45})`} />
        ))}
      </g>
    </svg>
  );
}

function Digits({ value }) {
  const str = String(value).padStart(2, '0');
  return (
    <span className="cd-num" aria-hidden>
      {str.split('').map((ch, i) => (
        <span className="cd-digit" key={i}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch}
              initial={{ y: -16, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: 16, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

export default function Countdown() {
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [['Days', t.days], ['Hours', t.hours], ['Minutes', t.mins], ['Seconds', t.secs]];
  return (
    <section className="section countdown" id="countdown">
      <div className="rosette-wrap"><Rosette /></div>
      <Reveal className="head">
        <span className="eyebrow">Counting down to</span>
        <h2 className="display">Our Engagement</h2>
      </Reveal>

      <Reveal className="cd-grid" delay={0.15} role="timer" aria-label={`${t.days} days ${t.hours} hours ${t.mins} minutes ${t.secs} seconds`}>
        {units.map(([label, v], i) => (
          <motion.div
            key={label}
            className="cd-box"
            whileInView={{ y: [0, -6, 0] }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }}
          >
            <CornerFlourish className="cd-c" />
            <Digits value={v} />
            <span className="cd-label">{label}</span>
          </motion.div>
        ))}
      </Reveal>

      <Reveal delay={0.3} className="cd-note">
        <Divider width={150} />
        <p>{t.past ? 'The rings are exchanged — thank you for your blessings.' : `${DETAILS.weekday}, ${DETAILS.dateLong} · ${DETAILS.time}`}</p>
      </Reveal>
    </section>
  );
}
