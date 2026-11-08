// ─────────────────────────────────────────────────────────────
//  Everything personal lives here. Edit this file, not the components.
// ─────────────────────────────────────────────────────────────

export const COUPLE = {
  bride: 'Yamini',
  groom: 'Nayan',
  // Optional Telugu spellings shown beneath the names (set to '' to hide)
  brideTelugu: 'యామిని',
  groomTelugu: 'నయన్',
  brideParents: 'Ravi Kumar & Nagamani',
  groomParents: 'Dr.Lokanath Raju & Madhavi', // ← replace ABCDEF with the real name
};

// Telugu blessing shown at the top of the invitation
export const BLESSING_TELUGU = 'శ్రీ గణేశాయ నమః';

// "Nischitartham" = engagement ceremony
export const OCCASION = {
  telugu: 'నిశ్చితార్థం',
  script: 'Nischitartham',
  english: 'Engagement Ceremony',
  teluguInvite:
    'నిశ్చితార్థ వేడుక అనే శుభ సందర్భంలో మీరు మీ కుటుంబ సభ్యులు మరియు మిత్రులతో కలిసి విచ్చేసి మమ్మల్ని ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.',
  englishInvite:
    'On this auspicious occasion of our engagement, we warmly invite you, with your family and friends, to bless us with your gracious presence.',
};

// Heading shown on the opening (envelope) screen
export const INTRO = { telugu: 'నిశ్చితార్థ ఆహ్వానం', english: 'Engagement Invitation' };

// Ganesh photo: public/images/ganesh.png. If it's missing, a hand-drawn Ganesha is shown instead.
export const GANESH = { src: './images/ganesh.png' };

// ▼▼ EDIT: engagement date & time (IST).  ISO format: YYYY-MM-DDTHH:MM:00+05:30
// NOTE: this is a placeholder date — please set the real one.
export const ENGAGEMENT_DATE = new Date('2026-11-25T11:00:00+05:30');

// Text shown on the scratch cards / details (keep in sync with ENGAGEMENT_DATE above)
export const SAVE_THE_DATE = {
  month: 'NOVEMBER',
  day: '25',
  year: '2026',
  caption: 'Wednesday · the twenty-fifth of November',
};

export const DETAILS = {
  weekday: 'Wednesday',
  dateLong: '25 November 2026',
  time: '9:00 AM',
  // Used by the "Add to calendar" button
  durationHours: 3,
};

// Venue
export const VENUE = {
  name: 'Anandamayi Function Hall',
  address: ['Mill Junction , 80 Feet Road , Arasavilli , Srikakulam'],
  // What Google Maps should search for (used for the embedded map, "View on maps" and "Get directions")
  mapQuery: 'Anandamayi convention hall, mill junction, 80 Feet Rd, Arasavilli, Srikakulam, Andhra Pradesh 532001',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Anandamayi convention hall, mill junction, 80 Feet Rd, Arasavilli, Srikakulam, Andhra Pradesh 532001'),
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Anandamayi convention hall, mill junction, 80 Feet Rd, Arasavilli, Srikakulam, Andhra Pradesh 532001'),
};

// Replace `src: null` with e.g. './photos/venue.jpg' (put files in /public/photos)
export const PHOTOS = { venue: { src: null } };

// Background music. Put your file at public/music/ (or change src).
// If the file is missing, the music button simply doesn't appear.
export const MUSIC = { src: './music/WhatsApp Audio 2026-11-04 at 5.14.21 PM (1).mp3', volume: 0.85, fadeMs: 2500 };

// The couple portrait section. Photo lives in public/photos (replace couple.jpg, or point src elsewhere).
// pos = CSS object-position used to crop the photo into the arch.
export const COUPLE_PHOTO = {
  src: './photos/e5f3de7e-d936-4b99-94e5-81b0f84309c8.png',
  alt: 'Nayan and Yamini',
  pos: '50% 22%',
  eyebrow: 'Two hearts · One journey',
  note: 'a new journey begins',
  hint: 'tap the portrait · send a little love',
};
