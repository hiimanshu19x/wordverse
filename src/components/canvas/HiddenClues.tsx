import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { HiddenClue } from '../../types/game.ts';
import { soundManager } from '../../audio/soundManager.ts';

interface HiddenCluesProps {
  clues: HiddenClue[];
  onDiscoverClue: (clue: HiddenClue) => void;
  reducedMotion: boolean;
}

export const HiddenClues: React.FC<HiddenCluesProps> = ({
  clues,
  onDiscoverClue,
  reducedMotion
}) => {
  return (
    <group>
      {clues.map((clue) => (
        <ClueRelic
          key={clue.id}
          clue={clue}
          onDiscover={onDiscoverClue}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
};

interface ClueRelicProps {
  clue: HiddenClue;
  onDiscover: (clue: HiddenClue) => void;
  reducedMotion: boolean;
}

const ClueRelic: React.FC<ClueRelicProps> = ({
  clue,
  onDiscover,
  reducedMotion
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = clue.position[1] + Math.sin(time * 2) * 0.02;
    meshRef.current.rotation.y = time * 0.5;
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    soundManager.playSecretDiscovered();
    onDiscover(clue);
  };

  return (
    <group
      ref={meshRef}
      position={clue.position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Ancient Inscribed Relic Geode */}
      <mesh castShadow>
        <octahedronGeometry args={[0.09, 0]} />
        <meshStandardMaterial
          color={hovered ? '#f59e0b' : '#38bdf8'}
          emissive={hovered ? '#d97706' : '#0284c7'}
          emissiveIntensity={hovered ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Rotating Astrolabe Halo Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.13, 0.01, 8, 24]} />
        <meshBasicMaterial
          color={hovered ? '#fbbf24' : '#38bdf8'}
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>
    </group>
  );
};
