> Groom's-side edition: the groom (Nayan) and his parents are listed first everywhere; colour theme is midnight navy + gold.

# Nayan & Yamini — Interactive Engagement Invitation (Groom's side)

React + Vite + Framer Motion. Mobile-first (max 430px, centred on desktop). Hand-written CSS, fonts bundled locally (works offline).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## What's different from the wedding invitation
- **Opening:** a closed embossed envelope with a gold wax seal and the "Engagement Invitation" heading — tap → the seal breaks → the top flap folds back → the card slides out and melts into the invitation. Heading text is `INTRO` in `src/config.js`.
- **Look:** midnight navy, antique gold and ivory, script "Nischitartham" title, hanging jasmine garlands.
- **Particles:** jasmine flowers, rose petals, diamond sparkles and tiny hearts instead of marigold petals.
- **Ring Ceremony section:** two rings glide together and interlock as you scroll, a date/time ticket, and an **Add to calendar** button (.ics).
- **No festivities section** — engagements have none. Venue is the same as the wedding.

## ⚠ Set the real date — edit `src/config.js`
`ENGAGEMENT_DATE` (drives the countdown and the calendar file), plus the matching display text in
`SAVE_THE_DATE` (scratch cards) and `DETAILS` (weekday / long date / time).
**The date in the file (Sunday 22 Nov 2026, 11:00 AM) is a placeholder.**

Everything else personal is in `src/config.js` too: names (and optional Telugu spellings), parents,
venue + maps link, Telugu invitation text, music.

**Link preview (WhatsApp / Instagram):** set `SITE_URL` in `vite.config.js` to your deployed address.
`public/og-image.jpg` is the preview image (1200×630).

**Photos / music:** venue photo → put it in `public/photos/` and set `PHOTOS.venue.src` in config.
Music is `public/music/ReelAudio-38076.mp3` (same track as the wedding site; swap freely).

## Structure
```
src/
  App.jsx                    scroll flow + global state
  config.js                  all content
  lib/petals.js              canvas jasmine / petal / sparkle / heart engine
  lib/art.jsx                Ganesha emblem, interlocking rings, jasmine garland, ornaments, venue art
  components/
    Envelope.jsx             the envelope opening animation
    Hero.jsx                 blessing, "Nischitartham", staggered 3D letter reveal of the names
    SaveTheDate.jsx + ScratchCard.jsx   scratch-to-reveal date → confetti → auto-scroll
    Countdown.jsx            live countdown to the engagement
    Ceremony.jsx             scroll-linked rings, Telugu invitation, date ticket, add-to-calendar
    Venue.jsx  Footer.jsx  MusicPlayer.jsx  FloatingPetals.jsx  ScrollThread.jsx  Reveal.jsx
```
