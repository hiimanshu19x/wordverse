import React from 'react';
import { Play, Sparkles, HelpCircle, Compass, RotateCcw, Clapperboard } from 'lucide-react';
import type { DailyPuzzle } from '../../types/game.ts';
import { soundManager } from '../../audio/soundManager.ts';

interface LandingHeroProps {
  puzzle: DailyPuzzle;
  onPlay: () => void;
  onPlayPractice: () => void;
  onHowToPlay: () => void;
  onOpenGalaxy: () => void;
  onStartDemo: () => void;
  solvedCount: number;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  puzzle,
  onPlay,
  onPlayPractice,
  onHowToPlay,
  onOpenGalaxy,
  onStartDemo,
  solvedCount
}) => {
  return (
    <div className="landing-overlay-minimal">
      {/* Top Subtle Pill */}
      <div className="landing-top-badge">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>DAY {puzzle.dayNumber} &bull; {puzzle.dateStr}</span>
      </div>

      {/* Center Cinematic Hero */}
      <div className="landing-center-hero">
        <h1 className="landing-brand-title">WORDVERSE</h1>
        <p className="landing-brand-subtitle">One word. Six guesses. One world.</p>

        <button
          onClick={() => {
            soundManager.playKeyClick();
            onPlay();
          }}
          className="btn-play-today"
          autoFocus
        >
          <Play className="w-4 h-4 fill-current" />
          <span>PLAY TODAY</span>
        </button>

        <div className="landing-actions-cluster">
          <button
            onClick={() => {
              soundManager.playKeyClick();
              onPlayPractice();
            }}
            className="landing-action-btn group/btn"
            title="Unlimited Practice Mode"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover/btn:rotate-[-45deg] transition-transform" />
            <span className="text-slate-200 group-hover/btn:text-white font-medium">Practice</span>
          </button>

          <button
            onClick={() => {
              soundManager.playKeyClick();
              onOpenGalaxy();
            }}
            className="landing-action-btn group/btn"
            title="My Personal Galaxy"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover/btn:rotate-45 transition-transform" />
            <span className="text-slate-200 group-hover/btn:text-white font-medium">My Galaxy ({solvedCount})</span>
          </button>

          <button
            onClick={() => {
              soundManager.playKeyClick();
              onHowToPlay();
            }}
            className="landing-action-btn group/btn"
            title="How to play rules"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover/btn:scale-110 transition-transform" />
            <span className="text-slate-200 group-hover/btn:text-white font-medium">How to play</span>
          </button>

          <button
            onClick={() => {
              soundManager.playKeyClick();
              onStartDemo();
            }}
            className="landing-action-btn group/btn border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50"
            title="Watch automated 35-second cinematic playthrough demo"
          >
            <Clapperboard className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover/btn:scale-110 transition-transform" />
            <span className="text-emerald-300 group-hover/btn:text-white font-semibold">🎬 Watch Demo</span>
          </button>
        </div>
      </div>

    </div>
  );
};
