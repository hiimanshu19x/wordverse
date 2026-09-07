import type { DailyPuzzle, WorldBiome } from '../types/game.ts';
import { CURATED_5_LETTER_WORDS } from './wordList.ts';

const BIOMES: Array<{
  biome: WorldBiome;
  title: string;
  quote: string;
}> = [
  {
    biome: 'celestial',
    title: 'Celestial Sanctuary',
    quote: 'Where starlight weaves the fabric of ancient monoliths.'
  },
  {
    biome: 'observatory',
    title: 'Sunken Observatory',
    quote: 'Timeless astrolabes charting the secret paths of the cosmos.'
  },
  {
    biome: 'crystal',
    title: 'Crystal Grove',
    quote: 'Prismatic spires resonating with forgotten harmonies.'
  },
  {
    biome: 'citadel',
    title: 'Aeon Citadel',
    quote: 'Levitating pyramids of basalt forged in celestial fire.'
  },
  {
    biome: 'oasis',
    title: 'Verdant Oasis',
    quote: 'Tranquil waters reflecting the perpetual glow of distant suns.'
  }
];

const RIDDLES_MAP: Record<string, string> = {
  PLANET: 'A solitary sphere wandering in cosmic silence around a golden star.',
  OASIS: 'A hidden sanctuary of liquid emerald amidst endless barren dunes.',
  PRISM: 'A faceted crystal that scatters pure starlight into iridescent hues.',
  BLOOM: 'The quiet explosion of vibrant petals awakening under dawn.',
  SOLAR: 'Radiance born of atomic fire, breathing life into cold worlds.',
  AURORA: 'Ribbons of incandescent emerald dancing across the polar sky.',
  EMBER: 'A sleeping spark of memory cradled in warm dark ashes.',
  CHORD: 'Harmonies entwined in vibration, resolving into peace.',
  STONE: 'Silent memory of mountains, weathered by a million tides.',
  SPARK: 'A momentary flash of genesis igniting the infinite dark.',
  HAVEN: 'A tranquil shelter from the relentless storms of the cosmos.',
  CLOUD: 'Vaporous wanderers floating between the earth and the heavens.',
  OCEAN: 'An abyss of rhythmic depths echoing the pulse of the tides.',
  VORTEX: 'A spiraling dance of celestial gravity drawing all things near.',
  SHORE: 'The sacred boundary where relentless waves kiss the eternal land.',
  REALM: 'A kingdom of stone and starlight held together by ancient runes.',
  FROST: 'Delicate crystalline filigree spun by the quiet touch of cold.',
  FLAME: 'The living spirit of fire that dances and transforms in shadow.'
};

export function getWordRiddle(word: string): string {
  const upper = word.toUpperCase();
  if (RIDDLES_MAP[upper]) {
    return RIDDLES_MAP[upper];
  }
  return `A 5-letter harmonic frequency beginning with "${upper[0]}" and resting on "${upper[upper.length - 1]}".`;
}

// Reference launch date: September 7, 2026 (Launch Date = Day 1)
const REFERENCE_EPOCH = new Date(2026, 8, 7).getTime(); // Month 8 is September (0-indexed)
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function getDayNumber(date: Date = new Date()): number {
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diff = Math.floor((current - REFERENCE_EPOCH) / MS_PER_DAY);
  return Math.max(1, diff + 1);
}

export function formatDateStr(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
}

/**
 * Returns the deterministic daily puzzle for a specific date
 */
export function getDailyPuzzle(date: Date = new Date()): DailyPuzzle {
  const dayNumber = getDayNumber(date);
  const dateStr = formatDateStr(date);

  // Deterministic index into words
  const wordIndex = ((dayNumber - 1) * 73 + 19) % CURATED_5_LETTER_WORDS.length;
  const word = CURATED_5_LETTER_WORDS[wordIndex].toUpperCase();

  // Deterministic biome
  const biomeIndex = (dayNumber - 1) % BIOMES.length;
  const theme = BIOMES[biomeIndex];

  return {
    dayNumber,
    dateStr,
    word,
    biome: theme.biome,
    themeTitle: theme.title,
    quote: theme.quote,
    riddle: getWordRiddle(word),
    isPractice: false
  };
}

/**
 * Generates a randomized practice puzzle
 */
export function getPracticePuzzle(): DailyPuzzle {
  const randomSeed = Math.floor(Math.random() * 100000);
  const wordIndex = Math.floor(Math.random() * CURATED_5_LETTER_WORDS.length);
  const word = CURATED_5_LETTER_WORDS[wordIndex].toUpperCase();
  const biomeIndex = Math.floor(Math.random() * BIOMES.length);
  const theme = BIOMES[biomeIndex];

  return {
    dayNumber: (randomSeed % 900) + 100,
    dateStr: 'PRACTICE WORLD',
    word,
    biome: theme.biome,
    themeTitle: theme.title,
    quote: theme.quote,
    riddle: getWordRiddle(word),
    isPractice: true
  };
}

/**
 * Calculates remaining hours, minutes, seconds until next daily midnight refresh
 */
export function getTimeUntilNextPuzzle(): { hours: number; minutes: number; seconds: number; formatted: string } {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diffMs = midnight.getTime() - now.getTime();

  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  return {
    hours,
    minutes,
    seconds,
    formatted: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  };
}

