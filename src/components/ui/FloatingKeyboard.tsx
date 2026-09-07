import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Delete, PanelLeft, PanelRight, GripHorizontal, RotateCcw } from 'lucide-react';
import type { LetterStatus } from '../../types/game.ts';
import { soundManager } from '../../audio/soundManager.ts';

interface FloatingKeyboardProps {
  onChar: (char: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  letterStatuses: Record<string, LetterStatus>;
  disabled: boolean;
  colorblindMode: boolean;
  dockPosition?: 'right' | 'left' | 'bottom';
  onToggleDock?: (newPos: 'right' | 'left' | 'bottom') => void;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export const FloatingKeyboard: React.FC<FloatingKeyboardProps> = ({
  onChar,
  onEnter,
  onBackspace,
  letterStatuses,
  disabled,
  colorblindMode,
  dockPosition = 'right',
  onToggleDock
}) => {
  // Movable Floating Keyboard state
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [customPos, setCustomPos] = useState<{ x: number; y: number } | null>(() => {
    try {
      const saved = localStorage.getItem('wordverse_keyboard_pos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!keyboardRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const rect = keyboardRef.current.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: rect.left,
      initY: rect.top
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragRef.current || !keyboardRef.current) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    const width = keyboardRef.current.offsetWidth || 400;
    const height = keyboardRef.current.offsetHeight || 180;

    const clampedX = Math.max(8, Math.min(window.innerWidth - width - 8, dragRef.current.initX + dx));
    const clampedY = Math.max(50, Math.min(window.innerHeight - height - 8, dragRef.current.initY + dy));

    setCustomPos({ x: clampedX, y: clampedY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setIsDragging(false);
    dragRef.current = null;
    if (customPos) {
      localStorage.setItem('wordverse_keyboard_pos', JSON.stringify(customPos));
    }
  };

  const handleResetDock = (dock: 'left' | 'right' | 'bottom') => {
    setCustomPos(null);
    localStorage.removeItem('wordverse_keyboard_pos');
    if (onToggleDock) onToggleDock(dock);
  };

  const handleKeyClick = useCallback(
    (key: string) => {
      if (disabled) return;
      soundManager.userInteracted();

      if (key === 'ENTER') {
        soundManager.playKeyClick();
        onEnter();
      } else if (key === 'BACKSPACE') {
        soundManager.playKeyDelete();
        onBackspace();
      } else {
        soundManager.playKeyClick(key);
        onChar(key);
      }
    },
    [disabled, onChar, onEnter, onBackspace]
  );

  // Physical keyboard listener for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'ENTER') {
        e.preventDefault();
        handleKeyClick('ENTER');
      } else if (key === 'BACKSPACE' || key === 'DELETE') {
        e.preventDefault();
        handleKeyClick('BACKSPACE');
      } else if (/^[A-Z]$/.test(key)) {
        e.preventDefault();
        handleKeyClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, handleKeyClick]);

  const getKeyClass = (key: string) => {
    if (key === 'ENTER') {
      return 'key-action key-enter';
    }
    if (key === 'BACKSPACE') {
      return 'key-action key-backspace';
    }

    const status = letterStatuses[key];
    switch (status) {
      case 'correct':
        return 'key-correct';
      case 'misplaced':
        return 'key-misplaced';
      case 'absent':
        return 'key-absent';
      default:
        return 'key-default';
    }
  };

  const getColorblindBadge = (key: string) => {
    if (!colorblindMode || key === 'ENTER' || key === 'BACKSPACE') return null;
    const status = letterStatuses[key];
    if (status === 'correct') return <span className="key-cb-badge">●</span>;
    if (status === 'misplaced') return <span className="key-cb-badge">▲</span>;
    if (status === 'absent') return <span className="key-cb-badge">✕</span>;
    return null;
  };

  const dockClass =
    dockPosition === 'left'
      ? 'keyboard-dock-left'
      : dockPosition === 'bottom'
      ? 'keyboard-dock-bottom'
      : 'keyboard-dock-right';

  return (
    <div
      ref={keyboardRef}
      className={`keyboard-container ${!isMobile && customPos ? 'keyboard-custom-floating' : dockClass} ${isDragging ? 'is-dragging' : ''}`}
      style={
        !isMobile && customPos
          ? {
              position: 'fixed',
              left: `${customPos.x}px`,
              top: `${customPos.y}px`,
              right: 'auto',
              bottom: 'auto',
              transform: 'none',
              zIndex: 35
            }
          : undefined
      }
      role="group"
      aria-label="Virtual Keyboard"
    >
      <div className="keyboard-chassis">
        {/* Movable Drag Handle & Dock Controls Bar - Desktop only */}
        {!isMobile && (
          <div
            className="keyboard-dock-bar keyboard-drag-handle"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            title="Drag anywhere to move keyboard"
          >
            <div className="flex items-center gap-1.5 pointer-events-none">
              <GripHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="keyboard-dock-title">
                {customPos ? 'FLOATING KEYBOARD' : 'KEYBOARD (DRAG TO MOVE)'}
              </span>
            </div>

            <div className="keyboard-dock-controls" onPointerDown={(e) => e.stopPropagation()}>
              {customPos && (
                <button
                  onClick={() => {
                    soundManager.playKeyClick();
                    handleResetDock(dockPosition);
                  }}
                  className="keyboard-dock-btn"
                  title="Reset to default dock"
                  type="button"
                >
                  <RotateCcw className="w-3 h-3 text-slate-400" />
                  <span>RESET</span>
                </button>
              )}
              <button
                onClick={() => {
                  soundManager.playKeyClick();
                  handleResetDock('left');
                }}
                className={`keyboard-dock-btn ${!customPos && dockPosition === 'left' ? 'active' : ''}`}
                title="Dock keyboard to the left"
                type="button"
              >
                <PanelLeft className="w-3 h-3" />
                <span>LEFT</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playKeyClick();
                  handleResetDock('right');
                }}
                className={`keyboard-dock-btn ${!customPos && dockPosition === 'right' ? 'active' : ''}`}
                title="Dock keyboard to the right"
                type="button"
              >
                <span>RIGHT</span>
                <PanelRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => {
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKeyClick(key)}
                  disabled={disabled}
                  className={`keyboard-key ${getKeyClass(key)}`}
                  aria-label={key === 'BACKSPACE' ? 'Delete letter' : key === 'ENTER' ? 'Submit word' : key}
                >
                  {key === 'ENTER' ? (
                    <span className="key-enter-label">ENTER</span>
                  ) : key === 'BACKSPACE' ? (
                    <Delete className="w-4 h-4" />
                  ) : (
                    <span>{key}</span>
                  )}
                  {getColorblindBadge(key)}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
