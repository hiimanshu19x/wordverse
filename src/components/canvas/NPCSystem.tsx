import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NPCSystemProps {
  stage: number;
  nearMiss: boolean;
  isWon: boolean;
  reducedMotion: boolean;
}

export const NPCSystem: React.FC<NPCSystemProps> = ({
  stage,
  nearMiss,
  isWon,
  reducedMotion
}) => {
  // NPC 1: The Lantern Wanderer
  const wandererRef = useRef<THREE.Group>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const exclaimRef = useRef<THREE.Mesh>(null);

  // NPC 2: The Curious Automaton Spirit
  const spiritRef = useRef<THREE.Group>(null);
  const spiritOrbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    // --- WANDERER LOGIC ---
    if (wandererRef.current) {
      if (isWon) {
        // Joyful celebration hops
        wandererRef.current.position.y = 0.26 + Math.abs(Math.sin(time * 6)) * 0.14;
        wandererRef.current.rotation.y = time * 3;
      } else if (nearMiss) {
        // Alert paused posture facing up
        wandererRef.current.position.y = 0.26 + Math.sin(time * 8) * 0.02;
        wandererRef.current.rotation.y = Math.PI / 4;
      } else if (stage >= 3) {
        // Paused, holding lantern high
        wandererRef.current.position.y = 0.26;
        wandererRef.current.rotation.y = Math.sin(time * 0.5) * 0.2 + 0.3;
      } else {
        // Gentle patrol along curved terrace arc
        const patrolAngle = Math.sin(time * 0.4) * 0.6 + 0.5;
        const radius = 1.6;
        wandererRef.current.position.x = Math.sin(patrolAngle) * radius;
        wandererRef.current.position.z = Math.cos(patrolAngle) * radius * 0.5 + 0.4;
        wandererRef.current.position.y = 0.26 + Math.abs(Math.sin(time * 4)) * 0.02; // subtle footstep bob
        wandererRef.current.rotation.y = Math.cos(time * 0.4) > 0 ? patrolAngle + Math.PI / 2 : patrolAngle - Math.PI / 2;
      }
    }

    // Exclamation badge for nearMiss
    if (exclaimRef.current) {
      if (nearMiss && !isWon) {
        exclaimRef.current.visible = true;
        exclaimRef.current.scale.setScalar(1.0 + Math.sin(time * 10) * 0.2);
        exclaimRef.current.position.y = 0.48 + Math.sin(time * 5) * 0.02;
      } else {
        exclaimRef.current.visible = false;
      }
    }

    // Lantern light pulse
    if (lanternLightRef.current) {
      const pulse = stage >= 3 || nearMiss || isWon ? 1.4 : 0.8;
      lanternLightRef.current.intensity = pulse + Math.sin(time * 5) * 0.2;
    }

    // --- SPIRIT AUTOMATON LOGIC ---
    if (spiritRef.current) {
      if (isWon) {
        // Orbiting celebration flight
        const spiritAngle = time * 2;
        spiritRef.current.position.x = Math.cos(spiritAngle) * 1.8;
        spiritRef.current.position.z = Math.sin(spiritAngle) * 1.8;
        spiritRef.current.position.y = 0.7 + Math.sin(time * 4) * 0.2;
      } else {
        // Levitate quietly near the opposite cliff
        spiritRef.current.position.x = -1.5;
        spiritRef.current.position.z = 0.6;
        spiritRef.current.position.y = 0.4 + Math.sin(time * 1.8) * 0.06;
      }
    }

    if (spiritOrbRef.current) {
      spiritOrbRef.current.rotation.x = time * 1.2;
      spiritOrbRef.current.rotation.y = time * 1.5;
    }
  });

  return (
    <group>
      {/* 1. THE WANDERER (Minimalist Monument Valley Explorer) */}
      <group ref={wandererRef} position={[1.2, 0.26, 0.8]}>
        {/* Robed Body */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <coneGeometry args={[0.08, 0.24, 6]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>

        {/* Traveler Straw Hat */}
        <mesh position={[0, 0.29, 0]} rotation={[0.05, 0, 0]}>
          <coneGeometry args={[0.09, 0.03, 7]} />
          <meshStandardMaterial color="#d97706" roughness={0.7} />
        </mesh>

        {/* Staff & Lantern */}
        <group position={[0.08, 0.1, 0.05]}>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.32, 4]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          {/* Glowing Lantern */}
          <mesh position={[0.03, 0.18, 0]}>
            <boxGeometry args={[0.04, 0.05, 0.04]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={stage >= 3 || nearMiss || isWon ? 2.5 : 1.0}
            />
          </mesh>
          <pointLight
            ref={lanternLightRef}
            color="#fbbf24"
            distance={1.5}
            intensity={0.8}
            position={[0.03, 0.18, 0]}
          />
        </group>

        {/* Near-Miss Alert Mark */}
        <mesh ref={exclaimRef} position={[0, 0.48, 0]} visible={false}>
          <boxGeometry args={[0.03, 0.1, 0.03]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* 2. THE CURIOUS SPIRIT AUTOMATON */}
      <group ref={spiritRef} position={[-1.5, 0.4, 0.6]}>
        {/* Core Hovering Gem */}
        <mesh ref={spiritOrbRef}>
          <octahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={isWon ? 2.8 : 1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Tiny Orbiting Halo Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.11, 0.01, 8, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
};
