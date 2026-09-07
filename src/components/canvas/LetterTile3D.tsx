import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { LetterStatus } from '../../types/game.ts';

interface LetterTile3DProps {
  letter: string;
  status: LetterStatus;
  colIndex: number;
  isCurrentRow: boolean;
  isRevealing: boolean;
  revealDelay: number;
  colorblindMode: boolean;
  reducedMotion: boolean;
  position: [number, number, number];
}

export const LetterTile3D: React.FC<LetterTile3DProps> = ({
  letter,
  status,
  colIndex,
  isCurrentRow,
  isRevealing,
  revealDelay,
  colorblindMode,
  reducedMotion,
  position
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const lightBeamRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Animation progression tracking
  const animTime = useRef<number>(0);
  const revealProgress = useRef<number>(status !== 'empty' && status !== 'pending' && !isRevealing ? 1 : 0);

  // Memoized materials & colors
  const { baseColor, emissiveColor, emissiveIntensity, opacity, isTransparent } = useMemo(() => {
    switch (status) {
      case 'correct':
        return {
          baseColor: new THREE.Color('#10b981'), // Green
          emissiveColor: new THREE.Color('#059669'),
          emissiveIntensity: 0.7,
          opacity: 1,
          isTransparent: false
        };
      case 'misplaced':
        return {
          baseColor: new THREE.Color('#ef4444'), // Vibrant Red (matches HOW TO PLAY guide)
          emissiveColor: new THREE.Color('#dc2626'),
          emissiveIntensity: 0.65,
          opacity: 1,
          isTransparent: false
        };
      case 'absent':
        return {
          baseColor: new THREE.Color('#141c2b'), // Sleek Dark Obsidian Slate
          emissiveColor: new THREE.Color('#0d131f'),
          emissiveIntensity: 0.08,
          opacity: 1.0,
          isTransparent: false
        };
      case 'pending':
        return {
          baseColor: new THREE.Color('#1e293b'),
          emissiveColor: new THREE.Color('#38bdf8'),
          emissiveIntensity: 0.3,
          opacity: 0.95,
          isTransparent: false
        };
      default: // empty
        return {
          baseColor: new THREE.Color('#0d121e'),
          emissiveColor: new THREE.Color('#161f30'),
          emissiveIntensity: 0.04,
          opacity: 0.95,
          isTransparent: false
        };
    }
  }, [status]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const group = meshRef.current;
    animTime.current += delta;

    // Reveal Flip & Physical Launch Animation
    if (isRevealing) {
      if (animTime.current > revealDelay) {
        revealProgress.current = Math.min(1, revealProgress.current + delta * 2.8);
      }
    } else if (status !== 'empty' && status !== 'pending') {
      revealProgress.current = 1;
    }

    const t = revealProgress.current;

    // Flip rotation cleanly around X axis during reveal
    if (!reducedMotion && isRevealing && t > 0 && t < 1) {
      group.rotation.x = Math.sin(t * Math.PI) * Math.PI;
    } else {
      group.rotation.x = 0;
    }

    // Tiles always face forward (no Y wobbling)
    group.rotation.y = 0;
    group.rotation.z = 0;

    // Physical launch trajectory: tile arches forward towards the world on submit before locking into socket
    const launchZ = !reducedMotion && isRevealing && t > 0 && t < 1 ? Math.sin(t * Math.PI) * 0.4 : 0;
    const launchY = !reducedMotion && isRevealing && t > 0 && t < 1 ? Math.sin(t * Math.PI) * 0.15 : 0;
    group.position.z = position[2] + launchZ;

    // Physical status behaviors - ALL TILES STAY FIRMLY IN THEIR GRID SOCKET
    if (status === 'correct') {
      const breathe = Math.sin(state.clock.getElapsedTime() * 2.5 + colIndex) * 0.12;
      group.position.y = position[1] + (t * 0.03) + launchY;
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = emissiveIntensity + breathe;
      }
      if (lightBeamRef.current) {
        lightBeamRef.current.scale.y = THREE.MathUtils.lerp(lightBeamRef.current.scale.y, 1.0, delta * 4);
      }
    } else if (status === 'misplaced') {
      const breathe = Math.sin(state.clock.getElapsedTime() * 3.0 + colIndex) * 0.1;
      group.position.y = position[1] + launchY;
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = emissiveIntensity + breathe;
      }
    } else if (status === 'absent') {
      // Solid black tile remains securely in place
      group.position.y = position[1] + launchY;
      if (materialRef.current) {
        materialRef.current.opacity = 1.0;
      }
    } else if (isCurrentRow && letter) {
      // Gentle typing pulse
      group.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 5 + colIndex * 0.6) * 0.015;
    } else {
      group.position.y = position[1];
    }
  });

  // Colorblind accessory symbols
  const colorblindSymbol = useMemo(() => {
    if (!colorblindMode || !status || status === 'empty' || status === 'pending') return '';
    if (status === 'correct') return '●';
    if (status === 'misplaced') return '▲';
    if (status === 'absent') return '✕';
    return '';
  }, [colorblindMode, status]);

  // Crisp border edge geometry
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.44, 0.44, 0.08)), []);

  const borderColor = useMemo(() => {
    switch (status) {
      case 'correct':
        return '#34d399'; // Green border
      case 'misplaced':
        return '#f87171'; // Red border matching HOW TO PLAY
      case 'absent':
        return '#2e3d55'; // Dark slate border
      case 'pending':
        return '#38bdf8'; // Cyan border
      default:
        return isCurrentRow ? '#475569' : '#1e293b';
    }
  }, [status, isCurrentRow]);

  return (
    <group ref={meshRef} position={position}>
      {/* Sleek Socket Pedestal Floor (No self-shadow to eliminate blinking) */}
      <mesh position={[0, -0.015, -0.025]}>
        <boxGeometry args={[0.48, 0.48, 0.03]} />
        <meshStandardMaterial
          color={isCurrentRow ? "#1a2333" : "#0d1321"}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Main 3D Beveled Tile Body (castShadow only, no receiveShadow to eliminate blinking) */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.44, 0.44, 0.08]} />
        <meshStandardMaterial
          ref={materialRef}
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          roughness={status === 'correct' ? 0.2 : status === 'misplaced' ? 0.25 : 0.4}
          metalness={status === 'correct' ? 0.45 : status === 'misplaced' ? 0.35 : 0.2}
          transparent={isTransparent}
          opacity={opacity}
        />
      </mesh>

      {/* Crisp Border Outline */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial
          color={borderColor}
          linewidth={isCurrentRow ? 2 : 1}
          transparent
          opacity={status === 'empty' ? (isCurrentRow ? 0.9 : 0.6) : 0.95}
        />
      </lineSegments>

      {/* Letter Typography */}
      {letter && (
        <Text
          position={[0, colorblindSymbol ? 0.03 : 0, 0.055]}
          fontSize={0.25}
          color={status === 'absent' ? '#94a3b8' : '#ffffff'}
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#05070a"
        >
          {letter}
        </Text>
      )}

      {/* Colorblind symbol display */}
      {colorblindSymbol && (
        <Text
          position={[0, -0.13, 0.055]}
          fontSize={0.1}
          color={status === 'correct' ? '#a7f3d0' : status === 'misplaced' ? '#fca5a5' : '#64748b'}
          anchorX="center"
          anchorY="middle"
        >
          {colorblindSymbol}
        </Text>
      )}

      {/* Energy Light Beam for Correct Letters */}
      {status === 'correct' && (
        <mesh
          ref={lightBeamRef}
          position={[0, -1.0, 0]}
          scale={[1, 0.01, 1]}
        >
          <cylinderGeometry args={[0.018, 0.04, 2.0, 12]} />
          <meshBasicMaterial
            color="#34d399"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};
