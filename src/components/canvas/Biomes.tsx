import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BiomeProps {
  stage: number; // 0 to 5 (number of correct letters discovered)
  isWon: boolean;
  reducedMotion: boolean;
}

/**
 * CELESTIAL SANCTUARY BIOME
 * White marble, obsidian, torii gateway, zen stones, glowing beacon pillars
 */
export const CelestialBiome: React.FC<BiomeProps> = ({ stage, isWon, reducedMotion }) => {
  const archRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3;
    }
    if (archRef.current && isWon) {
      archRef.current.position.y = Math.sin(time * 1.5) * 0.12 + 0.5;
    }
  });

  return (
    <group>
      {/* Floating Base Island */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.2, 1.8, 1.2, 7]} />
        <meshStandardMaterial color="#1a1e28" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Obsidian Stepped Terrace */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.7, 0.3, 7]} />
        <meshStandardMaterial color="#0f131a" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Central Sanctuary Arch / Torii Gateway */}
      <group ref={archRef} position={[0, 0.5, -0.6]}>
        {/* Left Pillar */}
        <mesh position={[-0.8, 0.8, 0]} castShadow>
          <boxGeometry args={[0.22, 1.6, 0.22]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Right Pillar */}
        <mesh position={[0.8, 0.8, 0]} castShadow>
          <boxGeometry args={[0.22, 1.6, 0.22]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Top Beam */}
        <mesh position={[0, 1.65, 0]} castShadow>
          <boxGeometry args={[2.1, 0.2, 0.28]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Luminous Core Ring inside Arch */}
        <mesh ref={ringRef} position={[0, 0.8, 0]}>
          <torusGeometry args={[0.55, 0.04, 16, 32]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={isWon ? 2.5 : stage > 2 ? 1.0 : 0.2}
          />
        </mesh>
      </group>

      {/* 5 Reactive Celestial Beacon Spires */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((xPos, idx) => {
        const isActive = idx < stage || isWon;
        return (
          <group key={idx} position={[xPos, 0.25, 0.8 - Math.abs(xPos) * 0.3]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.08, 0.12, 0.5, 5]} />
              <meshStandardMaterial color="#1e293b" roughness={0.6} />
            </mesh>
            {/* Luminous Gem atop spire */}
            <mesh position={[0, 0.36, 0]}>
              <octahedronGeometry args={[0.14, 0]} />
              <meshStandardMaterial
                color={isActive ? '#34d399' : '#334155'}
                emissive={isActive ? '#10b981' : '#0f172a'}
                emissiveIntensity={isActive ? (isWon ? 2.8 : 1.4) : 0.0}
              />
            </mesh>
          </group>
        );
      })}

      {/* Tranquil Mirror Basin */}
      <mesh position={[0, 0.26, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 16]} />
        <meshStandardMaterial
          color="#064e3b"
          roughness={0.1}
          metalness={0.9}
          emissive="#059669"
          emissiveIntensity={stage > 0 ? 0.4 : 0.05}
        />
      </mesh>
    </group>
  );
};

/**
 * SUNKEN OBSERVATORY BIOME
 * Weathered brass astrolabe armillary rings, sandstone dome, stellar orbs
 */
export const ObservatoryBiome: React.FC<BiomeProps> = ({ stage, isWon, reducedMotion }) => {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const starCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const speed = isWon ? 2.5 : 0.8;
    if (outerRingRef.current) outerRingRef.current.rotation.y += delta * speed * 0.4;
    if (midRingRef.current) midRingRef.current.rotation.x += delta * speed * 0.6;
    if (innerRingRef.current) innerRingRef.current.rotation.z += delta * speed * 0.8;
    if (starCoreRef.current) {
      const scale = (isWon ? 1.4 : 1.0) + Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
      starCoreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Stepped Sandstone Foundation */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.0, 1.7, 1.2, 8]} />
        <meshStandardMaterial color="#2d2218" roughness={0.8} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2.3, 2.4, 0.2, 8]} />
        <meshStandardMaterial color="#453123" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Astrolabe Armillary Structure */}
      <group position={[0, 1.2, -0.2]}>
        {/* Outer Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[1.1, 0.045, 16, 40]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Mid Ring */}
        <mesh ref={midRingRef}>
          <torusGeometry args={[0.85, 0.04, 16, 36]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Inner Ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[0.6, 0.035, 16, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Luminous Star Core */}
        <mesh ref={starCoreRef}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#f59e0b"
            emissiveIntensity={isWon ? 3.0 : stage > 1 ? 1.2 : 0.3}
          />
        </mesh>
      </group>

      {/* 5 Astrolabe Markers */}
      {[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => {
        const active = i < stage || isWon;
        return (
          <mesh key={i} position={[x, 0.3, 0.9]} castShadow>
            <cylinderGeometry args={[0.07, 0.1, 0.4, 6]} />
            <meshStandardMaterial
              color={active ? '#f59e0b' : '#3a2e24'}
              emissive={active ? '#d97706' : '#000000'}
              emissiveIntensity={active ? 1.5 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * CRYSTAL GROVE BIOME
 * Prismatic spires, low-poly pines, floating crystal shards, amethyst beacons
 */
export const CrystalBiome: React.FC<BiomeProps> = ({ stage, isWon, reducedMotion }) => {
  const crystalClusterRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (reducedMotion) return;
    if (crystalClusterRef.current) {
      crystalClusterRef.current.rotation.y += delta * (isWon ? 0.8 : 0.2);
    }
  });

  return (
    <group>
      {/* Dark Geode Island Base */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.1, 1.6, 1.2, 6]} />
        <meshStandardMaterial color="#1a1424" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Central Floating Crystal Cluster */}
      <group ref={crystalClusterRef} position={[0, 1.1, -0.3]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={isWon ? 3.0 : stage > 2 ? 1.5 : 0.3}
            roughness={0.15}
            metalness={0.6}
          />
        </mesh>
        <mesh position={[-0.45, -0.2, 0.2]} castShadow>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={isWon ? 2.5 : stage > 1 ? 1.2 : 0.2}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.45, -0.25, -0.15]} castShadow>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color="#e879f9"
            emissive="#c026d3"
            emissiveIntensity={isWon ? 2.5 : stage > 3 ? 1.2 : 0.2}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Low-Poly Geometric Pines */}
      {[
        [-1.2, 0.3, 0.4, 0.8],
        [1.3, 0.3, 0.5, 0.9],
        [-0.7, 0.2, 0.9, 0.7],
        [0.8, 0.2, 0.8, 0.75]
      ].map(([x, y, z, s], idx) => (
        <group key={idx} position={[x, y, z]} scale={[s, s, s]}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.09, 0.4, 5]} />
            <meshStandardMaterial color="#2e1065" />
          </mesh>
          <mesh position={[0, 0.55, 0]} castShadow>
            <coneGeometry args={[0.35, 0.65, 5]} />
            <meshStandardMaterial
              color={stage > idx ? '#6b21a8' : '#3b0764'}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <coneGeometry args={[0.26, 0.5, 5]} />
            <meshStandardMaterial
              color={stage > idx ? '#7e22ce' : '#4c1d95'}
              roughness={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/**
 * AEON CITADEL BIOME
 * Basalt pillars, levitating black pyramid, glowing cyan energy runes
 */
export const CitadelBiome: React.FC<BiomeProps> = ({ stage, isWon, reducedMotion }) => {
  const pyramidRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (pyramidRef.current) {
      pyramidRef.current.rotation.y += delta * (isWon ? 1.0 : 0.3);
      pyramidRef.current.position.y = 1.2 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Hexagonal Basalt Foundation */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.2, 2.0, 1.2, 6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Levitating Monolith Pyramid */}
      <mesh ref={pyramidRef} position={[0, 1.2, -0.2]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.85, 1.4, 4]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.15}
          metalness={0.85}
          emissive="#06b6d4"
          emissiveIntensity={isWon ? 2.5 : stage > 2 ? 1.0 : 0.15}
        />
      </mesh>

      {/* Concentric Energy Runes */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.4, 1.8, 6]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={isWon ? 2.2 : stage > 0 ? stage * 0.3 : 0.1}
          wireframe
        />
      </mesh>

      {/* 5 Monolithic Spires */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((x, i) => {
        const active = i < stage || isWon;
        return (
          <mesh key={i} position={[x, 0.35, 0.8]} castShadow>
            <boxGeometry args={[0.18, 0.7, 0.18]} />
            <meshStandardMaterial
              color="#334155"
              emissive={active ? '#22d3ee' : '#0f172a'}
              emissiveIntensity={active ? 1.8 : 0}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * VERDANT OASIS BIOME
 * Terraced moss rocks, tranquil water basin, stylized low-poly bonsai, glowing fireflies
 */
export const OasisBiome: React.FC<BiomeProps> = ({ stage, isWon, reducedMotion }) => {
  const foliageRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (foliageRef.current) {
      foliageRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Terraced Rock Base */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.2, 1.8, 1.2, 8]} />
        <meshStandardMaterial color="#1c1917" roughness={0.9} />
      </mesh>

      {/* Mossy Terrace */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.7, 0.25, 8]} />
        <meshStandardMaterial color="#14532d" roughness={0.8} />
      </mesh>

      {/* Central Bonsai Tree */}
      <group position={[0.4, 0.2, -0.4]}>
        {/* Trunk */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.18, 0.8, 6]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>
        {/* Foliage Clouds */}
        <group ref={foliageRef} position={[0, 0.9, 0]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <sphereGeometry args={[0.55, 8, 8]} />
            <meshStandardMaterial
              color={isWon ? '#22c55e' : stage > 2 ? '#16a34a' : '#15803d'}
              emissive="#15803d"
              emissiveIntensity={isWon ? 1.5 : 0.2}
              roughness={0.7}
            />
          </mesh>
          <mesh position={[-0.35, -0.1, 0.15]} castShadow>
            <sphereGeometry args={[0.38, 7, 7]} />
            <meshStandardMaterial color="#16a34a" roughness={0.7} />
          </mesh>
          <mesh position={[0.35, -0.1, -0.15]} castShadow>
            <sphereGeometry args={[0.36, 7, 7]} />
            <meshStandardMaterial color="#15803d" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Tranquil Waterfall Basin */}
      <mesh position={[-0.5, 0.2, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 16]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#38bdf8"
          emissiveIntensity={isWon ? 1.8 : stage > 1 ? 0.6 : 0.1}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* 5 Stepping Zen Stones */}
      {[-1.3, -0.7, -0.1, 0.6, 1.2].map((x, i) => {
        const active = i < stage || isWon;
        return (
          <mesh key={i} position={[x, 0.22, 0.9 - Math.abs(x) * 0.2]} castShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.12, 6]} />
            <meshStandardMaterial
              color={active ? '#22c55e' : '#292524'}
              emissive={active ? '#16a34a' : '#000000'}
              emissiveIntensity={active ? 1.2 : 0}
              roughness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};
