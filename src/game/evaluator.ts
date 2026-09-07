import type { LetterStatus } from '../types/game.ts';
import { VALID_WORDS_SET } from './wordList.ts';

/**
 * Evaluates a guess against the target word following exact Wordle duplicate-letter semantics.
 * 
 * Example:
 * Target: PLANET
 * Guess:  CRANE
 * 
 * Target letter count tracked accurately.
 */
export function evaluateGuess(target: string, guess: string): LetterStatus[] {
  const targetUpper = target.toUpperCase();
  const guessUpper = guess.toUpperCase();

  const len = 5;
  const result: LetterStatus[] = Array(len).fill('absent');

  // Count available frequencies in target word
  const targetCounts: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    const char = targetUpper[i];
    targetCounts[char] = (targetCounts[char] || 0) + 1;
  }

  // Pass 1: Mark exact matches ('correct')
  for (let i = 0; i < len; i++) {
    if (guessUpper[i] === targetUpper[i]) {
      result[i] = 'correct';
      targetCounts[guessUpper[i]]--;
    }
  }

  // Pass 2: Mark misplaced matches ('misplaced')
  for (let i = 0; i < len; i++) {
    if (result[i] === 'correct') continue;

    const char = guessUpper[i];
    if (targetCounts[char] && targetCounts[char] > 0) {
      result[i] = 'misplaced';
      targetCounts[char]--;
    } else {
      result[i] = 'absent';
    }
  }

  return result;
}

/**
 * Validates if the guess is an authentic 5-letter English word in the comprehensive dictionary.
 */
export function isValidGuess(guess: string): boolean {
  if (guess.length !== 5) return false;
  if (!/^[A-Za-z]+$/.test(guess)) return false;
  
  const upper = guess.toUpperCase();
  return VALID_WORDS_SET.has(upper);
}

