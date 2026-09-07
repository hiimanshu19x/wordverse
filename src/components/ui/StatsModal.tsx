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
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide font-['Space_Grotesk']">
              STATISTICS
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

        {/* 4 Key Metrics in a Clean 1-Row Mobile Layout */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 my-3 sm:my-4">
          <div className="metric-card py-2 px-1 sm:py-2.5 sm:px-2">
            <span className="text-base sm:text-xl font-black font-['Space_Grotesk'] text-white">
              {stats.played}
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
              PLAYED
            </span>
          </div>

          <div className="metric-card py-2 px-1 sm:py-2.5 sm:px-2">
            <span className="text-base sm:text-xl font-black font-['Space_Grotesk'] text-emerald-400">
              {winPercent}%
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
              WIN %
            </span>
          </div>

          <div className="metric-card py-2 px-1 sm:py-2.5 sm:px-2">
            <div className="flex items-center justify-center gap-1 min-w-0">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-base sm:text-xl font-black font-['Space_Grotesk'] text-amber-400">
                {stats.currentStreak}
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
              STREAK
            </span>
          </div>

          <div className="metric-card py-2 px-1 sm:py-2.5 sm:px-2">
            <div className="flex items-center justify-center gap-1 min-w-0">
              <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-base sm:text-xl font-black font-['Space_Grotesk'] text-cyan-400">
                {stats.maxStreak}
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
              MAX
            </span>
          </div>
        </div>

        {/* Guess Distribution Bar Graph */}
        <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1.5 sm:mb-2">
            GUESS DISTRIBUTION
          </p>

          {[1, 2, 3, 4, 5, 6].map((num) => {
            const count = stats.guessDistribution[num] || 0;
            const pct = Math.max(8, Math.round((count / maxGuessesCount) * 100));

            return (
              <div key={num} className="flex items-center gap-2 text-xs">
                <span className="w-3.5 font-bold text-center text-slate-400">{num}</span>
                <div className="flex-1 bg-slate-900/70 rounded-md overflow-hidden h-6 flex items-center p-0.5 border border-slate-800/60">
                  <div
                    className={`h-full flex items-center justify-end px-2 font-bold text-xs rounded transition-all duration-500 ${
                      count > 0
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-sm'
                        : 'bg-slate-800/50 text-slate-500'
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
        <div className="mt-4 p-2.5 sm:p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-200">Total World Fragments:</span>
          </div>
          <span className="text-sm font-bold text-cyan-300 font-['Space_Grotesk']">{stats.totalFragments}</span>
        </div>

        {/* Thumb-Friendly Bottom Close Button on Mobile */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 sm:py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-xs sm:text-sm font-bold text-white tracking-wider transition-all border border-slate-700 shadow-md flex items-center justify-center gap-2"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};
