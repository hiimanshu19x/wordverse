import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import type { SolvedWorld, WorldBiome } from '../../types/game.ts';

interface GalaxyView3DProps {
  worlds: SolvedWorld[];
  onSelectWorld: (world: SolvedWorld) => void;
  selectedWorld: SolvedWorld | null;
  reducedMotion: boolean;
  streak?: number;
}

const BIOME_COLORS: Record<WorldBiome, { base: string; glow: string }> = {
  celestial: { base: '#38bdf8', glow: '#0284c7' },
  observatory: { base: '#fbbf24', glow: '#d97706' },
  crystal: { base: '#c084fc', glow: '#9333ea' },
  citadel: { base: '#22d3ee', glow: '#0891b2' },
  oasis: { base: '#4ade80', glow: '#16a34a' }
};

export const GalaxyView3D: React.FC<GalaxyView3DProps> = ({
  worlds,
  onSelectWorld,
  selectedWorld,
  reducedMotion,
  streak = 1
}) => {
  const galaxyGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (galaxyGroupRef.current) {
      galaxyGroupRef.current.rotation.y += delta * 0.05;
    }

    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 2) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={galaxyGroupRef} position={[0, 0, 0]}>
      {/* Central Luminous Cosmic Core (The Starlight Nexus) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#fef08a"
          emissive="#f59e0b"
          emissiveIntensity={1.35}
          roughness={0.25}
        />
      </mesh>
      {/* Radiant Glowing Corona */}
      <mesh scale={1.22} position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* --- VISUAL STREAK PROGRESSION (Player's Growing Civilization) --- */}
      {/* Level 1: Solitary Primordial Isle floating gracefully below the star */}
      <group position={[0, -1.1, 0]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[1.0, 0.5, 0.28, 7]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Level 3: Ancient Verdant Monoliths & Trees */}
        {streak >= 3 && (
          <group position={[0, 0.25, 0]}>
            <mesh position={[-0.45, 0.15, -0.3]} castShadow>
              <coneGeometry args={[0.15, 0.4, 5]} />
              <meshStandardMaterial color="#10b981" roughness={0.4} />
            </mesh>
            <mesh position={[0.45, 0.15, -0.3]} castShadow>
              <coneGeometry args={[0.12, 0.35, 5]} />
              <meshStandardMaterial color="#059669" roughness={0.4} />
            </mesh>
          </group>
        )}

        {/* Level 5: Village Cottages & Lantern Spires */}
        {streak >= 5 && (
          <group position={[0, 0.2, 0]}>
            <mesh position={[0.4, 0.1, 0.3]} castShadow>
              <boxGeometry args={[0.2, 0.18, 0.2]} />
              <meshStandardMaterial color="#d97706" />
            </mesh>
            <mesh position={[-0.4, 0.1, 0.3]} castShadow>
              <boxGeometry args={[0.18, 0.15, 0.18]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
          </group>
        )}

        {/* Level 10+: Citadel Spires & Watchtower */}
        {streak >= 10 && (
          <group position={[0, 0.35, 0]}>
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.85, 0]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2} />
            </mesh>
          </group>
        )}
      </group>

      {/* Subtle Orbital Dust Rings */}
      {[2.2, 3.4, 4.6, 5.8].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.12 + i * 0.03}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Orbiting Solved Worlds */}
      {worlds.map((world, idx) => {
        const orbitRadius = 2.2 + (idx % 4) * 1.1;
        const angle = (idx / Math.max(1, worlds.length)) * Math.PI * 2 + (idx * 0.35);
        const x = Math.cos(angle) * orbitRadius;
        const z = Math.sin(angle) * orbitRadius;
        const y = Math.sin(idx * 1.2) * 0.25;

        const isSelected = selectedWorld?.id === world.id;
        const isHovered = hoveredId === world.id;
        const colors = BIOME_COLORS[world.biome] || BIOME_COLORS.celestial;

        return (
          <group
            key={world.id}
            position={[x, y, z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectWorld(world);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(world.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredId(null);
              document.body.style.cursor = 'default';
            }}
          >
            {/* World Miniature Planet */}
            <mesh castShadow receiveShadow scale={isSelected || isHovered ? [1.25, 1.25, 1.25] : [1, 1, 1]}>
              <sphereGeometry args={[0.3, 24, 24]} />
              <meshStandardMaterial
                color={colors.base}
                emissive={colors.glow}
                emissiveIntensity={isSelected || isHovered ? 2.2 : 0.8}
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>

            {/* Atmosphere Aura */}
            <mesh scale={[1.35, 1.35, 1.35]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial
                color={colors.base}
                transparent
                opacity={isSelected ? 0.45 : isHovered ? 0.35 : 0.12}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* World Label Billboard - appears crisp on hover or selection */}
            {(isHovered || isSelected) && (
              <Billboard position={[0, 0.65, 0]}>
                <Text
                  fontSize={0.22}
                  color={isSelected ? '#34d399' : '#ffffff'}
                  anchorX="center"
                  anchorY="bottom"
                  outlineWidth={0.02}
                  outlineColor="#05070a"
                >
                  {`#${world.dayNumber} ${world.word}`}
                </Text>
              </Billboard>
            )}
          </group>
        );
      })}
    </group>
  );
};
