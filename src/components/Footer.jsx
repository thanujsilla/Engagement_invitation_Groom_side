import { motion } from 'framer-motion';
import { COUPLE } from '../config';

const line = (d) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(5px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 1.1, delay: d, ease: [0.22, 0.8, 0.24, 1] },
});

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave" aria-hidden />
      <div className="foot-sparkles" aria-hidden>{[...Array(14)].map((_, i) => <i key={i} style={{ left: `${(i * 29 + 7) % 96}%`, top: `${(i * 41) % 90}%`, animationDelay: `${(i % 6) * 0.5}s` }} />)}</div>
      <motion.p className="foot-quote" {...line(0)}>
        Two hearts, one promise — and a lifetime of love to begin.
      </motion.p>
      <motion.p className="foot-quote sm" {...line(0.2)}>
        Your blessings will make our beginning complete.
      </motion.p>
      <motion.div className="foot-rule" {...line(0.35)}><i>✦</i></motion.div>
      <motion.p className="foot-with" {...line(0.45)}>With love &amp; blessings</motion.p>
      <motion.p className="foot-fam" {...line(0.55)}>
        {COUPLE.groomParents}<br />{COUPLE.brideParents}
      </motion.p>
      <motion.h3 className="foot-names" {...line(0.7)}><span className="nw">{COUPLE.groom} <em>&amp;</em></span> <span className="nw">{COUPLE.bride}</span></motion.h3>
      <motion.p className="foot-craft" {...line(0.9)}> <span className="heartbeat">♥</span> </motion.p>
    </footer>
  );
}
