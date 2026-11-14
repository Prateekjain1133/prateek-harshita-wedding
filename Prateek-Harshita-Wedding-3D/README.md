# Prateek & Harshita — Royal Jain Wedding Website (v2, 3D redesign)

React + Vite + Tailwind + Framer Motion + **Three.js**.

## What's new in this version
- **3D palace doors** entrance — guests choose "Enter with music" or "Enter silently"; the doors swing open in 3D.
- **Real 3D lotus** (Three.js) in the hero that blooms open when the doors open, with golden dust and drifting marigold petals. Tilts with the mouse.
- **3D tilt cards** (couple arch + groom/bride) with a moving glare.
- **Flip-card schedule** — tap a date coin and the day card flips in 3D.
- **Flip-clock countdown**.
- **3D coverflow gallery** — swipe, drag, arrows, or auto-advance; tap the centre photo for full-screen.
- New royal palette: deep maroon + emerald + antique gold + ivory. Rangoli mandala backgrounds, scalloped arch edge.
- Photos compressed from ~55 MB to ~2 MB (originals are untouched in your ZIP).
- Fixed: footer / invitation lines that were reading missing config values (`family`, `closing.line1`, `closing.line2`).

## Run
```bash
npm install
npm run dev
npm run build
```

## Edit content
Everything (names, dates, venue, schedule, story, photos) is in `src/config.js`.
Open the site with `?edit` at the end of the URL to preview-upload photos on your device.
