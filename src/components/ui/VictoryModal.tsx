import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Share2,
  Compass,
  RotateCcw,
  Check,
  Eye,
  Award,
  ArrowRight,
  Clock,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { DailyPuzzle, GuessRowData } from '../../types/game.ts';
import { getTimeUntilNextPuzzle } from '../../game/dailyEngine.ts';

interface VictoryModalProps {
  puzzle: DailyPuzzle;
  guessesCount: number;
  timeSeconds: number;
  streak: number;
  rows: GuessRowData[];
  onExploreWorld: () => void;
  onOpenGalaxy: () => void;
  onPlayPractice: () => void;
  onClose: () => void;
  onResume?: () => void;
  isExploring: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  puzzle,
  guessesCount,
  timeSeconds,
  streak,
  rows,
  onExploreWorld,
  onOpenGalaxy,
  onPlayPractice,
  onClose,
  onResume,
  isExploring
}) => {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(() => getTimeUntilNextPuzzle().formatted);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilNextPuzzle().formatted);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Trigger delicate celebratory particles
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#34d399', '#38bdf8', '#fbbf24', '#f472b6']
      });
    } catch {
      // Ignored if confetti not available
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateShareText = () => {
    const title = `WORDVERSE #${puzzle.dayNumber}`;
    const score = `🌌 ${guessesCount} / 6`;
    const streakStr = `🔥 ${streak} DAY STREAK`;

    const gridEmojis = rows
      .filter((r) => r.isSubmitted && r.evaluations)
      .map((r) => {
        return (
          r.evaluations
            ?.map((e) => {
              if (e === 'correct') return '🟩';
              if (e === 'misplaced') return '🟥';
              return '⬛';
            })
            .join('') || ''
        );
      })
      .join('\n');

    return `${title}\n${score}\n\n${gridEmojis}\n\n🌍 WORLD STABILIZED: ${puzzle.themeTitle}\n${streakStr}\nhttps://playwordverse.vercel.app`;
  };

  const handleShare = async () => {
    const text = generateShareText();
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title: `WORDVERSE #${puzzle.dayNumber}`,
          text: text
        });
      } catch {
        // Ignored
      }
    }
  };

  if (isExploring) {
    return (
      <div className="explore-floating-hud">
        <button onClick={onResume || onClose} className="btn-primary-glow">
          <Award className="w-4 h-4" />
          <span>Resume Summary</span>
        </button>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-panel victory-panel">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-emerald-400 tracking-wider font-['Space_Grotesk']">
              WORLD STABILIZED • DAY #{puzzle.dayNumber}
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

        {/* Visual Celestial Sharing Card */}
        <div className="share-card-container">
          <div className="share-card-header">
            <div className="flex items-center gap-2">
              <span className="share-card-logo">WORDVERSE</span>
              <span className="share-card-badge">DAY #{puzzle.dayNumber}</span>
            </div>
            <span className="share-card-date">{puzzle.dateStr}</span>
          </div>

          <div className="share-card-center">
            <p className="share-card-kicker">MYSTERY WORD UNVEILED</p>
            <h2 className="share-card-word">{puzzle.word}</h2>
            <p className="share-card-theme">
              World Stabilized &bull; {puzzle.themeTitle}
            </p>
          </div>

          {/* Mini Guess Journey Grid */}
          <div className="share-card-grid">
            {rows
              .filter((r) => r.isSubmitted && r.evaluations)
              .map((r, rIdx) => (
                <div key={rIdx} className="share-grid-row">
                  {r.evaluations?.map((ev, cIdx) => (
                    <div
                      key={cIdx}
                      className={`share-grid-pip pip-${ev}`}
                      title={ev}
                    />
                  ))}
                </div>
              ))}
          </div>

          {/* Metrics Pill Bar */}
          <div className="share-card-metrics">
            <div className="share-metric">
              <span className="share-metric-val text-emerald-400 font-bold">{guessesCount} / 6</span>
              <span className="share-metric-lbl">ATTEMPTS</span>
            </div>
            <div className="share-metric-divider" />
            <div className="share-metric">
              <span className="share-metric-val">{formatTime(timeSeconds)}</span>
              <span className="share-metric-lbl">TIME</span>
            </div>
            <div className="share-metric-divider" />
            <div className="share-metric">
              <span className="share-metric-val text-amber-400">🔥 {streak}</span>
              <span className="share-metric-lbl">STREAK</span>
            </div>
          </div>
        </div>

        {/* World Fragment Notification */}
        <div className="fragment-award-card">
          <div className="fragment-icon-wrapper">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-cyan-300 tracking-wide font-['Space_Grotesk']">
              +1 WORLD FRAGMENT HARVESTED
            </p>
            <p className="text-[11px] text-slate-400">
              Preserved in your Personal Galaxy diorama
            </p>
          </div>
        </div>

        {/* Primary Share Action */}
        <div className="space-y-2 w-full">
          <button onClick={handleShare} className="btn-primary-glow w-full">
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-950 font-bold" />
                <span>COPIED TO CLIPBOARD!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>SHARE VICTORY CARD</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2 w-full">
            <button onClick={onExploreWorld} className="btn-secondary">
              <Eye className="w-4 h-4 text-slate-300" />
              <span>Explore World</span>
            </button>

            <button onClick={onOpenGalaxy} className="btn-secondary">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>View Galaxy</span>
            </button>
          </div>
        </div>

        {/* Live Countdown to Next Daily World */}
        <div className="countdown-pill my-2">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>NEXT MYSTERY WORLD IN:</span>
          <span className="timer-val">{countdown}</span>
        </div>

        {/* Dedicated Practice Universe Card */}
        <div className="practice-card mt-2">
          <div className="practice-card-left">
            <div className="practice-card-badge">
              <RotateCcw className="w-3 h-3 text-emerald-400" />
              <span>PRACTICE UNIVERSE</span>
            </div>
            <p className="practice-card-title">Want Another Challenge?</p>
            <p className="practice-card-desc">Play infinite random worlds with no streak penalty.</p>
          </div>
          <button onClick={onPlayPractice} className="btn-practice-start">
            <span>Play</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
