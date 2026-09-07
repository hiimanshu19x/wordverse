import React from 'react';
import { X, Sparkles, Compass } from 'lucide-react';

interface OnboardingGuideProps {
  onClose: () => void;
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide font-['Space_Grotesk']">
              HOW TO PLAY
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

        <div className="space-y-4 py-2 text-sm text-slate-300">
          <p>
            Guess the mystery word in <span className="font-semibold text-white">6 attempts</span>. Each guess transforms the 3D miniature world floating in the cosmic void.
          </p>

          <div className="space-y-3 pt-1">
            {/* Correct Example */}
            <div className="p-3 bg-slate-900/60 border border-emerald-800/40 rounded-xl space-y-2">
              <div className="flex gap-2 items-center">
                <div className="sample-tile-correct">P</div>
                <div className="sample-tile-neutral">I</div>
                <div className="sample-tile-neutral">L</div>
                <div className="sample-tile-neutral">O</div>
                <div className="sample-tile-neutral">T</div>
              </div>
              <p className="text-xs text-slate-300">
                <strong className="text-emerald-400 font-bold">P</strong> is in the word and in the correct spot. It locks into place and casts an energy beam into the world below!
              </p>
            </div>

            {/* Misplaced Example */}
            <div className="p-3 bg-slate-900/60 border border-amber-800/40 rounded-xl space-y-2">
              <div className="flex gap-2 items-center">
                <div className="sample-tile-neutral">V</div>
                <div className="sample-tile-misplaced">A</div>
                <div className="sample-tile-neutral">P</div>
                <div className="sample-tile-neutral">O</div>
                <div className="sample-tile-neutral">R</div>
              </div>
              <p className="text-xs text-slate-300">
                <strong className="text-amber-400 font-bold">A</strong> is in the word, but in the wrong spot (wrongly placed).
              </p>
            </div>

            {/* Absent Example */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
              <div className="flex gap-2 items-center">
                <div className="sample-tile-neutral">R</div>
                <div className="sample-tile-neutral">O</div>
                <div className="sample-tile-neutral">U</div>
                <div className="sample-tile-absent">G</div>
                <div className="sample-tile-neutral">E</div>
              </div>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-300 font-bold">G</strong> is absolutely wrong and not in the word in any spot.
              </p>
            </div>
          </div>

          {/* Living Semantic World Explanation */}
          <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl flex items-start gap-2.5 text-xs text-amber-200/90">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-amber-300">Living World Reactions:</strong> Entering elemental words like <code className="bg-amber-900/50 px-1 py-0.5 rounded text-amber-200 font-mono">FLAME</code>, <code className="bg-amber-900/50 px-1 py-0.5 rounded text-amber-200 font-mono">RAINY</code>, <code className="bg-amber-900/50 px-1 py-0.5 rounded text-amber-200 font-mono">TREES</code>, or <code className="bg-amber-900/50 px-1 py-0.5 rounded text-amber-200 font-mono">MOONS</code> physically ignites braziers, summons celestial rain, or brings nightfall in the 3D world!
            </span>
          </div>

          <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl flex items-center gap-2 text-xs text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              Every puzzle solved stabilizes that world and adds an orbiting planet to your personal <strong>WORDVERSE GALAXY</strong>!
            </span>
          </div>
        </div>

        <div className="pt-3">
          <button onClick={onClose} className="btn-primary-glow w-full">
            <span>ENTER THE COSMOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
