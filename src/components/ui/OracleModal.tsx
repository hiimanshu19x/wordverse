import React from 'react';
import { Sparkles, X, Compass, Feather } from 'lucide-react';
import type { DailyPuzzle } from '../../types/game.ts';

interface OracleModalProps {
  puzzle: DailyPuzzle;
  onClose: () => void;
}

export const OracleModal: React.FC<OracleModalProps> = ({ puzzle, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-panel oracle-panel">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-wide font-['Space_Grotesk']">
              COSMIC ORACLE
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

        <div className="space-y-4 py-4 text-center">
          <div className="oracle-star-icon">
            <Feather className="w-7 h-7 text-amber-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 font-['Space_Grotesk']">
              ATMOSPHERIC RIDDLE
            </p>
            <p className="text-base text-slate-100 font-medium italic leading-relaxed px-2">
              "{puzzle.riddle}"
            </p>
          </div>

          <div className="oracle-theme-card space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>{puzzle.themeTitle}</span>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{puzzle.quote}"
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button onClick={onClose} className="btn-oracle-glow w-full">
            <span>RESUME DEDUCTION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
