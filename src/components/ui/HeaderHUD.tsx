import React from 'react';
import {
  Volume2,
  VolumeX,
  BarChart2,
  Settings,
  HelpCircle,
  Compass,
  RotateCcw,
  Flame,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import type { DailyPuzzle, SemanticEffectType } from '../../types/game.ts';
import { getReactionMeta } from '../../game/reactions.ts';

interface HeaderHUDProps {
  puzzle: DailyPuzzle;
  streak: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenHowToPlay: () => void;
  onOpenGalaxy: () => void;
  onOpenOracle: () => void;
  onPracticeNewWord: () => void;
  onBackToMenu: () => void;
  isPractice: boolean;
  currentRowIndex: number;
  activeEffects?: string[];
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  puzzle,
  streak,
  soundEnabled,
  onToggleSound,
  onOpenStats,
  onOpenSettings,
  onOpenHowToPlay,
  onOpenGalaxy,
  onOpenOracle,
  onPracticeNewWord,
  onBackToMenu,
  isPractice,
  currentRowIndex,
  activeEffects = []
}) => {
  return (
    <header className="header-hud">
      {/* Left side: Back to menu, day indicator & theme */}
      <div className="hud-left">
        <button
          onClick={onBackToMenu}
          className="hud-icon-btn"
          title="Return to Main Menu"
          aria-label="Back to Menu"
        >
          <ArrowLeft className="w-4 h-4 text-slate-300" />
        </button>

        <div className="hud-day-badge">
          {isPractice ? (
            <span className="font-['Space_Grotesk'] font-bold text-amber-400 tracking-wider text-xs flex items-center gap-1 shrink-0">
              <RotateCcw className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">PRACTICE MODE</span>
              <span className="sm:hidden">PRACTICE</span>
            </span>
          ) : (
            <span className="font-['Space_Grotesk'] tracking-wider text-xs font-semibold text-slate-300 shrink-0">
              DAY {puzzle.dayNumber}
            </span>
          )}
        </div>

        <div className="hud-theme-title font-['Space_Grotesk']">
          <span>{puzzle.themeTitle}</span>
        </div>

        {/* Active Semantic Reactions Badges */}
        {activeEffects && activeEffects.length > 0 && (
          <div className="hud-effects-cluster flex items-center gap-1.5 ml-1 overflow-hidden max-w-[85px] sm:max-w-[200px] md:max-w-[340px] shrink-0">
            {activeEffects.slice(-1).map((eff) => {
              const meta = getReactionMeta(eff as SemanticEffectType);
              return (
                <span
                  key={eff}
                  className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border animate-pulse flex items-center gap-1 whitespace-nowrap shrink-0 shadow-sm"
                  style={{
                    backgroundColor: `${meta.color}22`,
                    color: meta.color,
                    borderColor: `${meta.color}66`,
                    boxShadow: `0 0 8px ${meta.color}25`
                  }}
                  title={`Active Reaction: ${meta.name} — ${meta.banner}`}
                >
                  {meta.badge}
                </span>
              );
            })}
          </div>
        )}

        {/* Practice Mode Semantic Tip */}
        {isPractice && (!activeEffects || activeEffects.length === 0) && (
          <div
            className="hidden md:flex items-center gap-1 text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full ml-1.5"
            title="Type words like STORM, AURORA, VOLCANO, SAKURA, CRYSTAL, or RAINBOW to see the 3D world react!"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>50+ reactions: Try STORM, VOLCANO, SAKURA, AURORA, CRYSTAL</span>
          </div>
        )}
      </div>

      {/* Center: Brand Title & Guess Attempt Indicator */}
      <div className="hud-center flex flex-col items-center">
        <span className="hud-brand-title font-['Space_Grotesk'] hidden sm:block">WORDVERSE</span>
        <div className="flex items-center gap-1.5 mt-0.5" title={`Attempt ${Math.min(6, currentRowIndex + 1)} of 6`}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentRowIndex
                  ? 'bg-emerald-400 scale-125 shadow-sm shadow-emerald-400/50'
                  : i < currentRowIndex
                  ? 'bg-slate-500'
                  : 'bg-slate-800 border border-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right side: Action controls */}
      <div className="hud-right">
        {streak > 0 && !isPractice && (
          <div className="hud-streak-pill" title={`${streak} Day Streak!`}>
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{streak}</span>
          </div>
        )}

        {/* Cosmic Oracle Hint Button */}
        <button
          onClick={onOpenOracle}
          className="hud-icon-btn border-amber-500/30 bg-amber-500/10"
          title="Cosmic Oracle: Reveal poetic riddle"
          aria-label="Cosmic Oracle"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
        </button>

        {/* Practice Mode: New Word */}
        {isPractice && (
          <button
            onClick={onPracticeNewWord}
            className="hud-icon-btn"
            title="Generate New Practice World"
            aria-label="New Practice Word"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
          </button>
        )}

        {/* Secondary controls hidden on mobile, accessible via Settings modal */}
        <button
          onClick={onOpenGalaxy}
          className="hud-icon-btn mobile-hide"
          title="My Wordverse Galaxy"
          aria-label="My Wordverse Galaxy"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
        </button>

        <button
          onClick={onToggleSound}
          className="hud-icon-btn mobile-hide"
          title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-slate-300" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>

        <button
          onClick={onOpenHowToPlay}
          className="hud-icon-btn mobile-hide"
          title="How to Play"
          aria-label="How to Play"
        >
          <HelpCircle className="w-4 h-4 text-slate-300" />
        </button>

        {/* Primary controls always accessible on mobile */}
        <button
          onClick={onOpenStats}
          className="hud-icon-btn"
          title="Statistics"
          aria-label="Statistics"
        >
          <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
        </button>

        <button
          onClick={onOpenSettings}
          className="hud-icon-btn"
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
        </button>
      </div>
    </header>
  );
};
