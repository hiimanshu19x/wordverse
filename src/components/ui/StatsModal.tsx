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
    <div className="modal-backdrop">
      <div className="modal-panel">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
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

        {/* 4 Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          <div className="metric-card">
            <span className="metric-value">{stats.played}</span>
            <span className="metric-label">PLAYED</span>
          </div>

          <div className="metric-card">
            <span className="metric-value text-emerald-400">{winPercent}%</span>
            <span className="metric-label">WIN RATE</span>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-center gap-1.5 min-w-0">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span className="metric-value text-amber-400">{stats.currentStreak}</span>
            </div>
            <span className="metric-label">CURRENT</span>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-center gap-1.5 min-w-0">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="metric-value text-cyan-400">{stats.maxStreak}</span>
            </div>
            <span className="metric-label">MAX</span>
          </div>
        </div>

        {/* Guess Distribution Bar Graph */}
        <div className="space-y-2 mt-4">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            GUESS DISTRIBUTION
          </p>

          {[1, 2, 3, 4, 5, 6].map((num) => {
            const count = stats.guessDistribution[num] || 0;
            const pct = Math.max(7, Math.round((count / maxGuessesCount) * 100));

            return (
              <div key={num} className="flex items-center gap-2 text-xs">
                <span className="w-3 font-semibold text-slate-400">{num}</span>
                <div className="flex-1 bg-slate-900/60 rounded overflow-hidden h-5 flex items-center">
                  <div
                    className={`h-full flex items-center justify-end px-2 font-bold text-[11px] rounded transition-all duration-500 ${
                      count > 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                    style={{ width: `${count > 0 ? pct : 7}%` }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total World Fragments */}
        <div className="mt-5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-200">Total World Fragments:</span>
          </div>
          <span className="text-sm font-bold text-cyan-300">{stats.totalFragments}</span>
        </div>
      </div>
    </div>
  );
};
