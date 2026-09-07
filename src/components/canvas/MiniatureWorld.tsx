import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { WorldBiome, WorldReactionState, HiddenClue, CameraMode } from '../../types/game.ts';
import {
  CelestialBiome,
  ObservatoryBiome,
  CrystalBiome,
  CitadelBiome,
  OasisBiome
} from './Biomes.tsx';
import { NPCSystem } from './NPCSystem.tsx';
import { SemanticVFX } from './SemanticVFX.tsx';
import { HiddenClues } from './HiddenClues.tsx';

interface MiniatureWorldProps {
  biome: WorldBiome;
  stage: number;
  isWon: boolean;
  reducedMotion: boolean;
  reactionState?: WorldReactionState;
  clues?: HiddenClue[];
  onDiscoverClue?: (clue: HiddenClue) => void;
  position?: [number, number, number];
  scale?: [number, number, number] | number;
  mode?: CameraMode;
}

export const MiniatureWorld: React.FC<MiniatureWorldProps> = ({
  biome,
  stage,
  isWon,
  reducedMotion,
  reactionState,
  clues = [],
  onDiscoverClue = () => {},
  position = [0, -2.5, -2.6],
  scale = 1.0,
  mode = 'play'
}) => {
  const { width, height } = useThree((s) => s.size);
  const isMobile = width < 768 || width / height < 1.0;

  // Compute adaptive position and scale based on viewport and game mode
  let targetPos: [number, number, number] = position;
  let targetScale: number = typeof scale === 'number' ? scale : scale[0];

  if (isMobile) {
    if (mode === 'intro') {
      targetPos = [0, -0.6, 0];
      targetScale = 1.15;
    } else if (isWon || mode === 'won') {
      targetPos = [0, -0.7, 0];
      targetScale = 1.05;
    } else {
      // Active gameplay on mobile:
      // Position the diorama island low enough so that the Torii arch (top y=2.15),
      // luminous core ring, and spires NEVER overlap or clip through the 3D letter grid
      targetPos = [0, -4.3, -2.6];
      targetScale = 0.54;
    }
  } else {
    if (mode === 'intro') {
      targetPos = [0, -0.65, 0];
      targetScale = 1.25;
    } else if (isWon || mode === 'won') {
      targetPos = [0, -0.75, 0];
      targetScale = 1.15;
    } else {
      targetPos = [0, -3.1, -2.7];
      targetScale = 0.78;
    }
  }

  const worldGroupRef = useRef<THREE.Group>(null);
  const winBeamRef = useRef<THREE.Mesh>(null);
  const nearMissBeaconRef = useRef<THREE.PointLight>(null);

  const physics = reactionState?.physics || {
    gravity: 1.0,
    scale: 1.0,
    speed: 1.0,
    brightness: 1.0
  };

  useFrame((state, delta) => {
    if (!worldGroupRef.current) return;
    const time = state.clock.getElapsedTime() * physics.speed;

    // Smoothly lerp towards target position and scale
    const lerpRate = reducedMotion ? 1.0 : Math.min(1.0, delta * 3.5);
    worldGroupRef.current.position.x = THREE.MathUtils.lerp(
      worldGroupRef.current.position.x,
      targetPos[0],
      lerpRate
    );
    const floatAmp = (!reducedMotion && mode !== 'play') ? 0.08 * physics.gravity : 0.02;
    const targetY = targetPos[1] + (reducedMotion ? 0 : Math.sin(time * 0.8) * floatAmp);
    worldGroupRef.current.position.y = THREE.MathUtils.lerp(
      worldGroupRef.current.position.y,
      targetY,
      lerpRate
    );
    worldGroupRef.current.position.z = THREE.MathUtils.lerp(
      worldGroupRef.current.position.z,
      targetPos[2],
      lerpRate
    );

    const currentScale = worldGroupRef.current.scale.x;
    const finalTargetScale = targetScale * physics.scale;
    const nextScale = THREE.MathUtils.lerp(currentScale, finalTargetScale, lerpRate);
    worldGroupRef.current.scale.set(nextScale, nextScale, nextScale);

    // Ambient rotation
    if (!reducedMotion) {
      worldGroupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
    }

    // Near-miss surge glow
    if (nearMissBeaconRef.current) {
      if (reactionState?.nearMiss && !isWon) {
        nearMissBeaconRef.current.intensity = 2.5 + Math.sin(time * 8) * 1.5;
      } else {
        nearMissBeaconRef.current.intensity = 0;
      }
    }

    // Victory sky beam expansion
    if (winBeamRef.current && isWon) {
      winBeamRef.current.scale.y = THREE.MathUtils.lerp(winBeamRef.current.scale.y, 1.0, delta * 3);
      winBeamRef.current.rotation.y += delta * 0.5;
    }
  });

  const renderBiome = () => {
    switch (biome) {
      case 'celestial':
        return <CelestialBiome stage={stage} isWon={isWon} reducedMotion={reducedMotion} />;
      case 'observatory':
        return <ObservatoryBiome stage={stage} isWon={isWon} reducedMotion={reducedMotion} />;
      case 'crystal':
        return <CrystalBiome stage={stage} isWon={isWon} reducedMotion={reducedMotion} />;
      case 'citadel':
        return <CitadelBiome stage={stage} isWon={isWon} reducedMotion={reducedMotion} />;
      case 'oasis':
        return <OasisBiome stage={stage} isWon={isWon} reducedMotion={reducedMotion} />;
      default:
        return <CelestialBiome stage={stage} isWon={isWon} reducedMotion={reducedMotion} />;
    }
  };

  const finalScale = targetScale * physics.scale;

  return (
    <group
      ref={worldGroupRef}
      position={targetPos}
      scale={finalScale}
    >
      {/* 1. Biome Architecture Foundation */}
      {renderBiome()}

      {/* 2. Living NPCs (Wanderer & Spirit Automaton) */}
      <NPCSystem
        stage={stage}
        nearMiss={reactionState?.nearMiss || false}
        isWon={isWon}
        reducedMotion={reducedMotion}
      />

      {/* 3. Semantic Environmental VFX (Fire, Rain, Flora, Moon, Waves) */}
      <SemanticVFX
        activeEffects={reactionState?.activeEffects || []}
        isWon={isWon}
        reducedMotion={reducedMotion}
      />

      {/* 4. Interactive Hidden Word Clues */}
      <HiddenClues
        clues={clues}
        onDiscoverClue={onDiscoverClue}
        reducedMotion={reducedMotion}
      />

      {/* 5. Near-Miss Excitement Surge Beacon */}
      <pointLight
        ref={nearMissBeaconRef}
        position={[0, 0.8, 0]}
        color="#fbbf24"
        distance={4.5}
        intensity={0}
      />

      {/* 6. Triumphant World Stabilization Sky Beam */}
      {isWon && (
        <mesh
          ref={winBeamRef}
          position={[0, 4.5, -0.4]}
          scale={[1, 0.01, 1]}
        >
          <cylinderGeometry args={[0.3, 0.6, 9.0, 16]} />
          <meshBasicMaterial
            color="#34d399"
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};
