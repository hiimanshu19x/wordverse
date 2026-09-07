import React from 'react';
import { X, BarChart2, Flame, Award, Zap } from 'lucide-react';
import type { GameStats } from '../../types/game.ts';

interface StatsModalProps {
  stats: GameStats;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ stats, onClose }) => {
  const winPercent = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
  const maxGuessesCount = Math.max(...Object.values(stats.guessDistribution), 1);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-wide font-['Space_Grotesk']">
              STATISTICS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn w-9 h-9 rounded-xl"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Key Metrics in a Spaciously Adjusted Mobile Layout */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3.5 my-4 sm:my-5">
          <div className="metric-card py-3 px-1.5 sm:py-3.5 sm:px-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <span className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-white">
              {stats.played}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase mt-1">
              PLAYED
            </span>
          </div>

          <div className="metric-card py-3 px-1.5 sm:py-3.5 sm:px-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <span className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-emerald-400">
              {winPercent}%
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase mt-1">
              WIN %
            </span>
          </div>

          <div className="metric-card py-3 px-1.5 sm:py-3.5 sm:px-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-center gap-1 min-w-0">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-amber-400">
                {stats.currentStreak}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase mt-1">
              STREAK
            </span>
          </div>

          <div className="metric-card py-3 px-1.5 sm:py-3.5 sm:px-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-center gap-1 min-w-0">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-cyan-400">
                {stats.maxStreak}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase mt-1">
              MAX
            </span>
          </div>
        </div>

        {/* Guess Distribution Bar Graph */}
        <div className="space-y-2 mt-4 sm:mt-5">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2.5">
            GUESS DISTRIBUTION
          </p>

          {[1, 2, 3, 4, 5, 6].map((num) => {
            const count = stats.guessDistribution[num] || 0;
            const pct = Math.max(8, Math.round((count / maxGuessesCount) * 100));

            return (
              <div key={num} className="flex items-center gap-2.5 text-xs sm:text-sm">
                <span className="w-4 font-bold text-center text-slate-300">{num}</span>
                <div className="flex-1 bg-slate-900/80 rounded-xl overflow-hidden h-7 sm:h-8 flex items-center p-0.5 border border-slate-800/80">
                  <div
                    className={`h-full flex items-center justify-end px-2.5 font-bold text-xs sm:text-sm rounded-lg transition-all duration-500 ${
                      count > 0
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-sm'
                        : 'bg-slate-800/60 text-slate-400'
                    }`}
                    style={{ width: `${count > 0 ? pct : 8}%` }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total World Fragments */}
        <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Total World Fragments:</span>
          </div>
          <span className="text-base sm:text-lg font-black text-cyan-300 font-['Space_Grotesk']">{stats.totalFragments}</span>
        </div>

        {/* Thumb-Friendly Bottom Close Button on Mobile */}
        <button
          onClick={onClose}
          className="w-full mt-5 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-sm font-bold text-white tracking-wider transition-all border border-slate-700 shadow-lg flex items-center justify-center gap-2"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};
