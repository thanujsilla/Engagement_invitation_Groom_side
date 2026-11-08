import { useState } from 'react';
import { motion } from 'framer-motion';
import { GANESH } from '../config';

/* ───────── Ornaments ───────── */

function GaneshDrawing() {
  const line = { fill: 'none', stroke: '#6a3b2a', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg viewBox="0 0 100 118" className="ganesh-svg" role="img" aria-label="Lord Ganesha">
      <defs>
        <radialGradient id="gnHalo" cx="50%" cy="38%" r="55%"><stop offset="0" stopColor="#fff2c4" /><stop offset="1" stopColor="#f1dfbf" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="100" height="118" fill="url(#gnHalo)" />
      <circle cx="50" cy="44" r="34" fill="none" stroke="#c9a04a" strokeWidth=".8" strokeDasharray="1.5 2.5" />
      {/* ears */}
      <path d="M36 38 C14 26 6 52 20 66 C28 70 34 60 36 52Z" fill="#f0c98f" {...line} />
      <path d="M64 38 C86 26 94 52 80 66 C72 70 66 60 64 52Z" fill="#f0c98f" {...line} />
      {/* body */}
      <path d="M26 118 C26 92 36 82 50 82 C64 82 74 92 74 118Z" fill="#e9a35f" {...line} />
      <circle cx="50" cy="100" r="14" fill="#f0b46d" {...line} />
      <path d="M36 88 Q50 98 64 88" {...line} stroke="#c9a04a" strokeWidth="1.8" />
      {/* head */}
      <ellipse cx="50" cy="46" rx="17" ry="19" fill="#f0b46d" {...line} />
      {/* crown */}
      <path d="M34 34 L38 18 L44 26 L50 8 L56 26 L62 18 L66 34 C58 28 42 28 34 34Z" fill="#e3b94f" stroke="#8a5a14" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="50" cy="20" r="2.2" fill="#4969b3" /><circle cx="42" cy="28" r="1.5" fill="#4969b3" /><circle cx="58" cy="28" r="1.5" fill="#4969b3" />
      {/* face */}
      <path d="M50 36 V44" stroke="#4969b3" strokeWidth="2" strokeLinecap="round" />
      <path d="M41 45 q3 -3 6 0 M53 45 q3 -3 6 0" {...line} />
      {/* trunk */}
      <path d="M50 50 C50 64 49 74 42 82 C37 87 31 82 36 77 C39 74 42 77 40 80" {...line} strokeWidth="7" stroke="#e9a35f" />
      <path d="M50 50 C50 64 49 74 42 82 C37 87 31 82 36 77 C39 74 42 77 40 80" {...line} strokeWidth="1.2" />
      {/* tusk */}
      <path d="M57 58 C62 62 62 68 58 72" {...line} stroke="#fff6e4" strokeWidth="3.4" />
      {/* lotus seat */}
      {[-24, -12, 0, 12, 24].map((x, i) => (<path key={i} d={`M${50 + x} 118 q${-5} -8 0 -14 q5 6 0 14Z`} fill="#bfcded" stroke="#4f6aa8" strokeWidth=".8" />))}
    </svg>
  );
}

export function Emblem() {
  const [broken, setBroken] = useState(false);
  return (
    <motion.div className="ganesh" initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.22, 0.8, 0.24, 1] }}>
      <span className="ganesh-halo" aria-hidden />
      <div className="ganesh-frame">
        {!broken ? (
          <img className="ganesh-img" src={GANESH.src} alt="Lord Ganesha" onError={() => setBroken(true)} />
        ) : (
          <GaneshDrawing />
        )}
      </div>
    </motion.div>
  );
}

export function Divider({ width = 190 }) {
  return (
    <svg viewBox="0 0 200 20" width={width} height="20" className="divider" aria-hidden>
      <motion.path
        d="M2 10 H78 M122 10 H198"
        stroke="#B8924A"
        strokeWidth=".8"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 160, damping: 12 }}
        style={{ transformOrigin: '100px 10px' }}
      >
        <path d="M100 2 L104 10 L100 18 L96 10Z" fill="#B8924A" />
        <circle cx="88" cy="10" r="2" fill="none" stroke="#B8924A" strokeWidth=".8" />
        <circle cx="112" cy="10" r="2" fill="none" stroke="#B8924A" strokeWidth=".8" />
      </motion.g>
    </svg>
  );
}

export function CornerFlourish({ className = '', flip = '' }) {
  return (
    <svg viewBox="0 0 60 60" className={`corner ${className} ${flip}`} aria-hidden>
      <g fill="none" stroke="#B8924A" strokeWidth=".9" strokeLinecap="round">
        <path d="M2 58 V14 Q2 2 14 2 H58" />
        <path d="M8 58 V18 Q8 8 18 8 H58" opacity=".45" />
        <path d="M14 14 q8 0 8 8 q-8 0 -8 -8Z" fill="#B8924A" fillOpacity=".25" />
        <circle cx="26" cy="26" r="1.6" fill="#B8924A" />
      </g>
    </svg>
  );
}

/* ───────── Interlocking engagement rings ─────────
   `ax` / `bx` are optional framer-motion values (horizontal offsets) so the rings
   can glide together as the guest scrolls. */
export function RingsArt({ ax, bx, className = '' }) {
  return (
    <svg viewBox="0 0 220 140" className={`rings-art ${className}`} role="img" aria-label="Two interlocking engagement rings">
      <defs>
        <linearGradient id="rgGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e2a2" /><stop offset=".5" stopColor="#c99a43" /><stop offset="1" stopColor="#8a6218" />
        </linearGradient>
        <linearGradient id="rgRose" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdd8f2" /><stop offset=".5" stopColor="#93a4cd" /><stop offset="1" stopColor="#5d6d94" />
        </linearGradient>
        <radialGradient id="rgGlow"><stop offset="0" stopColor="#fff6d6" stopOpacity=".9" /><stop offset="1" stopColor="#fff6d6" stopOpacity="0" /></radialGradient>
        <clipPath id="rgClipA"><rect x="2" y="18" width="26" height="30" /></clipPath>
      </defs>
      <ellipse cx="110" cy="70" rx="104" ry="58" fill="url(#rgGlow)" opacity=".7" />

      {/* ring A (yellow gold) — drawn first */}
      <motion.g style={{ x: ax }}>
        <g transform="translate(96 78)">
          <circle r="36" fill="none" stroke="url(#rgGold)" strokeWidth="8" />
          <circle r="36" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="30 200" strokeDashoffset="-120" />
        </g>
      </motion.g>

      {/* ring B (rose gold) with the solitaire — over A at the top crossing */}
      <motion.g style={{ x: bx }}>
        <g transform="translate(124 78)">
          <circle r="36" fill="none" stroke="url(#rgRose)" strokeWidth="8" />
          <circle r="36" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="30 200" strokeDashoffset="-20" />
          <g transform="translate(0 -52)">
            <path d="M-11 -3 L-6 -12 H6 L11 -3 L0 12Z" fill="#f4fbff" stroke="#9fb8c4" strokeWidth=".8" strokeLinejoin="round" />
            <path d="M-11 -3 H11 M-6 -12 L-2.5 -3 L0 12 M6 -12 L2.5 -3 L0 12" fill="none" stroke="#9fb8c4" strokeWidth=".6" />
            <path d="M-6 -12 L-2.5 -3 H2.5 L6 -12Z" fill="#fff" opacity=".7" />
          </g>
        </g>
      </motion.g>

      {/* ring A again, clipped to the lower crossing, so A passes over B there: interlocked */}
      <motion.g style={{ x: ax }}>
        <g transform="translate(96 78)">
          <circle r="36" fill="none" stroke="url(#rgGold)" strokeWidth="8" clipPath="url(#rgClipA)" />
        </g>
      </motion.g>

      <g className="ring-glint" transform="translate(124 26)">
        <path d="M0 -14 Q1.500 -1.500 14 0 Q1.500 1.500 0 14 Q-1.500 1.500 -14 0 Q-1.500 -1.500 0 -14Z" fill="#fff" />
      </g>
      <g className="ring-glint g2" transform="translate(150 40)">
        <path d="M0 -7 Q.8 -.8 7 0 Q.8 .8 0 7 Q-.8 .8 -7 0 Q-.8 -.8 0 -7Z" fill="#fff" />
      </g>
    </svg>
  );
}

/* ───────── Hanging jasmine garland (mallepoolu) ───────── */
const rnd = (seed) => { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; };

export function Garland({ length = 200, seed = 7, className = '', style }) {
  const r = rnd(seed);
  const blooms = [];
  for (let y = 10; y < length - 18; y += 11 + r() * 5) {
    blooms.push({ y, dx: (r() - 0.5) * 5, s: 0.8 + r() * 0.5, rot: r() * 72, rose: r() > 0.86 });
  }
  return (
    <svg viewBox={`-16 0 32 ${length + 22}`} width="32" height={length + 22} className={`garland ${className}`} style={style} aria-hidden>
      <line x1="0" y1="0" x2="0" y2={length} stroke="#9c7a4a" strokeWidth=".9" />
      {blooms.map((b, i) => (
        <g key={i} transform={`translate(${b.dx} ${b.y}) rotate(${b.rot}) scale(${b.s})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-4.800" rx="2.700" ry="4.800" transform={`rotate(${a})`} fill={b.rose ? '#bdcbec' : '#fffdf6'} stroke={b.rose ? '#93a5d0' : '#e5d9bd'} strokeWidth=".35" />
          ))}
          <circle r="1.500" fill={b.rose ? '#6780bb' : '#f1d07b'} />
        </g>
      ))}
      <path d={`M0 ${length - 2} q-6 8 0 18 q6 -10 0 -18Z`} fill="#fffdf6" stroke="#e5d9bd" strokeWidth=".4" />
      <circle cx="0" cy={length + 18} r="2.600" fill="#d9b25a" />
    </svg>
  );
}

/* ───────── Photo placeholder (venue) ───────── */

export function Photo({ src, alt = '', kind = 'venue', className = '' }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={`photo-img ${className}`} />;
  return (
    <svg viewBox="0 0 344 200" preserveAspectRatio="xMidYMid slice" className={`photo-img ${className}`} role="img" aria-label={alt || 'Venue'}>
      <defs>
        <linearGradient id={`pg-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#182a55" /><stop offset=".55" stopColor="#606c89" /><stop offset="1" stopColor="#f0c4a0" />
        </linearGradient>
        <radialGradient id={`pv-${kind}`} cx="50%" cy="70%" r="55%"><stop offset="0" stopColor="#fff2c4" stopOpacity=".8" /><stop offset="1" stopColor="#fff2c4" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="344" height="200" fill={`url(#pg-${kind})`} />
      <rect width="344" height="200" fill={`url(#pv-${kind})`} />
      {[...Array(28)].map((_, i) => (
        <circle key={i} cx={(i * 47 + 9) % 344} cy={(i * 29) % 90} r={(i % 3) * 0.5 + 0.7} fill="#fff6d6" className="twinkle" style={{ animationDelay: `${(i % 7) * 0.35}s` }} />
      ))}
      {/* hall: a stepped gopuram-style facade with lit arches */}
      <path d="M52 200 V128 H292 V200Z" fill="#2d3a57" />
      <path d="M92 128 V104 H252 V128Z" fill="#384668" />
      <path d="M122 104 V82 H222 V104Z" fill="#435379" />
      <path d="M146 82 V64 H198 V82Z" fill="#52638a" />
      <path d="M160 64 V50 H184 V64Z" fill="#62739b" />
      <path d="M172 26 L180 50 H164Z" fill="#e3b94f" />
      <circle cx="172" cy="22" r="3.500" fill="#e3b94f" />
      {[72, 100, 128, 200, 228, 256].map((x, i) => (<path key={x} d={`M${x} 176 V150 Q${x + 8} 138 ${x + 16} 150 V176Z`} fill="#ffe6a8" className="twinkle" style={{ animationDelay: `${i * 0.3}s` }} />))}
      {[140, 156, 188, 204].map((x) => (<rect key={x} x={x} y="92" width="6" height="9" rx="3" fill="#ffe6a8" opacity=".85" />))}
      <path d="M152 200 V158 Q172 134 192 158 V200Z" fill="#12192a" />
      <path d="M152 158 Q172 134 192 158" fill="none" stroke="#e3b94f" strokeWidth="2" />
      {/* string lights */}
      <path d="M0 122 Q86 150 172 124 T344 122" fill="none" stroke="#e3b94f" strokeWidth="1" opacity=".75" />
      {[18, 62, 108, 172, 236, 282, 326].map((x, i) => (<circle key={x} cx={x} cy={130 + Math.sin(i * 1.3) * 7} r="3" fill="#ffe6a8" className="twinkle" style={{ animationDelay: `${i * 0.25}s` }} />))}
    </svg>
  );
}
