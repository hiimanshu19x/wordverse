import type { GameStats, GameSettings, SolvedWorld, GuessRowData, GameStatus } from '../types/game.ts';

const STATS_KEY = 'wordverse_stats_v1';
const SETTINGS_KEY = 'wordverse_settings_v1';
const DAILY_STATE_KEY = 'wordverse_daily_state_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  soundFX: true,
  ambientSound: true,
  colorblindMode: false,
  reducedMotion: false,
  highContrast: false,
  keyboardPosition: 'right',
};

// Fresh start for Day 1 launch
const INITIAL_SOLVED_WORLDS: SolvedWorld[] = [];

export const DEFAULT_STATS: GameStats = {
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  },
  lastPlayedDate: '',
  totalFragments: 0,
  solvedWorlds: INITIAL_SOLVED_WORLDS
};

export interface StoredDailyState {
  dayNumber: number;
  word: string;
  rows: GuessRowData[];
  currentRowIndex: number;
  status: GameStatus;
  timeSeconds: number;
  lastUpdated: number;
}

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings to localStorage', err);
  }
}

export function loadStats(): GameStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      solvedWorlds: Array.isArray(parsed.solvedWorlds) ? parsed.solvedWorlds : []
    };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: GameStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save stats to localStorage', err);
  }
}

export function recordGameResult(
  solvedWorld: SolvedWorld | null,
  isWin: boolean,
  guessesUsed: number,
  todayStr: string
): GameStats {
  const stats = loadStats();
  const alreadyPlayedToday = stats.lastPlayedDate === todayStr;

  if (!alreadyPlayedToday) {
    stats.played += 1;
    if (isWin) {
      stats.won += 1;
      stats.currentStreak += 1;
      if (stats.currentStreak > stats.maxStreak) {
        stats.maxStreak = stats.currentStreak;
      }
      stats.guessDistribution[guessesUsed] = (stats.guessDistribution[guessesUsed] || 0) + 1;
      stats.totalFragments += 1;

      if (solvedWorld) {
        // Prevent duplicate world entries
        const exists = stats.solvedWorlds.some(w => w.dayNumber === solvedWorld.dayNumber);
        if (!exists) {
          stats.solvedWorlds = [solvedWorld, ...stats.solvedWorlds];
        }
      }
    } else {
      stats.currentStreak = 0;
    }
    stats.lastPlayedDate = todayStr;
    saveStats(stats);
  }

  return stats;
}

export function loadDailyState(dayNumber: number): StoredDailyState | null {
  try {
    const raw = localStorage.getItem(DAILY_STATE_KEY);
    if (!raw) return null;
    const state: StoredDailyState = JSON.parse(raw);
    if (state.dayNumber === dayNumber) {
      return state;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveDailyState(state: StoredDailyState): void {
  try {
    localStorage.setItem(DAILY_STATE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save daily state', err);
  }
}
