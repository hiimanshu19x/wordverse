import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SemanticEffectType, CameraMode } from '../../types/game.ts';

interface SemanticVFXProps {
  activeEffects: SemanticEffectType[];
  isWon: boolean;
  reducedMotion: boolean;
  mode?: CameraMode;
}

export const SemanticVFX: React.FC<SemanticVFXProps> = ({
  activeEffects,
  isWon,
  reducedMotion,
  mode = 'play'
}) => {
  const { width, height } = useThree((s) => s.size);
  const aspect = width / Math.max(1, height);
  const isMobile = width < 768 || aspect < 1.0;

  // Compute diorama island world anchor for island-attached props
  const dioramaPos: [number, number, number] = isMobile
    ? (mode === 'intro' ? [0, -0.6, 0] : (isWon || mode === 'won' ? [0, -0.7, 0] : [0, -4.3, -2.6]))
    : (mode === 'intro' ? [0, -0.65, 0] : (isWon || mode === 'won' ? [0, -0.75, 0] : [0, -3.1, -2.7]));
  const dioramaScale = isMobile
    ? (mode === 'intro' ? 1.15 : (isWon || mode === 'won' ? 1.05 : 0.54))
    : (mode === 'intro' ? 1.25 : (isWon || mode === 'won' ? 1.15 : 0.78));

  // Helper to test if an effect or alias is active
  const has = (type: SemanticEffectType | string) => {
    if (activeEffects.includes(type as SemanticEffectType)) return true;
    if (type === 'moon' && activeEffects.includes('night')) return true;
    if (type === 'sun' && activeEffects.includes('light')) return true;
    if (type === 'zerog' && activeEffects.includes('fly')) return true;
    if (type === 'tree' && isWon) return true;
    return false;
  };

  // --- Active Effect Bools ---
  const hasFire = has('fire');
  const hasRain = has('rain');
  const hasSnow = has('snow');
  const hasLightning = has('lightning');
  const hasWind = has('wind');
  const hasQuake = has('quake');
  const hasVolcano = has('volcano');
  const hasToxic = has('toxic');
  const hasSand = has('sand');
  const hasSteam = has('steam');

  const hasMoon = has('moon');
  const hasSun = has('sun');
  const hasAurora = has('aurora');
  const hasMeteor = has('meteor');
  const hasSingularity = has('singularity');
  const hasRings = has('rings');
  const hasSupernova = has('supernova');
  const hasEclipse = has('eclipse');
  const hasNebula = has('nebula');
  const hasPulsar = has('pulsar');

  const hasTree = has('tree');
  const hasSakura = has('sakura');
  const hasButterflies = has('butterflies');
  const hasSpores = has('spores');
  const hasWave = has('wave');
  const hasCoral = has('coral');
  const hasCrystal = has('crystal');
  const hasVines = has('vines');
  const hasPhoenix = has('phoenix');
  const hasFireflies = has('fireflies');

  const hasRunes = has('runes');
  const hasGhost = has('ghost');
  const hasGold = has('gold');
  const hasPortal = has('portal');
  const hasTime = has('time');
  const hasRainbow = has('rainbow');
  const hasHoly = has('holy');
  const hasBlood = has('blood');
  const hasMirror = has('mirror');
  const hasEye = has('eye');

  const hasMatrix = has('matrix');
  const hasGlitch = has('glitch');
  const hasLaser = has('laser');
  const hasShield = has('shield');
  const hasSynthwave = has('synthwave');
  const hasRadar = has('radar');

  const hasLove = has('love');
  const hasMusic = has('music');
  const hasChaos = has('chaos');
  const hasPeace = has('peace');
  const hasCandy = has('candy');
  const hasZeroG = has('zerog');

  // --- Animation Refs ---
  const rainRef = useRef<THREE.Points>(null);
  const snowRef = useRef<THREE.Points>(null);
  const sakuraRef = useRef<THREE.Points>(null);
  const sporesRef = useRef<THREE.Points>(null);
  const matrixRef = useRef<THREE.Points>(null);
  const embersRef = useRef<THREE.Points>(null);
  const bubblesRef = useRef<THREE.Points>(null);
  const goldRef = useRef<THREE.Points>(null);
  const firefliesRef = useRef<THREE.Points>(null);
  const meteorsRef = useRef<THREE.Points>(null);

  const leftFlameRef = useRef<THREE.Group>(null);
  const rightFlameRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Group>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef<THREE.Group>(null);
  const gearRef1 = useRef<THREE.Group>(null);
  const gearRef2 = useRef<THREE.Group>(null);
  const pulsarRef = useRef<THREE.Group>(null);
  const radarRef = useRef<THREE.Group>(null);
  const glitchRef = useRef<THREE.Group>(null);
  const phoenixRef = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  const butterflyGroupRef = useRef<THREE.Group>(null);
  const lightningLightRef = useRef<THREE.PointLight>(null);
  const lightningArcRef = useRef<THREE.Group>(null);

  // --- FULL-SCREEN WORLD-SPACE PARTICLE BUFFERS ---
  // 1. Rain: Spanning full width (-13 to +13) and height (-5.5 to +14.5)
  const [rainPositions] = useMemo(() => {
    const count = 520;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = Math.random() * 20 - 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 0.5;
    }
    return [pos];
  }, []);

  // 2. Snow: Spanning entire screen from sky to depths
  const [snowPositions] = useMemo(() => {
    const count = 380;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = Math.random() * 20 - 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 0.5;
    }
    return [pos];
  }, []);

  // 3. Fire Embers: Rising from deep below past top of screen
  const [emberPositions] = useMemo(() => {
    const count = 130;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 14 - 5.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 + 0.5;
    }
    return [pos];
  }, []);

  // 4. Sakura Petals: Floating across entire screen
  const [sakuraPositions] = useMemo(() => {
    const count = 280;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 20 - 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return [pos];
  }, []);

  // 5. Bioluminescent Spores
  const [sporePositions] = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 14 - 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return [pos];
  }, []);

  // 6. Cyber Matrix Rain: Cascading across full screen
  const [matrixPositions] = useMemo(() => {
    const count = 440;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = Math.random() * 20 - 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 0.5;
    }
    return [pos];
  }, []);

  // 7. Aquatic Bubbles
  const [bubblePositions] = useMemo(() => {
    const count = 140;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 14 - 5.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return [pos];
  }, []);

  // 8. Gold Glitter Dust
  const [goldPositions] = useMemo(() => {
    const count = 260;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 18 - 5.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return [pos];
  }, []);

  // 9. Fireflies
  const [fireflyPositions] = useMemo(() => {
    const count = 110;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 12 - 3.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return [pos];
  }, []);

  // 10. Shooting Star Meteors in the upper sky
  const [meteorPositions] = useMemo(() => {
    const count = 50;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = Math.random() * 24 - 10;
      pos[i * 3 + 1] = Math.random() * 8 + 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2.0;
    }
    return [pos];
  }, []);

  // --- Frame Loop Animations ---
  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    // 1. Rain: Continuous fall from top (+14.5) to bottom (-5.5)
    if (hasRain && rainRef.current) {
      const pos = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 12.5;
        if (pos[i * 3 + 1] < -5.5) pos[i * 3 + 1] = 14.5;
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Snow: Gentle drift across full screen
    if (hasSnow && snowRef.current) {
      const pos = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 2.8;
        pos[i * 3] += Math.sin(time * 1.5 + i) * 0.012;
        if (pos[i * 3 + 1] < -5.5) pos[i * 3 + 1] = 14.5;
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Fire: Braziers & rising embers
    if (hasFire) {
      const flicker1 = 1.0 + Math.sin(time * 14) * 0.22;
      const flicker2 = 1.0 + Math.cos(time * 12) * 0.2;
      if (leftFlameRef.current) leftFlameRef.current.scale.y = flicker1;
      if (rightFlameRef.current) rightFlameRef.current.scale.y = flicker2;

      if (embersRef.current) {
        const pos = embersRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pos.length / 3; i++) {
          pos[i * 3 + 1] += delta * 2.6;
          pos[i * 3] += Math.sin(time * 3 + i) * 0.012;
          if (pos[i * 3 + 1] > 9.5) pos[i * 3 + 1] = -5.0;
        }
        embersRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    // 4. Sakura Petals: Full-screen drift
    if (hasSakura && sakuraRef.current) {
      const pos = sakuraRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 2.2;
        pos[i * 3] += Math.cos(time * 1.8 + i) * 0.015;
        if (pos[i * 3 + 1] < -5.5) pos[i * 3 + 1] = 14.5;
      }
      sakuraRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 5. Spores: Atmospheric motes
    if (hasSpores && sporesRef.current) {
      const pos = sporesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += delta * 1.0;
        pos[i * 3] += Math.sin(time * 2 + i) * 0.008;
        if (pos[i * 3 + 1] > 8.5) pos[i * 3 + 1] = -4.5;
      }
      sporesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 6. Matrix Rain: Fast digital cascade
    if (hasMatrix && matrixRef.current) {
      const pos = matrixRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 10.5;
        if (pos[i * 3 + 1] < -5.5) pos[i * 3 + 1] = 14.5;
      }
      matrixRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 7. Coral Bubbles: Rising aquatic bubbles
    if (hasCoral && bubblesRef.current) {
      const pos = bubblesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += delta * 1.8;
        pos[i * 3] += Math.sin(time * 2.5 + i) * 0.01;
        if (pos[i * 3 + 1] > 8.5) pos[i * 3 + 1] = -5.0;
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 8. Gold Dust: Shimmering gold particles
    if (hasGold && goldRef.current) {
      const pos = goldRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 1.2;
        pos[i * 3] += Math.sin(time * 3 + i) * 0.008;
        if (pos[i * 3 + 1] < -5.0) pos[i * 3 + 1] = 12.0;
      }
      goldRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 9. Fireflies: Gentle dancing motes
    if (hasFireflies && firefliesRef.current) {
      const pos = firefliesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3] += Math.sin(time * 1.5 + i) * 0.015;
        pos[i * 3 + 1] += Math.cos(time * 1.2 + i * 2) * 0.012;
      }
      firefliesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 10. Meteors: High velocity diagonal streaks
    if (hasMeteor && meteorsRef.current) {
      const pos = meteorsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3] -= delta * 16.0;
        pos[i * 3 + 1] -= delta * 9.5;
        if (pos[i * 3 + 1] < -3.0 || pos[i * 3] < -14.0) {
          pos[i * 3] = Math.random() * 20 + 2;
          pos[i * 3 + 1] = Math.random() * 6 + 7.5;
        }
      }
      meteorsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 11. Moon Drift in upper sky
    if (hasMoon && moonRef.current) {
      moonRef.current.position.y = 5.8 + Math.sin(time * 0.4) * 0.2;
      moonRef.current.rotation.y = time * 0.08;
    }

    // 12. Sun Corona in upper sky
    if (hasSun && sunRef.current) {
      sunRef.current.rotation.z = time * 0.25;
    }

    // 13. Ocean Ripples
    if (hasWave && rippleRef.current) {
      const s = ((time * 1.6) % 2.5) + 0.5;
      rippleRef.current.scale.set(s, s, 1);
      const mat = rippleRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = Math.max(0, 0.8 - s * 0.3);
    }

    // 14. Portal Swirl
    if (hasPortal && portalRef.current) {
      portalRef.current.rotation.z = time * 1.4;
      portalRef.current.rotation.y = Math.sin(time * 0.8) * 0.2;
    }

    // 15. Time Clockwork Gears
    if (hasTime) {
      if (gearRef1.current) gearRef1.current.rotation.z = time * 0.3;
      if (gearRef2.current) gearRef2.current.rotation.z = -time * 0.3;
    }

    // 16. Pulsar Beacon
    if (hasPulsar && pulsarRef.current) {
      pulsarRef.current.rotation.y = time * 3.5;
    }

    // 17. Radar Scan
    if (hasRadar && radarRef.current) {
      radarRef.current.rotation.y = -time * 2.2;
    }

    // 18. Glitch
    if (hasGlitch && glitchRef.current) {
      glitchRef.current.rotation.z = Math.sin(time * 24) * 0.05;
      glitchRef.current.position.x = Math.sin(time * 35) * 0.04;
    }

    // 19. Phoenix
    if (hasPhoenix && phoenixRef.current) {
      const r = 4.5;
      phoenixRef.current.position.x = Math.cos(time * 0.9) * r;
      phoenixRef.current.position.z = Math.sin(time * 0.9) * r;
      phoenixRef.current.position.y = 5.2 + Math.sin(time * 1.8) * 0.4;
      phoenixRef.current.rotation.y = -time * 0.9 + Math.PI / 2;
    }

    // 20. Shield Pulse
    if (hasShield && shieldRef.current) {
      const mat = shieldRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = 0.25 + Math.sin(time * 4) * 0.1;
    }

    // 21. Butterflies Flutter
    if (hasButterflies && butterflyGroupRef.current) {
      butterflyGroupRef.current.rotation.y = time * 0.6;
    }

    // 22. Lightning Flash in upper sky
    if (hasLightning) {
      const isStrike = Math.random() < 0.12;
      if (lightningLightRef.current) {
        lightningLightRef.current.intensity = isStrike ? 14.0 : 0;
      }
      if (lightningArcRef.current) {
        lightningArcRef.current.visible = isStrike;
      }
    }
  });

  return (
    <group>
      {/* ============================================================
          1. ISLAND-ANCHORED PROPS (BRAZIERS, BONSAI, CALDERA, RUNES)
          Positioned accurately with the diorama island
          ============================================================ */}
      <group position={dioramaPos} scale={dioramaScale}>
        {/* Fire Braziers */}
        {hasFire && (
          <group>
            <group position={[-3.3, 1.2, 1.4]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.22, 0.32, 1.2, 6]} />
                <meshStandardMaterial color="#2d3748" roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.65, 0]}>
                <cylinderGeometry args={[0.42, 0.25, 0.25, 8]} />
                <meshStandardMaterial color="#4a5568" metalness={0.4} />
              </mesh>
              <group ref={leftFlameRef} position={[0, 0.85, 0]}>
                <mesh>
                  <coneGeometry args={[0.26, 0.7, 6]} />
                  <meshBasicMaterial color="#f97316" />
                </mesh>
                <mesh position={[0, 0.08, 0]}>
                  <coneGeometry args={[0.16, 0.5, 6]} />
                  <meshBasicMaterial color="#fde047" />
                </mesh>
              </group>
              <pointLight color="#f97316" intensity={2.8} distance={5.5} position={[0, 1.0, 0]} />
            </group>

            <group position={[3.3, 1.2, 1.4]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.22, 0.32, 1.2, 6]} />
                <meshStandardMaterial color="#2d3748" roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.65, 0]}>
                <cylinderGeometry args={[0.42, 0.25, 0.25, 8]} />
                <meshStandardMaterial color="#4a5568" metalness={0.4} />
              </mesh>
              <group ref={rightFlameRef} position={[0, 0.85, 0]}>
                <mesh>
                  <coneGeometry args={[0.26, 0.7, 6]} />
                  <meshBasicMaterial color="#f97316" />
                </mesh>
                <mesh position={[0, 0.08, 0]}>
                  <coneGeometry args={[0.16, 0.5, 6]} />
                  <meshBasicMaterial color="#fde047" />
                </mesh>
              </group>
              <pointLight color="#f97316" intensity={2.8} distance={5.5} position={[0, 1.0, 0]} />
            </group>
          </group>
        )}

        {/* Quake Rock Pillars */}
        {hasQuake && (
          <group>
            <mesh position={[-2.4, 0.6, -1.2]} rotation={[0.1, 0, 0.2]}>
              <boxGeometry args={[0.6, 1.4, 0.6]} />
              <meshStandardMaterial color="#78716c" roughness={0.8} />
            </mesh>
            <mesh position={[2.4, 0.7, -1.0]} rotation={[-0.15, 0, -0.2]}>
              <boxGeometry args={[0.5, 1.6, 0.5]} />
              <meshStandardMaterial color="#57534e" roughness={0.8} />
            </mesh>
          </group>
        )}

        {/* Volcano Caldera */}
        {hasVolcano && (
          <group position={[0, 0.3, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.75, 16]} />
              <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} />
            </mesh>
            <pointLight color="#f97316" intensity={3.5} distance={5} position={[0, 0.5, 0]} />
          </group>
        )}

        {/* Bonsai Tree Groves */}
        {hasTree && (
          <group>
            <group position={[-3.1, 0.9, 1.1]}>
              <mesh castShadow position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.07, 0.12, 0.7, 5]} />
                <meshStandardMaterial color="#422006" />
              </mesh>
              <mesh position={[0, 0.85, 0]}>
                <dodecahedronGeometry args={[0.42, 0]} />
                <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={isWon ? 1.4 : 0.8} roughness={0.3} />
              </mesh>
              <pointLight color="#10b981" intensity={1.8} distance={3.5} position={[0, 0.9, 0]} />
            </group>
            <group position={[3.1, 0.9, 1.1]}>
              <mesh castShadow position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.07, 0.12, 0.7, 5]} />
                <meshStandardMaterial color="#422006" />
              </mesh>
              <mesh position={[0, 0.85, 0]}>
                <dodecahedronGeometry args={[0.42, 0]} />
                <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={isWon ? 1.4 : 0.8} roughness={0.3} />
              </mesh>
              <pointLight color="#10b981" intensity={1.8} distance={3.5} position={[0, 0.9, 0]} />
            </group>
          </group>
        )}

        {/* Ocean Wave Rings */}
        {hasWave && (
          <mesh ref={rippleRef} position={[0, 0.3, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.85, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Coral Base */}
        {hasCoral && (
          <mesh position={[-1.8, 0.5, 0.5]}>
            <cylinderGeometry args={[0.1, 0.18, 0.8, 5]} />
            <meshStandardMaterial color="#fb7185" roughness={0.4} />
          </mesh>
        )}

        {/* Crystal Spires */}
        {hasCrystal && (
          <group>
            <mesh position={[-2.2, 0.8, -0.6]} rotation={[0.1, 0.2, 0]}>
              <coneGeometry args={[0.25, 1.4, 5]} />
              <meshStandardMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={0.7} roughness={0.1} />
            </mesh>
            <mesh position={[2.2, 0.9, -0.6]} rotation={[-0.1, -0.2, 0]}>
              <coneGeometry args={[0.28, 1.6, 5]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.7} roughness={0.1} />
            </mesh>
            <pointLight color="#c084fc" intensity={2.0} distance={4.5} position={[0, 1.2, 0]} />
          </group>
        )}

        {/* Vines */}
        {hasVines && (
          <group>
            <mesh position={[-2.5, 1.2, 0]} rotation={[0, 0, 0.4]}>
              <torusGeometry args={[0.8, 0.04, 6, 24]} />
              <meshStandardMaterial color="#15803d" />
            </mesh>
            <mesh position={[2.5, 1.2, 0]} rotation={[0, 0, -0.4]}>
              <torusGeometry args={[0.8, 0.04, 6, 24]} />
              <meshStandardMaterial color="#16a34a" />
            </mesh>
          </group>
        )}

        {/* Runic Circle */}
        {hasRunes && (
          <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.6, 2.4, 32]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.55} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Radar Ring */}
        {hasRadar && (
          <group position={[0, 0.35, 0]}>
            <group ref={radarRef}>
              <mesh position={[0, 0, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.1, 2.4]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} side={THREE.DoubleSide} />
              </mesh>
            </group>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.2, 1.25, 32]} />
              <meshBasicMaterial color="#0891b2" transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}

        {/* Zen Peace */}
        {hasPeace && (
          <group position={[0, 0.4, 0.6]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.8, 16]} />
              <meshBasicMaterial color="#14b8a6" transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
            <pointLight color="#2dd4bf" intensity={2.0} distance={4} />
          </group>
        )}
      </group>

      {/* ============================================================
          2. FULL-SCREEN ATMOSPHERIC & CELESTIAL EFFECTS
          Spanning the entire scene volume with zero screen cropping
          ============================================================ */}

      {/* 1. Fire Embers: Rising throughout entire scene */}
      {hasFire && (
        <points ref={embersRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[emberPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#fbbf24" size={0.08} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 2. RAIN: Full-Screen Torrential Downpour */}
      {hasRain && (
        <group>
          <points ref={rainRef}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[rainPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#7dd3fc" size={0.08} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
          </points>
          <ambientLight intensity={0.3} color="#38bdf8" />
        </group>
      )}

      {/* 3. SNOW: Full-Screen Frost Blizzard */}
      {hasSnow && (
        <points ref={snowRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[snowPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#ffffff" size={0.11} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 4. LIGHTNING: Upper Sky Tempest Arcs & Strobe */}
      {hasLightning && (
        <group>
          <pointLight ref={lightningLightRef} position={[0, 5.0, 1.0]} color="#c084fc" distance={20} intensity={0} />
          <group ref={lightningArcRef} visible={false} position={[0, 3.5, -2.0]}>
            <mesh position={[2.5, 1.5, 0]} rotation={[0, 0, 0.35]}>
              <cylinderGeometry args={[0.02, 0.05, 5.5, 4]} />
              <meshBasicMaterial color="#e9d5ff" transparent opacity={0.95} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh position={[-2.2, 1.2, -0.2]} rotation={[0, 0, -0.4]}>
              <cylinderGeometry args={[0.02, 0.045, 5.0, 4]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.95} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        </group>
      )}

      {/* 5. WIND: Swirling Gale Vortex across whole view */}
      {hasWind && (
        <group position={[0, 1.2, 0]}>
          <mesh rotation={[Math.PI / 3, 0.2, 0]}>
            <torusGeometry args={[5.5, 0.04, 8, 48]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0.5, 0]}>
            <torusGeometry args={[4.2, 0.035, 8, 48]} />
            <meshBasicMaterial color="#bae6fd" transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* 8. TOXIC: Miasma Vapors */}
      {hasToxic && (
        <group position={[0, 1.5, 0]}>
          <mesh position={[-2.5, 0, 0.5]}>
            <sphereGeometry args={[1.2, 12, 12]} />
            <meshBasicMaterial color="#84cc16" transparent opacity={0.25} />
          </mesh>
          <mesh position={[2.5, 0.6, -0.4]}>
            <sphereGeometry args={[1.4, 12, 12]} />
            <meshBasicMaterial color="#a3e635" transparent opacity={0.2} />
          </mesh>
        </group>
      )}

      {/* 9. SAND: Desert Sirocco Full Veil */}
      {hasSand && (
        <group position={[0, 1.5, 0]}>
          <mesh rotation={[0, 0, -0.1]}>
            <cylinderGeometry args={[8.0, 8.0, 12.0, 16, 1, true]} />
            <meshBasicMaterial color="#eab308" transparent opacity={0.16} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 10. STEAM: Thermal Geyser Plumes */}
      {hasSteam && (
        <group>
          <mesh position={[-3.5, 2.5, 0]}>
            <cylinderGeometry args={[0.6, 0.2, 6.5, 12]} />
            <meshBasicMaterial color="#f1f5f9" transparent opacity={0.28} />
          </mesh>
          <mesh position={[3.5, 2.8, 0]}>
            <cylinderGeometry args={[0.7, 0.2, 7.0, 12]} />
            <meshBasicMaterial color="#f8fafc" transparent opacity={0.28} />
          </mesh>
        </group>
      )}

      {/* 11. MOON: High Celestial Crescent in Sky */}
      {hasMoon && (
        <group ref={moonRef} position={[0, 5.8, -2.5]}>
          <mesh>
            <sphereGeometry args={[0.75, 24, 24]} />
            <meshStandardMaterial color="#f8fafc" emissive="#e2e8f0" emissiveIntensity={0.9} roughness={0.3} />
          </mesh>
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[1.15, 0.03, 8, 36]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </mesh>
          <mesh rotation={[Math.PI / 1.7, 0.3, 0]}>
            <torusGeometry args={[1.5, 0.02, 8, 36]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.45} />
          </mesh>
          <pointLight color="#93c5fd" intensity={3.0} distance={10} position={[0, -0.3, 0]} />
        </group>
      )}

      {/* 12. SUN: Solar Corona in High Sky */}
      {hasSun && (
        <group ref={sunRef} position={[0, 5.8, -2.8]}>
          <mesh>
            <sphereGeometry args={[0.9, 20, 20]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh>
            <ringGeometry args={[1.0, 2.2, 16]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#fbbf24" intensity={3.5} distance={12} position={[0, 0, 0]} />
        </group>
      )}

      {/* 13. AURORA BOREALIS: Wide Sky Curtains */}
      {hasAurora && (
        <group position={[0, 6.2, -3.5]}>
          <mesh rotation={[0.2, 0, 0]}>
            <planeGeometry args={[28.0, 4.5]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[-0.1, 0.2, 0]} position={[0, 0.6, 0.3]}>
            <planeGeometry args={[26.0, 3.8]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.28} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 14. METEOR SHOWER: Streaking across upper sky */}
      {hasMeteor && (
        <points ref={meteorsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[meteorPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#f43f5e" size={0.14} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 15. SINGULARITY / BLACK HOLE in Sky */}
      {hasSingularity && (
        <group position={[0, 4.8, -2.5]}>
          <mesh>
            <sphereGeometry args={[0.6, 24, 24]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[0.7, 1.8, 32]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#a855f7" intensity={2.5} distance={7} />
        </group>
      )}

      {/* 16. PLANETARY RINGS: Encompassing entire view */}
      {hasRings && (
        <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2.6, 0.2, 0]}>
          <ringGeometry args={[6.5, 8.5, 48]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 17. SUPERNOVA SHOCKWAVE in Sky */}
      {hasSupernova && (
        <group position={[0, 5.2, -2.0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 6.0, 36]} />
            <meshBasicMaterial color="#fb7185" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#fda4af" intensity={4.5} distance={12} />
        </group>
      )}

      {/* 18. SOLAR ECLIPSE in Sky */}
      {hasEclipse && (
        <group position={[0, 5.8, -2.5]}>
          <mesh>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshBasicMaterial color="#09090b" />
          </mesh>
          <mesh>
            <ringGeometry args={[0.82, 1.15, 36]} />
            <meshBasicMaterial color="#e2e8f0" transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 19. NEBULA CLOUD in Deep Background */}
      {hasNebula && (
        <group position={[0, 4.8, -4.5]}>
          <mesh position={[-4, 0, 0]}>
            <sphereGeometry args={[4.5, 12, 12]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.2} />
          </mesh>
          <mesh position={[4, 0, 0]}>
            <sphereGeometry args={[5.0, 12, 12]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.18} />
          </mesh>
        </group>
      )}

      {/* 20. PULSAR BEACON in Sky */}
      {hasPulsar && (
        <group ref={pulsarRef} position={[0, 5.5, -2.5]}>
          <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0, 0, 3.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.35, 7.0, 8]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* 22. SAKURA BLOSSOM RAIN: Full-Screen Petals */}
      {hasSakura && (
        <points ref={sakuraRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[sakuraPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#f472b6" size={0.11} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 23. CELESTIAL BUTTERFLIES */}
      {hasButterflies && (
        <group ref={butterflyGroupRef} position={[0, 2.0, 0]}>
          {[-3.5, -1.2, 1.2, 3.5].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, Math.sin(i) * 0.8, 0.8]}>
              <coneGeometry args={[0.2, 0.35, 4]} />
              <meshBasicMaterial color="#60a5fa" transparent opacity={0.85} />
            </mesh>
          ))}
        </group>
      )}

      {/* 24. MYCELIUM SPORES: Full-screen Motes */}
      {hasSpores && (
        <points ref={sporesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[sporePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#4ade80" size={0.08} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 26. AQUATIC BUBBLES: Full-screen Rising Bubbles */}
      {hasCoral && (
        <points ref={bubblesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[bubblePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#bae6fd" size={0.07} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 29. PHOENIX ASCENT */}
      {hasPhoenix && (
        <group ref={phoenixRef}>
          <mesh>
            <coneGeometry args={[0.4, 1.1, 4]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
          <pointLight color="#f97316" intensity={3.5} distance={6} />
        </group>
      )}

      {/* 30. FIREFLIES: Full-screen Dancing Lights */}
      {hasFireflies && (
        <points ref={firefliesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[fireflyPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#fde047" size={0.09} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 32. SPECTRAL GHOSTS */}
      {hasGhost && (
        <group position={[0, 2.0, -1.0]}>
          <mesh position={[-2.5, 0, 0]}>
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshBasicMaterial color="#cbd5e1" transparent opacity={0.35} />
          </mesh>
          <mesh position={[2.5, 0.5, 0]}>
            <sphereGeometry args={[0.55, 12, 12]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
          </mesh>
        </group>
      )}

      {/* 33. GOLD TRANSMUTATION: Full-screen Shimmering Gold */}
      {hasGold && (
        <points ref={goldRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[goldPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#fbbf24" size={0.085} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 34. DIMENSIONAL PORTAL in Upper Sky */}
      {hasPortal && (
        <group ref={portalRef} position={[0, 4.8, -2.5]}>
          <mesh>
            <torusGeometry args={[2.0, 0.2, 12, 36]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <mesh>
            <circleGeometry args={[1.9, 24]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 35. TIME DILATION GEARS in Sky */}
      {hasTime && (
        <group position={[0, 5.5, -3.5]}>
          <group ref={gearRef1} position={[-2.0, 0, 0]}>
            <mesh>
              <ringGeometry args={[1.6, 2.2, 16]} />
              <meshBasicMaterial color="#f59e0b" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          </group>
          <group ref={gearRef2} position={[2.2, 0.6, 0]}>
            <mesh>
              <ringGeometry args={[1.3, 1.8, 12]} />
              <meshBasicMaterial color="#d97706" transparent opacity={0.45} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      )}

      {/* 36. PRISMATIC RAINBOW in Sky */}
      {hasRainbow && (
        <mesh position={[0, 4.5, -3.5]} rotation={[0, 0, 0]}>
          <ringGeometry args={[7.0, 7.8, 48, 1, 0, Math.PI]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 37. CELESTIAL HOLY RAYS */}
      {hasHoly && (
        <group position={[0, 5.0, 0]}>
          <mesh rotation={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.08, 1.8, 14.0, 12]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[0, 0, -0.15]}>
            <cylinderGeometry args={[0.08, 1.8, 14.0, 12]} />
            <meshBasicMaterial color="#fef9c3" transparent opacity={0.3} />
          </mesh>
          <pointLight color="#fef08a" intensity={4.5} distance={15} position={[0, 4, 0]} />
        </group>
      )}

      {/* 38. BLOOD MOON in Sky */}
      {hasBlood && (
        <group position={[0, 5.8, -2.0]}>
          <mesh>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshStandardMaterial color="#dc2626" emissive="#7f1d1d" emissiveIntensity={0.8} />
          </mesh>
          <pointLight color="#ef4444" intensity={4.0} distance={10} />
        </group>
      )}

      {/* 39. REFLECTIVE MIRROR PRISMS */}
      {hasMirror && (
        <group position={[0, 2.0, 0]}>
          <mesh position={[-3.5, 0, 0]} rotation={[0, 0.4, 0]}>
            <planeGeometry args={[1.5, 3.0]} />
            <meshBasicMaterial color="#e2e8f0" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[3.5, 0, 0]} rotation={[0, -0.4, 0]}>
            <planeGeometry args={[1.5, 3.0]} />
            <meshBasicMaterial color="#e2e8f0" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 40. COSMIC WATCHER EYE in Sky */}
      {hasEye && (
        <group position={[0, 5.2, -2.5]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[1.1, 1.35, 24]} />
            <meshBasicMaterial color="#818cf8" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshBasicMaterial color="#c7d2fe" />
          </mesh>
        </group>
      )}

      {/* 41. CYBER MATRIX RAIN: Full-Screen Digital Cascades */}
      {hasMatrix && (
        <points ref={matrixRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[matrixPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#22c55e" size={0.09} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 42. REALITY GLITCH: Full-Screen Wireframe Distortion */}
      {hasGlitch && (
        <group ref={glitchRef} position={[0, 2.0, 0.5]}>
          <mesh>
            <boxGeometry args={[14.0, 14.0, 8.0]} />
            <meshBasicMaterial color="#ec4899" wireframe transparent opacity={0.3} />
          </mesh>
          <pointLight color="#ec4899" intensity={3.0} distance={10} position={[0, 0, 0]} />
        </group>
      )}

      {/* 43. LASER BEAM ARRAY across whole screen */}
      {hasLaser && (
        <group>
          <mesh position={[0, 2.5, 0]} rotation={[0.4, 0.3, 0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 16.0, 4]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0, 2.5, 0]} rotation={[-0.4, -0.3, -0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 16.0, 4]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
        </group>
      )}

      {/* 44. AEGIS FORCEFIELD SHIELD */}
      {hasShield && (
        <mesh ref={shieldRef} position={[0, 1.2, 0]}>
          <sphereGeometry args={[5.2, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
        </mesh>
      )}

      {/* 45. SYNTHWAVE HORIZON */}
      {hasSynthwave && (
        <group position={[0, 5.0, -4.0]}>
          <mesh>
            <circleGeometry args={[2.5, 24]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[0, -4.0, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[18.0, 12.0, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* 47. HEART AFFINITY */}
      {hasLove && (
        <group position={[0, 2.8, 0]}>
          {[-3.0, -1.0, 1.0, 3.0].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, Math.sin(i * 2) * 0.8, 0]}>
              <octahedronGeometry args={[0.35, 0]} />
              <meshStandardMaterial color="#ec4899" emissive="#db2777" emissiveIntensity={0.8} />
            </mesh>
          ))}
          <pointLight color="#ec4899" intensity={2.5} distance={7} />
        </group>
      )}

      {/* 48. MUSIC NOTES */}
      {hasMusic && (
        <group position={[0, 3.2, 0]}>
          {[-3.5, -1.2, 1.2, 3.5].map((x, i) => (
            <mesh key={i} position={[x, Math.sin(i + 1) * 0.8, 0]}>
              <torusGeometry args={[0.25, 0.05, 6, 16]} />
              <meshBasicMaterial color="#a855f7" />
            </mesh>
          ))}
        </group>
      )}

      {/* 49. COSMIC CHAOS */}
      {hasChaos && (
        <group position={[0, 2.5, 0]}>
          {[-4, -2, 2, 4].map((x, i) => (
            <mesh key={i} position={[x, (i % 2) * 2.0, (i % 3) - 1]} rotation={[i, i * 2, 0]}>
              <tetrahedronGeometry args={[0.45, 0]} />
              <meshStandardMaterial color="#f97316" wireframe />
            </mesh>
          ))}
        </group>
      )}

      {/* 51. CANDY REALM */}
      {hasCandy && (
        <group position={[0, 3.5, 0]}>
          {[-4.0, -1.5, 1.5, 4.0].map((x, i) => (
            <mesh key={i} position={[x, Math.cos(i) * 0.8, 0]}>
              <sphereGeometry args={[0.3, 12, 12]} />
              <meshStandardMaterial color={['#f472b6', '#38bdf8', '#fde047', '#4ade80'][i]} />
            </mesh>
          ))}
        </group>
      )}

      {/* 52. ZERO GRAVITY */}
      {hasZeroG && (
        <group position={[0, 3.0, 0]}>
          {[-4.2, -1.5, 1.5, 4.2].map((x, i) => (
            <mesh key={i} position={[x, (i % 2) * 1.8, 0]} rotation={[0.4 * i, 0.2 * i, 0]}>
              <boxGeometry args={[0.65, 0.65, 0.65]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.6} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
