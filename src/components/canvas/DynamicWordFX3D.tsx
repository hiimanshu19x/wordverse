import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ScreenFXType } from '../../game/reactions.ts';

interface DynamicWordFX3DProps {
  fx: ScreenFXType;
  reducedMotion: boolean;
}

export const DynamicWordFX3D: React.FC<DynamicWordFX3DProps> = ({ fx, reducedMotion }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const energyRef = useRef<number>(0);
  const prevFX = useRef<ScreenFXType>(null);

  // Trigger energy swell whenever fx changes
  if (fx && fx !== prevFX.current) {
    energyRef.current = 1.0;
    prevFX.current = fx;
  } else if (!fx) {
    prevFX.current = null;
  }

  useFrame((state, delta) => {
    if (!lightRef.current) return;

    if (energyRef.current > 0) {
      energyRef.current = Math.max(0, energyRef.current - delta * (reducedMotion ? 1.8 : 0.85));
    }

    const t = state.clock.getElapsedTime();
    const e = energyRef.current;

    switch (fx) {
      case 'lightning': {
        // High frequency erratic strobe bursts
        const strobe = Math.random() > 0.35 ? 1.0 : 0.15;
        const flash = (Math.sin(t * 45) > 0.1 ? 1.0 : 0.2) * strobe;
        lightRef.current.color.set('#bae6fd');
        lightRef.current.intensity = (8 + flash * 24) * e;
        lightRef.current.position.set(0, 4.5, 1.5);
        if (rimLightRef.current) {
          rimLightRef.current.color.set('#a855f7');
          rimLightRef.current.intensity = flash * 12 * e;
        }
        break;
      }
      case 'fire': {
        // Flickering warm flame
        const flicker = Math.sin(t * 16) * 0.3 + Math.cos(t * 27) * 0.2;
        lightRef.current.color.set('#f97316');
        lightRef.current.intensity = (6 + flicker * 5) * e;
        lightRef.current.position.set(0, -0.5, 0.5);
        if (rimLightRef.current) {
          rimLightRef.current.color.set('#ef4444');
          rimLightRef.current.intensity = 4 * e;
        }
        break;
      }
      case 'frost': {
        // Crystalline cool breathing cyan
        const breath = (Math.sin(t * 4) + 1) * 0.5;
        lightRef.current.color.set('#38bdf8');
        lightRef.current.intensity = (5 + breath * 4) * e;
        lightRef.current.position.set(0, 1.5, 0.5);
        if (rimLightRef.current) {
          rimLightRef.current.color.set('#e0f2fe');
          rimLightRef.current.intensity = 5 * e;
        }
        break;
      }
      case 'quake': {
        // Low subterranean rumble amber
        const rumble = Math.sin(t * 30) * 0.4;
        lightRef.current.color.set('#d97706');
        lightRef.current.intensity = (5 + rumble * 3) * e;
        lightRef.current.position.set(0, -2.5, 0);
        if (rimLightRef.current) {
          rimLightRef.current.color.set('#78350f');
          rimLightRef.current.intensity = 4 * e;
        }
        break;
      }
      case 'water': {
        // Deep oceanic aquamarine wave
        const wave = Math.sin(t * 6) * 0.5 + 0.5;
        lightRef.current.color.set('#06b6d4');
        lightRef.current.intensity = (5 + wave * 4) * e;
        lightRef.current.position.set(0, 0, 1);
        break;
      }
      case 'toxic': {
        // Searing acid lime glow
        lightRef.current.color.set('#22c55e');
        lightRef.current.intensity = (7 + Math.sin(t * 8) * 3) * e;
        lightRef.current.position.set(0, 0, 0.5);
        break;
      }
      case 'glitch': {
        // Stroboscopic RGB shift
        const isCyan = Math.floor(t * 20) % 2 === 0;
        lightRef.current.color.set(isCyan ? '#06b6d4' : '#ec4899');
        lightRef.current.intensity = 9 * Math.random() * e;
        lightRef.current.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
          1
        );
        break;
      }
      case 'blood': {
        // Demonic crimson eclipse
        lightRef.current.color.set('#ef4444');
        lightRef.current.intensity = (7 + Math.sin(t * 5) * 3) * e;
        lightRef.current.position.set(0, 1.2, 0.8);
        break;
      }
      case 'holy': {
        // Blinding celestial gold
        lightRef.current.color.set('#fef08a');
        lightRef.current.intensity = (12 + Math.sin(t * 5) * 4) * e;
        lightRef.current.position.set(0, 3.5, 1.2);
        break;
      }
      case 'portal': {
        // Swirling violet singularity
        lightRef.current.color.set('#a855f7');
        lightRef.current.intensity = (8 + Math.cos(t * 7) * 4) * e;
        lightRef.current.position.set(0, 0, -0.5);
        break;
      }
      case 'love': {
        // Warm romantic rose
        lightRef.current.color.set('#f43f5e');
        lightRef.current.intensity = (6 + Math.sin(t * 6) * 3) * e;
        lightRef.current.position.set(0, 0.5, 1);
        break;
      }
      case 'laser': {
        // Sharp neon cyan beam
        lightRef.current.color.set('#38bdf8');
        lightRef.current.intensity = (9 + Math.sin(t * 25) * 3) * e;
        lightRef.current.position.set(0, 0, 2);
        break;
      }
      case 'gold': {
        // Shimmering treasure gold
        lightRef.current.color.set('#eab308');
        lightRef.current.intensity = (8 + Math.sin(t * 10) * 3) * e;
        lightRef.current.position.set(0, 1, 1);
        break;
      }
      case 'runes': {
        // Arcane amethyst
        lightRef.current.color.set('#8b5cf6');
        lightRef.current.intensity = (7 + Math.sin(t * 8) * 3) * e;
        lightRef.current.position.set(0, 0.2, 0.8);
        break;
      }
      case 'sakura': {
        // Soft pastel cherry blossom
        lightRef.current.color.set('#f472b6');
        lightRef.current.intensity = (5 + Math.sin(t * 4) * 2) * e;
        lightRef.current.position.set(0, 1, 1);
        break;
      }
      default:
        lightRef.current.intensity = 0;
        if (rimLightRef.current) rimLightRef.current.intensity = 0;
        break;
    }
  });

  if (!fx && energyRef.current <= 0.01) return null;

  return (
    <>
      <pointLight ref={lightRef} distance={16} decay={2} />
      <pointLight ref={rimLightRef} position={[0, -2, -2]} distance={12} decay={2} />
    </>
  );
};
