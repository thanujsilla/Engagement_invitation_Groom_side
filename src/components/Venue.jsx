import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { MapPin } from '../lib/icons';
import { DETAILS, VENUE } from '../config';

const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(VENUE.mapQuery)}&z=16&hl=en&output=embed`;

// The map sits under a "tap to explore" cover so a thumb scrolling the page never gets trapped inside it.
function VenueMap() {
  const [live, setLive] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!live) return;
    const away = (e) => { if (!box.current?.contains(e.target)) setLive(false); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [live]);

  return (
    <div className="venue-map" ref={box}>
      <iframe title={`Map of ${VENUE.name}`} src={embedSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      {!live && (
        <button className="venue-map-cover" onClick={() => setLive(true)} aria-label="Tap to explore the map">
          <span><MapPin width="14" height="14" /> Tap to explore the map</span>
        </button>
      )}
    </div>
  );
}

export default function Venue() {
  return (
    <section className="section venue" id="venue">
      <Reveal className="head">
        <span className="eyebrow">Where you will bless us</span>
        <h2 className="display">The Venue</h2>
      </Reveal>

      <motion.article
        className="venue-card"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
      >
        <div className="venue-pic"><VenueMap /></div>
        <div className="venue-body">
          <h3>{VENUE.name}</h3>
          <p>{VENUE.address.map((l, i) => (<span key={i}>{l}<br /></span>))}</p>
          <p className="venue-when">{DETAILS.weekday} · {DETAILS.dateLong} · {DETAILS.time}</p>
          <a className="btn btn-emerald" href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin /> <span>View on maps</span>
          </a>
          <a className="venue-dir" href={VENUE.directionsUrl} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 3 3 10.5l7 3 3 7L21 3Z" /></svg>
            Get directions
          </a>
        </div>
      </motion.article>
    </section>
  );
}
