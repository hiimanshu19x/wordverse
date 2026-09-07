import React, { useState, useEffect } from 'react';
import { Eye, RotateCcw, Compass, Moon, ArrowRight, X, Clock } from 'lucide-react';
import type { DailyPuzzle } from '../../types/game.ts';
import { getTimeUntilNextPuzzle } from '../../game/dailyEngine.ts';

interface DefeatModalProps {
  puzzle: DailyPuzzle;
  streak: number;
  onExploreWorld: () => void;
  onOpenGalaxy: () => void;
  onPlayPractice: () => void;
  onBackToLanding?: () => void;
  onClose: () => void;
  onResume?: () => void;
  isExploring: boolean;
}

export const DefeatModal: React.FC<DefeatModalProps> = ({
  puzzle,
  streak,
  onExploreWorld,
  onOpenGalaxy,
  onPlayPractice,
  onBackToLanding,
  onClose,
  onResume,
  isExploring
}) => {
  const [countdown, setCountdown] = useState(() => getTimeUntilNextPuzzle().formatted);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilNextPuzzle().formatted);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isExploring) {
    return (
      <div className="explore-floating-hud">
        <button onClick={onResume || onClose} className="btn-secondary">
          <span>Return</span>
        </button>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-panel defeat-panel">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-300 tracking-wider font-['Space_Grotesk']">
              DAY #{puzzle.dayNumber} CONCLUDED
            </h2>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-4 pb-2 text-center">
          <div className="modal-defeat-icon">
            <Moon className="w-7 h-7 text-slate-300" />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-['Space_Grotesk']">
              THE WORLD REMAINS UNSOLVED
            </p>
            <p className="text-xs text-slate-400">
              The mystery word was:
            </p>
            <h2 className="text-3xl font-extrabold tracking-widest text-white font-['Space_Grotesk']">
              {puzzle.word}
            </h2>
            <p className="text-xs text-slate-400 italic">
              "The cosmos whispers its secrets in time."
            </p>
          </div>

          {/* Live Countdown to Next Daily World */}
          <div className="countdown-pill my-3">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>NEXT WORLD IN:</span>
            <span className="timer-val">{countdown}</span>
          </div>
        </div>

        {streak > 0 && (
          <div className="p-3 my-2 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400 text-center">
            Streak reset. Next daily drops tonight at midnight!
          </div>
        )}

        <div className="space-y-2 mt-3 w-full">
          <button onClick={onExploreWorld} className="btn-reveal-world w-full">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>REVEAL & EXPLORE WORLD</span>
          </button>

          <button onClick={onOpenGalaxy} className="btn-ghost w-full text-xs text-slate-400 hover:text-slate-200">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Wordverse Galaxy</span>
          </button>
        </div>

        {/* Dedicated Practice Universe Card */}
        <div className="practice-card mt-3">
          <div className="practice-card-left">
            <div className="practice-card-badge">
              <RotateCcw className="w-3 h-3 text-emerald-400" />
              <span>PRACTICE UNIVERSE</span>
            </div>
            <p className="practice-card-title">Train For Tomorrow</p>
            <p className="practice-card-desc">Practice infinite words to sharpen your deduction reflexes.</p>
          </div>
          <button onClick={onPlayPractice} className="btn-practice-start">
            <span>Play</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {onBackToLanding && (
          <div className="pt-2 text-center">
            <button
              onClick={onBackToLanding}
              className="text-xs text-slate-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
            >
              &larr; Return to Main Landing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
