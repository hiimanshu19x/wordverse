import React from 'react';
import { X, Settings, Volume2, Eye, Activity, Contrast, Wind } from 'lucide-react';
import type { GameSettings } from '../../types/game.ts';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose
}) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-panel">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-300" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              SETTINGS
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

        <div className="space-y-4 py-3">
          {/* Sound FX */}
          <div className="setting-row">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="setting-label">Sound Effects</p>
                <p className="setting-desc">Tactile clicks, bells, and chimes</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundFX}
              onChange={(e) => onUpdateSettings({ soundFX: e.target.checked })}
              className="toggle-checkbox"
            />
          </div>

          {/* Ambient Cosmic Wind */}
          <div className="setting-row">
            <div className="flex items-center gap-3">
              <Wind className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="setting-label">Ambient Breath</p>
                <p className="setting-desc">Atmospheric cosmic soundscape</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.ambientSound}
              onChange={(e) => onUpdateSettings({ ambientSound: e.target.checked })}
              className="toggle-checkbox"
            />
          </div>

          {/* Colorblind Mode */}
          <div className="setting-row">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-amber-400" />
              <div>
                <p className="setting-label">Colorblind Mode</p>
                <p className="setting-desc">Adds geometric symbols (●, ▲, ✕) to tiles</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.colorblindMode}
              onChange={(e) => onUpdateSettings({ colorblindMode: e.target.checked })}
              className="toggle-checkbox"
            />
          </div>

          {/* Reduced Motion */}
          <div className="setting-row">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-indigo-400" />
              <div>
                <p className="setting-label">Reduced Motion</p>
                <p className="setting-desc">Simplifies 3D camera transitions and spins</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
              className="toggle-checkbox"
            />
          </div>

          {/* High Contrast */}
          <div className="setting-row">
            <div className="flex items-center gap-3">
              <Contrast className="w-4 h-4 text-slate-300" />
              <div>
                <p className="setting-label">High Contrast</p>
                <p className="setting-desc">Enhances key outlines and grid edges</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => onUpdateSettings({ highContrast: e.target.checked })}
              className="toggle-checkbox"
            />
          </div>

          {/* Keyboard Dock Position */}
          <div className="setting-row">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="setting-label">Keyboard Position (Desktop)</p>
                <p className="setting-desc">Side-docked leaves 3D diorama fully unobstructed</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => onUpdateSettings({ keyboardPosition: 'left' })}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  settings.keyboardPosition === 'left'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Left
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ keyboardPosition: 'right' })}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  settings.keyboardPosition === 'right' || !settings.keyboardPosition
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Right
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ keyboardPosition: 'bottom' })}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  settings.keyboardPosition === 'bottom'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Bottom
              </button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500">
            WORDVERSE &bull; Crafted with Three.js & WebGL
          </p>
        </div>
      </div>
    </div>
  );
};
