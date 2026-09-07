import React from 'react';
import type { ScreenFXType } from '../../game/reactions.ts';

interface ScreenFXOverlayProps {
  fx: ScreenFXType;
  triggerKey: number;
}

export const ScreenFXOverlay: React.FC<ScreenFXOverlayProps> = ({ fx, triggerKey }) => {
  if (!fx) return null;

  return (
    <div
      key={`${fx}-${triggerKey}`}
      className={`screen-fx-overlay fx-${fx}`}
      aria-hidden="true"
    >
      {/* 1. LIGHTNING / SHOCK FX */}
      {fx === 'lightning' && (
        <>
          {/* Strobe flash overlay */}
          <div className="fx-lightning-strobe" />

          {/* Searing Procedural SVG Lightning Bolts */}
          <svg className="fx-lightning-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <filter id="lightningGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main Central Lightning Strike */}
            <path
              d="M 520,0 L 480,180 L 540,240 L 460,420 L 530,480 L 450,680 L 510,750 L 480,1000"
              stroke="#7dd3fc"
              strokeWidth="10"
              fill="none"
              filter="url(#lightningGlow)"
              className="fx-bolt-primary"
            />
            <path
              d="M 520,0 L 480,180 L 540,240 L 460,420 L 530,480 L 450,680 L 510,750 L 480,1000"
              stroke="#ffffff"
              strokeWidth="4"
              fill="none"
              className="fx-bolt-core"
            />

            {/* Left Branch Strike */}
            <path
              d="M 480,180 L 320,310 L 370,360 L 260,520 L 310,580 L 200,820"
              stroke="#c084fc"
              strokeWidth="6"
              fill="none"
              filter="url(#lightningGlow)"
              className="fx-bolt-branch-1"
            />
            <path
              d="M 480,180 L 320,310 L 370,360 L 260,520 L 310,580 L 200,820"
              stroke="#ffffff"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Right Branch Strike */}
            <path
              d="M 460,420 L 640,530 L 590,600 L 740,750 L 690,820 L 800,1000"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              filter="url(#lightningGlow)"
              className="fx-bolt-branch-2"
            />
            <path
              d="M 460,420 L 640,530 L 590,600 L 740,750 L 690,820 L 800,1000"
              stroke="#ffffff"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>

          {/* Electric Cyan/Purple Edge Vignette */}
          <div className="fx-lightning-vignette" />
        </>
      )}

      {/* 2. FIRE / FLAME FX */}
      {fx === 'fire' && (
        <>
          <div className="fx-fire-vignette" />
          <div className="fx-fire-embers-screen">
            {[...Array(24)].map((_, i) => (
              <span
                key={i}
                className="fx-screen-ember"
                style={{
                  left: `${(i * 4.3 + 2) % 96}%`,
                  animationDelay: `${(i * 0.08) % 1.2}s`,
                  animationDuration: `${0.8 + (i % 5) * 0.2}s`
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* 3. FROST / BLIZZARD FX */}
      {fx === 'frost' && (
        <>
          <div className="fx-frost-vignette" />
          <div className="fx-frost-mist" />
        </>
      )}

      {/* 4. EARTHQUAKE / QUAKE FX */}
      {fx === 'quake' && (
        <>
          <div className="fx-quake-dust" />
        </>
      )}

      {/* 5. WATER / DELUGE FX */}
      {fx === 'water' && (
        <>
          <div className="fx-water-wash" />
          <div className="fx-water-ripples" />
        </>
      )}

      {/* 6. TOXIC / ACID MIASMA FX */}
      {fx === 'toxic' && (
        <>
          <div className="fx-toxic-vignette" />
          <div className="fx-toxic-bubbles" />
        </>
      )}

      {/* 7. GLITCH / CYBER CHAOS FX */}
      {fx === 'glitch' && (
        <>
          <div className="fx-glitch-lines" />
          <div className="fx-glitch-rgb-split" />
        </>
      )}

      {/* 8. BLOOD / CRIMSON ECLIPSE FX */}
      {fx === 'blood' && (
        <>
          <div className="fx-blood-vignette" />
        </>
      )}

      {/* 9. HOLY / DIVINE RADIANCE FX */}
      {fx === 'holy' && (
        <>
          <div className="fx-holy-flare" />
        </>
      )}

      {/* 10. PORTAL / VOID WORMHOLE FX */}
      {fx === 'portal' && (
        <>
          <div className="fx-portal-vortex" />
        </>
      )}

      {/* 11. LOVE / HEARTS FX */}
      {fx === 'love' && (
        <div className="fx-love-burst">
          {[...Array(16)].map((_, i) => (
            <span
              key={i}
              className="fx-heart-particle"
              style={{
                left: `${15 + (i * 5.2) % 70}%`,
                animationDelay: `${(i * 0.07) % 0.8}s`
              }}
            >
              💖
            </span>
          ))}
        </div>
      )}

      {/* 12. LASER BEAM FX */}
      {fx === 'laser' && (
        <>
          <div className="fx-laser-beam beam-1" />
          <div className="fx-laser-beam beam-2" />
        </>
      )}

      {/* 13. GOLD / MIDAS FX */}
      {fx === 'gold' && (
        <div className="fx-gold-shower">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="fx-gold-sparkle"
              style={{
                left: `${(i * 5 + 3) % 94}%`,
                animationDelay: `${(i * 0.06) % 0.7}s`
              }}
            >
              ✨
            </span>
          ))}
        </div>
      )}

      {/* 14. RUNES / ARCANE FX */}
      {fx === 'runes' && (
        <div className="fx-runic-mandala" />
      )}

      {/* 15. SAKURA BLOSSOM FX */}
      {fx === 'sakura' && (
        <div className="fx-sakura-storm">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="fx-sakura-petal"
              style={{
                left: `${(i * 5 + 2) % 96}%`,
                animationDelay: `${(i * 0.09) % 0.9}s`
              }}
            >
              🌸
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
