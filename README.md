# WORDVERSE 🌌

> **"Wait… WTF. This is Wordle?!"**  
> *Guess the word. Watch the world change.*

[![Live Game](https://img.shields.io/badge/Live_Game-playwordverse.vercel.app-10b981?style=for-the-badge&logo=vercel)](https://playwordverse.vercel.app)
[![3D Showcase](https://img.shields.io/badge/3D_Showcase-wordverse3d.vercel.app-38bdf8?style=for-the-badge&logo=three.js)](https://wordverse3d.vercel.app)
[![Vercel](https://img.shields.io/badge/Production-thewordverse.vercel.app-8b5cf6?style=for-the-badge&logo=vercel)](https://thewordverse.vercel.app)

**WORDVERSE** is a transformative, cinematic 3D word deduction experience where **the 3D world IS the feedback system**. Each 5-letter guess physically influences a floating celestial diorama floating in the cosmic void with custom WebGL particle systems, 3D architecture, dynamic lighting, procedural audio synthesis, and narrative feedback.

---

## ✨ Features

- **🌍 52+ Living World Reactions Engine:**
  - **Elemental Forces:** Braziers (`FIRE`), Rainstorms (`RAIN`), Snow Blizzards (`SNOW`), Plasma Lightning (`SHOCK`), Gale Vortices (`WIND`), Seismic Shifts (`QUAKE`), Magma Eruptions (`VOLCANO`), Toxic Miasma (`TOXIC`), Sandstorms (`SAND`), and Geysers (`STEAM`).
  - **Celestial & Cosmic:** Lunar Crescents (`MOON`), Solar Flares (`SUN`), Aurora Borealis (`AURORA`), Meteor Showers (`METEOR`), Gravitational Singularities (`BLACK`), Planetary Rings (`RINGS`), Supernovas (`SUPER`), and Pulsars (`PULSAR`).
  - **Flora & Fauna:** Verdant Bonsai (`TREE`), Sakura Rain (`SAKURA`), Spirit Butterflies (`FLIES`), Bioluminescent Spores (`SPORE`), Tidal Swells (`WAVE`), Coral Spires (`CORAL`), and Crystal Clusters (`CRYSTAL`).
  - **Magic & Mythos:** Runic Mandalas (`RUNES`), Spectral Wisps (`GHOST`), Midas Gold (`GOLD`), Interdimensional Portals (`PORTAL`), Chronos Gearwork (`TIME`), and Rainbows (`RAINBOW`).
  - **Sci-Fi & Cyber:** Matrix Data Streams (`MATRIX`), Reality Glitches (`GLITCH`), Laser Arrays (`LASER`), Aegis Shields (`SHIELD`), and Synthwave Neon (`RETRO`).
  - **Abstract & Emotion:** Heart Harmony (`LOVE`), Musical Cadence (`MUSIC`), Chaos Distortion (`CHAOS`), and Zen Ponds (`PEACE`).

- **⚡ Real-Time Typing Audio-Visual VFX:**
  - Procedural branching SVG lightning bolts and camera rumble when typing high-voltage words like `SHOCK` or `LIGHT`.
  - Screen shake, dynamic point-light flashes in 3D space, and synthesized thunder/soundscapes.

- **📅 Timezone-Aware Daily Puzzle Engine:**
  - Day 1 started on **September 7, 2026**.
  - Automatically rolls over to the next day puzzle at midnight in the player's local timezone.
  - Persistent streak tracking, guess statistics, and shareable Wordle emoji grid copy.

- **🎮 Practice Mode:**
  - Infinite playable practice words with reactive badges and live discovery tips.

- **🌌 My Wordverse Galaxy:**
  - An interactive 3D solar system where every solved world is immortalized in celestial orbit.
  - Interactive camera orbit, world inspection cards, and explorer ranks.

- **📱 Fully Mobile & Touch Optimized:**
  - Dynamic 3D camera elevation and grid scaling on mobile portrait screens.
  - Edge-to-edge docked virtual keyboard with `env(safe-area-inset-bottom)` support.
  - Smooth bottom-sheet modals with momentum scrolling.

---

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **3D Graphics & WebGL:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Styling:** Tailwind CSS + Vanilla CSS (Glassmorphism & Safe-Area Insets)
- **Audio:** Web Audio API Procedural Synthesizer (No external asset lag)
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/hiimanshu19x/wordverse.git
cd wordverse

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Live Deployments

- **Game:** [playwordverse.vercel.app](https://playwordverse.vercel.app)
- **3D Experience:** [wordverse3d.vercel.app](https://wordverse3d.vercel.app)
- **Production Alias:** [thewordverse.vercel.app](https://thewordverse.vercel.app)

---

## 📄 License
MIT License. Created by [hiimanshu19x](https://github.com/hiimanshu19x).
