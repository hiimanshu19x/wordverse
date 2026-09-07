import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type {
  DailyPuzzle,
  GuessRowData,
  GameStatus,
  CameraMode,
  LetterStatus,
  GameStats,
  GameSettings,
  SolvedWorld,
  WorldReactionState,
  HiddenClue
} from './types/game.ts';
import { getDailyPuzzle, getPracticePuzzle } from './game/dailyEngine.ts';
import { evaluateGuess, isValidGuess } from './game/evaluator.ts';
import {
  WordWorldReactionEngine,
  getReactionMeta,
  detectScreenFX,
  type ScreenFXType
} from './game/reactions.ts';
import {
  loadSettings,
  saveSettings,
  loadStats,
  recordGameResult,
  loadDailyState,
  saveDailyState
} from './game/storage.ts';
import { soundManager } from './audio/soundManager.ts';
import { WorldCanvas } from './components/canvas/WorldCanvas.tsx';
import { ScreenFXOverlay } from './components/ui/ScreenFXOverlay.tsx';
import { LandingHero } from './components/ui/LandingHero.tsx';
import { HeaderHUD } from './components/ui/HeaderHUD.tsx';
import { FloatingKeyboard } from './components/ui/FloatingKeyboard.tsx';
import { VictoryModal } from './components/ui/VictoryModal.tsx';
import { DefeatModal } from './components/ui/DefeatModal.tsx';
import { GalaxyModal } from './components/ui/GalaxyModal.tsx';
import { StatsModal } from './components/ui/StatsModal.tsx';
import { SettingsModal } from './components/ui/SettingsModal.tsx';
import { OnboardingGuide } from './components/ui/OnboardingGuide.tsx';
import { ToastNotification } from './components/ui/ToastNotification.tsx';

export function App() {
  // --- STATE ---
  const [puzzle, setPuzzle] = useState<DailyPuzzle>(() => getDailyPuzzle());
  const [stats, setStats] = useState<GameStats>(() => loadStats());
  const [settings, setSettings] = useState<GameSettings>(() => loadSettings());

  const [isLanding, setIsLanding] = useState<boolean>(true);
  const [cameraMode, setCameraMode] = useState<CameraMode>('intro');
  const [isExploringWorld, setIsExploringWorld] = useState<boolean>(false);

  const [rows, setRows] = useState<GuessRowData[]>(() =>
    Array(6)
      .fill(null)
      .map(() => ({
        letters: [],
        evaluations: null,
        isSubmitted: false
      }))
  );
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('in_progress');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);

  // Living World Reaction State & Environmental Clues
  const [reactionState, setReactionState] = useState<WorldReactionState>({
    activeEffects: [],
    physics: { gravity: 1.0, scale: 1.0, speed: 1.0, brightness: 1.0 },
    nearMiss: false,
    isGlitch: false
  });
  const [clues, setClues] = useState<HiddenClue[]>(() =>
    WordWorldReactionEngine.generateCluesForWord(puzzle.word, puzzle.dayNumber)
  );

  // Modals
  const [activeModal, setActiveModal] = useState<
    'stats' | 'settings' | 'howToPlay' | 'galaxy' | null
  >(null);
  const [selectedGalaxyWorld, setSelectedGalaxyWorld] = useState<SolvedWorld | null>(null);

  // Reference for timer
  const timerRef = useRef<number | null>(null);

  // Real-time cinematic screen effects state & timer
  const [activeScreenFX, setActiveScreenFX] = useState<{ type: ScreenFXType; id: number } | null>(null);
  const fxTimeoutRef = useRef<number | null>(null);

  const triggerScreenFX = useCallback((fx: ScreenFXType) => {
    if (!fx) return;
    if (fxTimeoutRef.current) clearTimeout(fxTimeoutRef.current);
    setActiveScreenFX({ type: fx, id: Date.now() });
    soundManager.playSemanticTrigger(fx);
    fxTimeoutRef.current = window.setTimeout(() => {
      setActiveScreenFX(null);
    }, 1900);
  }, []);

  useEffect(() => {
    return () => {
      if (fxTimeoutRef.current) clearTimeout(fxTimeoutRef.current);
    };
  }, []);

  // --- RESTORE SAVED DAILY STATE ---
  useEffect(() => {
    if (!puzzle.isPractice) {
      const saved = loadDailyState(puzzle.dayNumber);
      if (saved && saved.word === puzzle.word) {
        setRows(saved.rows);
        setCurrentRowIndex(saved.currentRowIndex);
        setGameStatus(saved.status);
        setTimeSeconds(saved.timeSeconds);
      }
    }
  }, [puzzle]);

  // --- AUDIO SYNCHRONIZATION ---
  useEffect(() => {
    soundManager.setMuted(!settings.soundFX);
    soundManager.setAmbientEnabled(settings.ambientSound);
  }, [settings]);

  // --- TIMER ---
  useEffect(() => {
    if (!isLanding && gameStatus === 'in_progress') {
      timerRef.current = window.setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLanding, gameStatus]);

  // --- SHOW TOAST HELPER ---
  const showToast = useCallback((msg: string, duration = 2000) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, duration);
  }, []);

  // --- KEYBOARD LETTER STATUSES ---
  const keyboardLetterStatuses = useMemo(() => {
    const map: Record<string, LetterStatus> = {};
    rows.forEach((row) => {
      if (row.isSubmitted && row.evaluations) {
        row.letters.forEach((char, idx) => {
          const evalStatus = row.evaluations![idx];
          const currentBest = map[char];

          if (evalStatus === 'correct') {
            map[char] = 'correct';
          } else if (evalStatus === 'misplaced' && currentBest !== 'correct') {
            map[char] = 'misplaced';
          } else if (!currentBest) {
            map[char] = evalStatus;
          }
        });
      }
    });
    return map;
  }, [rows]);

  // --- WORLD REACTIVITY STAGE (0 to 5) ---
  const worldStage = useMemo(() => {
    if (gameStatus === 'won') return 5;
    let maxCorrect = 0;
    rows.forEach((r) => {
      if (r.isSubmitted && r.evaluations) {
        const correctCount = r.evaluations.filter((e) => e === 'correct').length;
        if (correctCount > maxCorrect) maxCorrect = correctCount;
      }
    });
    return maxCorrect;
  }, [rows, gameStatus]);

  // --- INPUT HANDLERS ---
  const handleChar = useCallback(
    (char: string) => {
      if (isSubmitting || gameStatus !== 'in_progress') return;
      if (currentInput.length < 5) {
        const nextInput = currentInput + char.toUpperCase();
        setCurrentInput(nextInput);
        // Real-time atmospheric FX trigger (e.g. typing SHOCK, FIRE, FROST, QUAKE, etc.)
        if (nextInput.length >= 4) {
          const fx = detectScreenFX(nextInput);
          if (fx) {
            triggerScreenFX(fx);
          }
        }
      }
    },
    [isSubmitting, gameStatus, currentInput, triggerScreenFX]
  );

  const handleBackspace = useCallback(() => {
    if (isSubmitting || gameStatus !== 'in_progress') return;
    setCurrentInput((prev) => prev.slice(0, -1));
  }, [isSubmitting, gameStatus]);

  const handleEnter = useCallback(() => {
    if (isSubmitting || gameStatus !== 'in_progress') return;

    if (currentInput.length < 5) {
      soundManager.playInvalidWord();
      showToast('Not enough letters');
      return;
    }

    if (!isValidGuess(currentInput)) {
      soundManager.playInvalidWord();
      showToast('Word not in dictionary');
      return;
    }

    const evaluations = evaluateGuess(puzzle.word, currentInput);
    const letters = currentInput.split('');

    setIsSubmitting(true);
    setCameraMode('submit');

    // Trigger visual screen FX if applicable on guess submission
    const submitFX = detectScreenFX(currentInput);
    if (submitFX) {
      triggerScreenFX(submitFX);
    }

    // 1. Letters physically take flight into the 3D world with crystalline swooshes
    letters.forEach((_, idx) => {
      soundManager.playLetterLaunch(idx);
    });

    // 2. Process WordWorldReactionEngine for semantic magic, physics, near-miss, and glitch
    const nextReaction = WordWorldReactionEngine.processGuess(puzzle.word, currentInput, reactionState);
    setReactionState(nextReaction);

    if (nextReaction.isGlitch) {
      soundManager.playSemanticTrigger('glitch');
      showToast('⚡ CELESTIAL GLITCH: Reality ripples through the void...', 3500);
    } else if (nextReaction.nearMiss) {
      soundManager.playNearMiss();
      showToast('🔥 THE WORLD SENSES THE ANSWER — 1 LETTER AWAY!', 3000);
    } else {
      const newEffects = nextReaction.activeEffects.filter((e) => !reactionState.activeEffects.includes(e));
      if (newEffects.length > 0) {
        const primaryEffect = newEffects[0];
        const meta = getReactionMeta(primaryEffect);
        soundManager.playSemanticTrigger(meta.sound || primaryEffect);
        showToast(meta.banner, 3800);
      }
    }

    // Staggered letter evaluation sound chimes
    evaluations.forEach((status, idx) => {
      setTimeout(() => {
        soundManager.playLetterReveal(status, idx);
      }, idx * 220);
    });

    // Complete evaluation after stagger
    setTimeout(() => {
      const updatedRows = [...rows];
      updatedRows[currentRowIndex] = {
        letters,
        evaluations,
        isSubmitted: true
      };
      setRows(updatedRows);
      setIsSubmitting(false);

      const isWin = evaluations.every((e) => e === 'correct');
      const isLoss = !isWin && currentRowIndex >= 5;

      if (isWin) {
        // Dramatic 0.5s suspense pause before multi-step world transformation
        setTimeout(() => {
          setGameStatus('won');
          setCameraMode('won');
          soundManager.playVictoryFanfare();
          soundManager.playWorldActivation(5);
          soundManager.playNPCChirp();
          showToast(`🌍 WORLD STABILIZED: ${puzzle.themeTitle.toUpperCase()}`, 3500);

          const solvedWorld: SolvedWorld = {
            id: `world-${puzzle.dayNumber}-${Date.now()}`,
            dayNumber: puzzle.dayNumber,
            word: puzzle.word,
            dateStr: puzzle.dateStr,
            guessesCount: currentRowIndex + 1,
            timeSeconds,
            biome: puzzle.biome,
            themeTitle: puzzle.themeTitle
          };

          const newStats = recordGameResult(
            puzzle.isPractice ? null : solvedWorld,
            true,
            currentRowIndex + 1,
            puzzle.dateStr
          );
          setStats(newStats);
        }, 500);
      } else if (isLoss) {
        setGameStatus('lost');
        setCameraMode('play');
        const newStats = recordGameResult(null, false, 6, puzzle.dateStr);
        setStats(newStats);
      } else {
        setCurrentRowIndex((prev) => prev + 1);
        setCurrentInput('');
        setCameraMode('play');

        // Play subtle world resonance if any correct letter was found
        const corrects = evaluations.filter((e) => e === 'correct').length;
        if (corrects > 0) {
          soundManager.playWorldActivation(corrects);
        }
      }

      // Persist daily state
      if (!puzzle.isPractice) {
        saveDailyState({
          dayNumber: puzzle.dayNumber,
          word: puzzle.word,
          rows: updatedRows,
          currentRowIndex: isWin || isLoss ? currentRowIndex : currentRowIndex + 1,
          status: isWin ? 'won' : isLoss ? 'lost' : 'in_progress',
          timeSeconds,
          lastUpdated: Date.now()
        });
      }
    }, 5 * 220 + 150);
  }, [
    isSubmitting,
    gameStatus,
    currentInput,
    puzzle,
    rows,
    currentRowIndex,
    timeSeconds,
    reactionState,
    showToast
  ]);

  // --- ACTIONS ---
  const handleReturnToMainLanding = useCallback(() => {
    soundManager.playKeyClick();
    const daily = getDailyPuzzle();
    setPuzzle(daily);
    setClues(WordWorldReactionEngine.generateCluesForWord(daily.word, daily.dayNumber));
    setReactionState({
      activeEffects: [],
      physics: { gravity: 1.0, scale: 1.0, speed: 1.0, brightness: 1.0 },
      nearMiss: false,
      isGlitch: false
    });
    const saved = loadDailyState(daily.dayNumber);
    if (saved && saved.word === daily.word) {
      setRows(saved.rows);
      setCurrentRowIndex(saved.currentRowIndex);
      setGameStatus(saved.status);
      setTimeSeconds(saved.timeSeconds);
    } else {
      setRows(
        Array(6)
          .fill(null)
          .map(() => ({
            letters: [],
            evaluations: null,
            isSubmitted: false
          }))
      );
      setCurrentRowIndex(0);
      setCurrentInput('');
      setGameStatus('in_progress');
      setTimeSeconds(0);
    }
    setIsExploringWorld(false);
    setIsLanding(true);
    setCameraMode('intro');
  }, []);

  const handlePlayToday = () => {
    soundManager.userInteracted();
    soundManager.playKeyClick();
    const daily = getDailyPuzzle();
    if (puzzle.isPractice || puzzle.word !== daily.word) {
      setPuzzle(daily);
      setClues(WordWorldReactionEngine.generateCluesForWord(daily.word, daily.dayNumber));
      setReactionState({
        activeEffects: [],
        physics: { gravity: 1.0, scale: 1.0, speed: 1.0, brightness: 1.0 },
        nearMiss: false,
        isGlitch: false
      });
      const saved = loadDailyState(daily.dayNumber);
      if (saved && saved.word === daily.word) {
        setRows(saved.rows);
        setCurrentRowIndex(saved.currentRowIndex);
        setGameStatus(saved.status);
        setTimeSeconds(saved.timeSeconds);
      } else {
        setRows(
          Array(6)
            .fill(null)
            .map(() => ({
              letters: [],
              evaluations: null,
              isSubmitted: false
            }))
        );
        setCurrentRowIndex(0);
        setCurrentInput('');
        setGameStatus('in_progress');
        setTimeSeconds(0);
      }
    }
    setIsLanding(false);
    setCameraMode('play');
  };

  const handleToggleSound = () => {
    soundManager.userInteracted();
    setSettings((prev) => {
      const next = { ...prev, soundFX: !prev.soundFX };
      saveSettings(next);
      return next;
    });
  };

  const handlePracticeNewWord = () => {
    const newPuzzle = getPracticePuzzle();
    setPuzzle(newPuzzle);
    setClues(WordWorldReactionEngine.generateCluesForWord(newPuzzle.word, newPuzzle.dayNumber));
    setReactionState({
      activeEffects: [],
      physics: { gravity: 1.0, scale: 1.0, speed: 1.0, brightness: 1.0 },
      nearMiss: false,
      isGlitch: false
    });
    setRows(
      Array(6)
        .fill(null)
        .map(() => ({
          letters: [],
          evaluations: null,
          isSubmitted: false
        }))
    );
    setCurrentRowIndex(0);
    setCurrentInput('');
    setGameStatus('in_progress');
    setTimeSeconds(0);
    setIsExploringWorld(false);
    setCameraMode('play');
  };

  const handleDiscoverClue = useCallback(
    (clue: HiddenClue) => {
      showToast(`✨ SECRET RELIC: ${clue.name} — "${clue.whisper}"`, 4500);
    },
    [showToast]
  );

  const handleExploreWorld = () => {
    setIsExploringWorld(true);
    setCameraMode('explore');
  };

  const handleOpenGalaxy = () => {
    setCameraMode('galaxy');
    setActiveModal('galaxy');
  };

  const handleCloseGalaxy = () => {
    setActiveModal(null);
    setSelectedGalaxyWorld(null);
    if (gameStatus === 'won') {
      setCameraMode('won');
    } else {
      setCameraMode(isLanding ? 'intro' : 'play');
    }
  };

  return (
    <div
      className={`app-container ${
        activeScreenFX?.type === 'lightning'
          ? 'screen-shake-lightning'
          : activeScreenFX?.type === 'quake'
          ? 'screen-shake-quake'
          : ''
      }`}
    >
      {/* 3D WebGL Canvas */}
      <WorldCanvas
        mode={cameraMode}
        biome={puzzle.biome}
        stage={worldStage}
        isWon={gameStatus === 'won'}
        rows={rows}
        currentRowIndex={currentRowIndex}
        currentInput={currentInput}
        isSubmitting={isSubmitting}
        colorblindMode={settings.colorblindMode}
        reducedMotion={settings.reducedMotion}
        solvedWorlds={stats.solvedWorlds}
        onSelectGalaxyWorld={(w) => setSelectedGalaxyWorld(w)}
        selectedGalaxyWorld={selectedGalaxyWorld}
        isLanding={isLanding}
        keyboardPosition={settings.keyboardPosition || 'right'}
        reactionState={reactionState}
        clues={clues}
        onDiscoverClue={handleDiscoverClue}
        streak={stats.currentStreak}
        screenFX={activeScreenFX?.type || null}
      />

      {/* Cinematic Full-Screen Word FX Overlay (Lightning, Fire, Frost, Quake, etc.) */}
      <ScreenFXOverlay fx={activeScreenFX?.type || null} triggerKey={activeScreenFX?.id || 0} />

      {/* Landing Experience Overlay */}
      {isLanding && activeModal === null && (
        <LandingHero
          puzzle={puzzle}
          onPlay={handlePlayToday}
          onPlayPractice={() => {
            soundManager.userInteracted();
            soundManager.playKeyClick();
            handlePracticeNewWord();
            setIsLanding(false);
          }}
          onHowToPlay={() => setActiveModal('howToPlay')}
          onOpenGalaxy={handleOpenGalaxy}
          solvedCount={stats.solvedWorlds.length}
        />
      )}

      {/* Main HUD */}
      {!isLanding && activeModal !== 'galaxy' && (
        <HeaderHUD
          puzzle={puzzle}
          streak={stats.currentStreak}
          soundEnabled={settings.soundFX}
          onToggleSound={handleToggleSound}
          onOpenStats={() => setActiveModal('stats')}
          onOpenSettings={() => setActiveModal('settings')}
          onOpenHowToPlay={() => setActiveModal('howToPlay')}
          onOpenGalaxy={handleOpenGalaxy}
          onPracticeNewWord={handlePracticeNewWord}
          onBackToMenu={handleReturnToMainLanding}
          isPractice={!!puzzle.isPractice}
          currentRowIndex={currentRowIndex}
          activeEffects={reactionState.activeEffects}
        />
      )}

      {/* Floating Virtual Keyboard - docked to right/left on desktop, bottom on mobile */}
      {!isLanding &&
        activeModal === null &&
        !isExploringWorld &&
        gameStatus === 'in_progress' && (
          <FloatingKeyboard
            onChar={handleChar}
            onEnter={handleEnter}
            onBackspace={handleBackspace}
            letterStatuses={keyboardLetterStatuses}
            disabled={isSubmitting}
            colorblindMode={settings.colorblindMode}
            dockPosition={settings.keyboardPosition || 'right'}
            onToggleDock={(newPos) => {
              setSettings((prev) => {
                const updated = { ...prev, keyboardPosition: newPos };
                saveSettings(updated);
                return updated;
              });
            }}
          />
        )}

      {/* Toast Notification */}
      <ToastNotification message={toastMessage} />

      {/* Victory Modal */}
      {gameStatus === 'won' && activeModal === null && (
        <VictoryModal
          puzzle={puzzle}
          guessesCount={currentRowIndex + 1}
          timeSeconds={timeSeconds}
          streak={stats.currentStreak}
          rows={rows}
          onExploreWorld={handleExploreWorld}
          onOpenGalaxy={handleOpenGalaxy}
          onPlayPractice={handlePracticeNewWord}
          onBackToLanding={handleReturnToMainLanding}
          onClose={() => handleExploreWorld()}
          onResume={() => setIsExploringWorld(false)}
          isExploring={isExploringWorld}
        />
      )}

      {/* Defeat Modal */}
      {gameStatus === 'lost' && activeModal === null && (
        <DefeatModal
          puzzle={puzzle}
          streak={stats.currentStreak}
          onExploreWorld={handleExploreWorld}
          onOpenGalaxy={handleOpenGalaxy}
          onPlayPractice={handlePracticeNewWord}
          onBackToLanding={handleReturnToMainLanding}
          onClose={() => handleExploreWorld()}
          onResume={() => setIsExploringWorld(false)}
          isExploring={isExploringWorld}
        />
      )}

      {/* Personal Galaxy Modal Overlay */}
      {activeModal === 'galaxy' && (
        <GalaxyModal
          solvedWorlds={stats.solvedWorlds}
          totalFragments={stats.totalFragments}
          selectedWorld={selectedGalaxyWorld}
          onSelectWorld={(w) => setSelectedGalaxyWorld(w)}
          onClose={handleCloseGalaxy}
        />
      )}

      {/* Stats Modal */}
      {activeModal === 'stats' && (
        <StatsModal stats={stats} onClose={() => setActiveModal(null)} />
      )}

      {/* Settings Modal */}
      {activeModal === 'settings' && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={(newVals) => {
            setSettings((prev) => {
              const updated = { ...prev, ...newVals };
              saveSettings(updated);
              return updated;
            });
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* How To Play Onboarding Modal */}
      {activeModal === 'howToPlay' && (
        <OnboardingGuide onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}

export default App;
