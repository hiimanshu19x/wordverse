import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, X, Clapperboard } from 'lucide-react';
import type { CameraMode } from '../../types/game.ts';
import type { ScreenFXType } from '../../game/reactions.ts';
import { soundManager } from '../../audio/soundManager.ts';

interface CinematicDemoTourProps {
  onTypeChar: (char: string) => void;
  onSubmitDemoWord: (word: string, evaluations: ('correct' | 'misplaced' | 'absent')[]) => void;
  onSetCameraMode: (mode: CameraMode) => void;
  onSetIsLanding: (isLanding: boolean) => void;
  onTriggerScreenFX: (fx: ScreenFXType) => void;
  onExit: () => void;
}

interface DemoStep {
  timeMs: number;
  title: string;
  badge: string;
  caption: string;
  action?: () => void;
}

const TOTAL_DURATION_MS = 36000;

export const CinematicDemoTour: React.FC<CinematicDemoTourProps> = ({
  onTypeChar,
  onSubmitDemoWord,
  onSetCameraMode,
  onSetIsLanding,
  onTriggerScreenFX,
  onExit
}) => {
  const [elapsed, setElapsed] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('WORDVERSE');
  const [currentBadge, setCurrentBadge] = useState('CINEMATIC DEMO');
  const [currentCaption, setCurrentCaption] = useState('One word. Six guesses. One world.');
  const stepIndexRef = useRef(0);

  // Choreographed Script Sequence
  const stepsRef = useRef<DemoStep[]>([
    // 0.0s: The Hook & Intro
    {
      timeMs: 0,
      title: 'WORDVERSE — 3D Word Deduction',
      badge: 'WELCOME',
      caption: 'Guess the mystery word. Watch the floating 3D diorama physically transform with every guess.',
      action: () => {
        onSetIsLanding(true);
        onSetCameraMode('intro');
      }
    },
    // 4.0s: Enter Gameplay
    {
      timeMs: 3800,
      title: 'Step 1: Enter Your Guess',
      badge: 'GAMEPLAY',
      caption: 'Words are entered into a 3D isometric letter grid floating in the cosmic void.',
      action: () => {
        onSetIsLanding(false);
        onSetCameraMode('play');
      }
    },
    // 4.8s - 6.2s: Type STORM
    { timeMs: 4600, title: 'Typing S-T-O-R-M', badge: 'INPUT', caption: 'Tactile 3D spring bounce with mechanical audio feedback.', action: () => onTypeChar('S') },
    { timeMs: 4950, title: 'Typing S-T-O-R-M', badge: 'INPUT', caption: 'Tactile 3D spring bounce with mechanical audio feedback.', action: () => onTypeChar('T') },
    { timeMs: 5300, title: 'Typing S-T-O-R-M', badge: 'INPUT', caption: 'Tactile 3D spring bounce with mechanical audio feedback.', action: () => onTypeChar('O') },
    { timeMs: 5650, title: 'Typing S-T-O-R-M', badge: 'INPUT', caption: 'Tactile 3D spring bounce with mechanical audio feedback.', action: () => onTypeChar('R') },
    { timeMs: 6000, title: 'Typing S-T-O-R-M', badge: 'INPUT', caption: 'Tactile 3D spring bounce with mechanical audio feedback.', action: () => onTypeChar('M') },

    // 6.8s: Submit STORM -> triggers lightning & rain
    {
      timeMs: 6800,
      title: '⚡ 52+ Living World Reactions',
      badge: 'ELEMENTAL REACTION',
      caption: 'Words like STORM summon electric lightning bolts, cascading rain, and ground quake!',
      action: () => {
        onSubmitDemoWord('STORM', ['absent', 'absent', 'absent', 'absent', 'absent']);
        onTriggerScreenFX('lightning');
        soundManager.playSemanticTrigger('lightning');
      }
    },

    // 12.0s: Type FLAME
    { timeMs: 12000, title: 'Guess 2: Elemental Alchemy', badge: 'REACTION', caption: 'Every word tests both vocabulary and physical world physics.', action: () => onTypeChar('F') },
    { timeMs: 12350, title: 'Guess 2: Elemental Alchemy', badge: 'REACTION', caption: 'Every word tests both vocabulary and physical world physics.', action: () => onTypeChar('L') },
    { timeMs: 12700, title: 'Guess 2: Elemental Alchemy', badge: 'REACTION', caption: 'Every word tests both vocabulary and physical world physics.', action: () => onTypeChar('A') },
    { timeMs: 13050, title: 'Guess 2: Elemental Alchemy', badge: 'REACTION', caption: 'Every word tests both vocabulary and physical world physics.', action: () => onTypeChar('M') },
    { timeMs: 13400, title: 'Guess 2: Elemental Alchemy', badge: 'REACTION', caption: 'Every word tests both vocabulary and physical world physics.', action: () => onTypeChar('E') },

    // 14.2s: Submit FLAME -> triggers fire braziers
    {
      timeMs: 14200,
      title: '🔥 Real-Time Dynamic Physics',
      badge: 'FIRE REACTION',
      caption: 'FLAME ignites stone braziers, casting warm firelight and rising embers into space.',
      action: () => {
        onSubmitDemoWord('FLAME', ['absent', 'misplaced', 'misplaced', 'absent', 'misplaced']);
        onTriggerScreenFX('fire');
        soundManager.playSemanticTrigger('fire');
      }
    },

    // 19.5s: Type Solution APPLE
    { timeMs: 19500, title: 'Guess 3: The Secret Word', badge: 'SOLVING', caption: 'Deducing the correct letters to stabilize the planetary diorama.', action: () => onTypeChar('A') },
    { timeMs: 19850, title: 'Guess 3: The Secret Word', badge: 'SOLVING', caption: 'Deducing the correct letters to stabilize the planetary diorama.', action: () => onTypeChar('P') },
    { timeMs: 20200, title: 'Guess 3: The Secret Word', badge: 'SOLVING', caption: 'Deducing the correct letters to stabilize the planetary diorama.', action: () => onTypeChar('P') },
    { timeMs: 20550, title: 'Guess 3: The Secret Word', badge: 'SOLVING', caption: 'Deducing the correct letters to stabilize the planetary diorama.', action: () => onTypeChar('L') },
    { timeMs: 20900, title: 'Guess 3: The Secret Word', badge: 'SOLVING', caption: 'Deducing the correct letters to stabilize the planetary diorama.', action: () => onTypeChar('E') },

    // 21.6s: Submit APPLE -> VICTORY!
    {
      timeMs: 21600,
      title: '✨ The World is Stabilized!',
      badge: 'VICTORY CELEBRATION',
      caption: 'All 5 tiles flip into radiant crystalline emerald. Stage 5 bloom transforms the celestial world!',
      action: () => {
        onSubmitDemoWord('APPLE', ['correct', 'correct', 'correct', 'correct', 'correct']);
        soundManager.playVictoryFanfare();
        setTimeout(() => onSetCameraMode('won'), 800);
      }
    },

    // 27.5s: The Personal Galaxy View
    {
      timeMs: 27500,
      title: '🪐 Your Personal 3D Galaxy',
      badge: 'GALAXY MAP',
      caption: 'Every solved puzzle permanently adds a unique orbiting planet to your personal solar system.',
      action: () => {
        onSetCameraMode('galaxy');
        soundManager.playKeyClick();
      }
    },

    // 33.0s: Grand Finale & Call to Action
    {
      timeMs: 33000,
      title: 'Play Free at playwordverse.vercel.app',
      badge: 'READY TO EXPLORE?',
      caption: 'Free to play • No download or sign-up • 100% mobile & web optimized.',
      action: () => {
        onSetIsLanding(true);
        onSetCameraMode('intro');
      }
    }
  ]);

  // Main Demo Clock Loop
  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const currentElapsed = now - startTime;
      setElapsed(Math.min(TOTAL_DURATION_MS, currentElapsed));

      // Process pending script steps
      const steps = stepsRef.current;
      while (
        stepIndexRef.current < steps.length &&
        currentElapsed >= steps[stepIndexRef.current].timeMs
      ) {
        const step = steps[stepIndexRef.current];
        setCurrentTitle(step.title);
        setCurrentBadge(step.badge);
        setCurrentCaption(step.caption);
        if (step.action) {
          step.action();
        }
        stepIndexRef.current++;
      }

      // Finish demo tour
      if (currentElapsed >= TOTAL_DURATION_MS) {
        clearInterval(interval);
        onExit();
      }
    }, 50);

    // Keyboard ESC listener to exit demo anytime
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTypeChar, onSubmitDemoWord, onSetCameraMode, onSetIsLanding, onTriggerScreenFX, onExit]);

  const progressPercent = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
  const remainingSeconds = Math.max(0, Math.ceil((TOTAL_DURATION_MS - elapsed) / 1000));

  return (
    <div className="demo-tour-overlay">
      {/* Top Glassmorphic Tour Banner */}
      <div className="demo-tour-banner">
        {/* Progress Bar Line */}
        <div className="demo-tour-progress-track">
          <div
            className="demo-tour-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2 sm:py-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="demo-tour-badge flex items-center gap-1 shrink-0">
              <Clapperboard className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{currentBadge}</span>
            </div>

            <div className="min-w-0">
              <h3 className="demo-tour-title font-['Space_Grotesk'] truncate">
                {currentTitle}
              </h3>
              <p className="demo-tour-caption truncate hidden sm:block">
                {currentCaption}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-slate-400 font-semibold hidden md:inline">
              {remainingSeconds}s remaining
            </span>

            <button
              onClick={onExit}
              className="demo-tour-exit-btn"
              title="Exit Demo Mode"
              aria-label="Exit Demo"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit Demo</span>
            </button>
          </div>
        </div>

        {/* Mobile caption ticker */}
        <div className="sm:hidden px-3 pb-2 text-[11px] text-slate-300 truncate">
          <Sparkles className="w-3 h-3 text-cyan-400 inline mr-1" />
          {currentCaption}
        </div>
      </div>
    </div>
  );
};
