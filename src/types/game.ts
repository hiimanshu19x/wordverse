export type LetterStatus = 'empty' | 'pending' | 'correct' | 'misplaced' | 'absent';

export interface LetterFeedback {
  letter: string;
  status: LetterStatus;
}

export type GameStatus = 'in_progress' | 'won' | 'lost';

export type CameraMode = 'intro' | 'play' | 'submit' | 'won' | 'explore' | 'galaxy';

export type WorldBiome = 'celestial' | 'observatory' | 'crystal' | 'citadel' | 'oasis';

export interface DailyPuzzle {
  dayNumber: number;
  dateStr: string;
  word: string;
  biome: WorldBiome;
  themeTitle: string;
  quote: string;
  riddle: string;
  isPractice?: boolean;
}

export interface SolvedWorld {
  id: string;
  dayNumber: number;
  word: string;
  dateStr: string;
  guessesCount: number;
  timeSeconds: number;
  biome: WorldBiome;
  themeTitle: string;
}

export interface GuessRowData {
  letters: string[];
  evaluations: LetterStatus[] | null;
  isSubmitted: boolean;
}

export interface GameStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
  lastPlayedDate: string;
  totalFragments: number;
  solvedWorlds: SolvedWorld[];
}

export interface GameSettings {
  soundFX: boolean;
  ambientSound: boolean;
  colorblindMode: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  keyboardPosition?: 'right' | 'left' | 'bottom';
}

export type SemanticEffectType =
  // Elemental Forces (1-10)
  | 'fire'
  | 'rain'
  | 'snow'
  | 'lightning'
  | 'wind'
  | 'quake'
  | 'volcano'
  | 'toxic'
  | 'sand'
  | 'steam'
  // Celestial & Cosmic Phenomena (11-20)
  | 'moon'
  | 'sun'
  | 'aurora'
  | 'meteor'
  | 'singularity'
  | 'rings'
  | 'supernova'
  | 'eclipse'
  | 'nebula'
  | 'pulsar'
  // Flora, Fauna & Living Nature (21-30)
  | 'tree'
  | 'sakura'
  | 'butterflies'
  | 'spores'
  | 'wave'
  | 'coral'
  | 'crystal'
  | 'vines'
  | 'phoenix'
  | 'fireflies'
  // Magic, Arcana & Mythos (31-40)
  | 'runes'
  | 'ghost'
  | 'gold'
  | 'portal'
  | 'time'
  | 'rainbow'
  | 'holy'
  | 'blood'
  | 'mirror'
  | 'eye'
  // Technology, Cybernetics & Sci-Fi (41-46)
  | 'matrix'
  | 'glitch'
  | 'laser'
  | 'shield'
  | 'synthwave'
  | 'radar'
  // Abstract, Concepts & Wonder (47-52)
  | 'love'
  | 'music'
  | 'chaos'
  | 'peace'
  | 'candy'
  | 'zerog'
  // Backward compatibility aliases
  | 'night'
  | 'light'
  | 'fly';

export interface WorldPhysicsState {
  gravity: number; // default 1.0 (float > 1.0, heavy < 1.0)
  scale: number; // default 1.0
  speed: number; // default 1.0
  brightness: number; // default 1.0
}

export interface WorldReactionState {
  activeEffects: SemanticEffectType[];
  physics: WorldPhysicsState;
  nearMiss: boolean;
  isGlitch: boolean;
  lastReactionWord?: string;
}

export interface HiddenClue {
  id: string;
  word: string;
  name: string;
  whisper: string;
  position: [number, number, number];
  found: boolean;
}

export interface StreakMilestone {
  days: number;
  title: string;
  description: string;
  structure: 'isle' | 'grove' | 'village' | 'citadel' | 'castle' | 'metropolis';
}

