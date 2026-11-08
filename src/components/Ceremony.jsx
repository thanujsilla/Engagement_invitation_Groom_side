import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { Divider, RingsArt } from '../lib/art';
import { petals } from '../lib/petals';
import { COUPLE, DETAILS, ENGAGEMENT_DATE, OCCASION, VENUE } from '../config';

const pad = (n) => String(n).padStart(2, '0');
const icsStamp = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
const esc = (s) => s.replace(/([,;])/g, '\\$1');

const EVENT = () => {
  const end = new Date(ENGAGEMENT_DATE.getTime() + DETAILS.durationHours * 3600 * 1000);
  return {
    end,
    title: `Engagement of ${COUPLE.groom} & ${COUPLE.bride}`,
    where: `${VENUE.name}, ${VENUE.address[0]}`,
    about: `Nischitartham — please join us and bless the couple.\nMap: ${VENUE.mapsUrl}`,
  };
};

// Opens Google Calendar's "add event" page (works in any browser; opens the Calendar app on most Androids).
function openGoogleCalendar() {
  const ev = EVENT();
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${icsStamp(ENGAGEMENT_DATE)}/${icsStamp(ev.end)}`,
    details: ev.about,
    location: ev.where,
    ctz: 'Asia/Kolkata',
  });
  window.open(`https://calendar.google.com/calendar/render?${q}`, '_blank', 'noopener');
}

// .ics for Apple Calendar / Outlook. iPhones open it as an "Add to Calendar" sheet; elsewhere it downloads and opens in the calendar app.
function addIcs() {
  const ev = EVENT();
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Engagement Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:engagement-${icsStamp(ENGAGEMENT_DATE)}@invitation`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(ENGAGEMENT_DATE)}`,
    `DTEND:${icsStamp(ev.end)}`,
    `SUMMARY:${esc(ev.title)}`,
    `LOCATION:${esc(ev.where)}`,
    `DESCRIPTION:${esc(ev.about).replace(/\n/g, '\\n')}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Engagement tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios) {
    window.location.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
    return;
  }
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'engagement-invitation.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export default function Ceremony() {
  const ref = useRef(null);
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef(null);
  useEffect(() => {
    if (!calOpen) return;
    const away = (e) => { if (!calRef.current?.contains(e.target)) setCalOpen(false); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [calOpen]);
  const pick = (fn) => (e) => {
    fn();
    const r = e.currentTarget.getBoundingClientRect();
    petals.sparkle(r.left + r.width / 2, r.top + r.height / 2, 12, true);
    setCalOpen(false);
  };
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.25'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 });
  const ax = useTransform(p, [0, 1], [-72, 0]);
  const bx = useTransform(p, [0, 1], [72, 0]);
  const scale = useTransform(p, [0, 0.85, 1], [0.86, 1, 1.06]);
  const glow = useTransform(p, [0.8, 1], [0, 1]);
  const stage = useRef(null);
  const fired = useRef(false);

  // when the rings lock together, throw a little light
  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.97 && !fired.current && stage.current) {
      fired.current = true;
      const r = stage.current.getBoundingClientRect();
      petals.sparkle(r.left + r.width * 0.56, r.top + r.height * 0.28, 16, true);
      petals.burst({ count: 28, x: r.left + r.width / 2, y: r.top + r.height * 0.5, spread: 0.6 });
    }
  });

  return (
    <section className="section ceremony" id="ceremony" ref={ref}>
      <Reveal className="head">
        <span className="eyebrow">Together with their families</span>
        <h2 className="display">The Ring<br />Ceremony</h2>
      </Reveal>

      <motion.div className="rings-stage" style={{ scale }} ref={stage}>
        <motion.span className="rings-flare" style={{ opacity: glow }} aria-hidden />
        <RingsArt ax={ax} bx={bx} />
      </motion.div>

      <Reveal className="invite-te-wrap" delay={0.1}>
        <p className="invite-te" lang="te">{OCCASION.teluguInvite}</p>
        <Divider width={150} />
        <p className="invite-en">{OCCASION.englishInvite}</p>
      </Reveal>

      <Reveal className="ticket" delay={0.1} blur={false}>
        <span className="notch n-l" aria-hidden /><span className="notch n-r" aria-hidden />
        <div className="ticket-col">
          <span className="eyebrow sm">Day</span>
          <strong>{DETAILS.weekday}</strong>
        </div>
        <div className="ticket-mid">
          <span className="eyebrow sm">Date</span>
          <b>{DETAILS.dateLong.split(' ')[0]}</b>
          <em>{DETAILS.dateLong.split(' ').slice(1).join(' ')}</em>
        </div>
        <div className="ticket-col">
          <span className="eyebrow sm">Time</span>
          <strong>{DETAILS.time}</strong>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="cal-row">
        <div ref={calRef} className="cal-box">
          <button className="btn btn-emerald" aria-expanded={calOpen} onClick={() => setCalOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3.500" y="5" width="17" height="15" rx="2.500" /><path d="M3.500 10h17M8 3v4M16 3v4M12 13.500v3M10.500 15h3" />
            </svg>
            <span>Add to calendar</span>
          </button>
          <AnimatePresence>
            {calOpen && (
              <motion.div
                className="cal-menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.28, ease: [0.22, 0.8, 0.24, 1] }}
              >
                <button className="cal-opt" onClick={pick(openGoogleCalendar)}>
                  <b>Google Calendar</b><small>Android · Gmail · any browser</small>
                </button>
                <button className="cal-opt" onClick={pick(addIcs)}>
                  <b>Apple / Outlook</b><small>iPhone · Mac · Outlook (.ics)</small>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
