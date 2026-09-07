import React from 'react';
import { Compass, Sparkles, X, Award, Clock, ArrowLeft } from 'lucide-react';
import type { SolvedWorld } from '../../types/game.ts';

interface GalaxyModalProps {
  solvedWorlds: SolvedWorld[];
  totalFragments: number;
  selectedWorld: SolvedWorld | null;
  onSelectWorld: (world: SolvedWorld | null) => void;
  onClose: () => void;
}

export const GalaxyModal: React.FC<GalaxyModalProps> = ({
  solvedWorlds,
  totalFragments,
  selectedWorld,
  onSelectWorld,
  onClose
}) => {
  // Explorer rank titles
  const getRankTitle = (count: number) => {
    if (count >= 50) return 'Cosmic Architect';
    if (count >= 30) return 'Celestial Sovereign';
    if (count >= 20) return 'Nebula Wanderer';
    if (count >= 10) return 'Starlight Cartographer';
    if (count >= 5) return 'Astral Pioneer';
    return 'Cosmic Initiate';
  };

  const rank = getRankTitle(totalFragments);

  return (
    <div className="galaxy-overlay-hud">
      {/* Top Header Bar */}
      <div className="galaxy-top-bar">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="hud-icon-btn"
            title="Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-300" />
          </button>

          <div className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/50 hidden sm:flex">
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase font-['Space_Grotesk']">
              MY GALAXY
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="text-cyan-400 font-semibold">{rank}</span>
              <span>&bull;</span>
              <span>{totalFragments} Fragments</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="hud-icon-btn"
          title="Close Galaxy"
          aria-label="Close Galaxy"
        >
          <X className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Bottom Area: Selected World Inspect Card OR Hint / Empty State */}
      <div className="galaxy-bottom-container">
        {selectedWorld ? (
          <div className="galaxy-inspect-card">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                WORLD #{selectedWorld.dayNumber}
              </span>
              <button
                onClick={() => onSelectWorld(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close world detail"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 font-['Space_Grotesk']">
              {selectedWorld.word}
            </h3>

            <p className="text-xs text-slate-400">
              {selectedWorld.themeTitle} &bull; {selectedWorld.dateStr}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Solved in {selectedWorld.guessesCount} / 6</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{Math.floor(selectedWorld.timeSeconds / 60)}m {selectedWorld.timeSeconds % 60}s</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="galaxy-hint-pill">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            {solvedWorlds.length > 0 ? (
              <span>Tap any orbiting world to inspect its memories &bull; Drag to rotate galaxy</span>
            ) : (
              <span>Your galaxy is waiting &bull; Solve daily puzzles to discover and orbit new worlds here</span>
            )}
          </div>
        )}

        {/* Bottom Worlds Quick Carousel */}
        {solvedWorlds.length > 0 && (
          <div className="galaxy-worlds-tray">
            {solvedWorlds.map((world) => {
              const isSelected = selectedWorld?.id === world.id;
              return (
                <button
                  key={world.id}
                  onClick={() => onSelectWorld(world)}
                  className={`galaxy-tray-item ${isSelected ? 'active' : ''}`}
                >
                  <span className="text-xs font-bold text-white">{world.word}</span>
                  <span className="text-[10px] text-slate-400">#{world.dayNumber}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
