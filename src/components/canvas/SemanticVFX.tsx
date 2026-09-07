import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SemanticEffectType } from '../../types/game.ts';

interface SemanticVFXProps {
  activeEffects: SemanticEffectType[];
  isWon: boolean;
  reducedMotion: boolean;
}

export const SemanticVFX: React.FC<SemanticVFXProps> = ({
  activeEffects,
  isWon,
  reducedMotion
}) => {
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
  // 1. Elemental
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

  // 2. Cosmic
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

  // 3. Nature & Flora
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

  // 4. Magic & Arcana
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

  // 5. Tech & Sci-Fi
  const hasMatrix = has('matrix');
  const hasGlitch = has('glitch');
  const hasLaser = has('laser');
  const hasShield = has('shield');
  const hasSynthwave = has('synthwave');
  const hasRadar = has('radar');

  // 6. Wonder & Abstract
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

  // --- Pre-calculated Particle Buffers ---
  // Rain
  const [rainPositions] = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 1] = Math.random() * 7.5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 + 1.0;
    }
    return [pos];
  }, []);

  // Snow
  const [snowPositions] = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = Math.random() * 7.0 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 + 1.0;
    }
    return [pos];
  }, []);

  // Fire embers
  const [emberPositions] = useMemo(() => {
    const count = 50;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const isLeft = i % 2 === 0;
      pos[i * 3] = (isLeft ? -3.3 : 3.3) + (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = 1.6 + Math.random() * 3.5;
      pos[i * 3 + 2] = 1.3 + (Math.random() - 0.5) * 0.8;
    }
    return [pos];
  }, []);

  // Sakura Petals
  const [sakuraPositions] = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = Math.random() * 6.5 + 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 + 0.5;
    }
    return [pos];
  }, []);

  // Bioluminescent Spores
  const [sporePositions] = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = Math.random() * 3.5 + 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return [pos];
  }, []);

  // Cyber Matrix Rain
  const [matrixPositions] = useMemo(() => {
    const count = 250;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 6.5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return [pos];
  }, []);

  // Aquatic Bubbles
  const [bubblePositions] = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5.5;
      pos[i * 3 + 1] = Math.random() * 3.0 + 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }
    return [pos];
  }, []);

  // Gold Glitter Dust
  const [goldPositions] = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7.5;
      pos[i * 3 + 1] = Math.random() * 5.5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return [pos];
  }, []);

  // Fireflies
  const [fireflyPositions] = useMemo(() => {
    const count = 75;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 4.0 + 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 + 0.5;
    }
    return [pos];
  }, []);

  // Shooting Star Meteors
  const [meteorPositions] = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = Math.random() * 10 - 2;
      pos[i * 3 + 1] = Math.random() * 4.0 + 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.5;
    }
    return [pos];
  }, []);

  // --- Frame Loop Animations ---
  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    // 1. Rain
    if (hasRain && rainRef.current) {
      const pos = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 7.2;
        if (pos[i * 3 + 1] < 0.2) pos[i * 3 + 1] = 7.8;
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Snow
    if (hasSnow && snowRef.current) {
      const pos = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 1.5;
        pos[i * 3] += Math.sin(time * 2 + i) * 0.006;
        if (pos[i * 3 + 1] < 0.2) pos[i * 3 + 1] = 7.2;
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Fire Braziers & Embers
    if (hasFire) {
      const flicker1 = 1.0 + Math.sin(time * 14) * 0.22;
      const flicker2 = 1.0 + Math.cos(time * 12) * 0.2;
      if (leftFlameRef.current) leftFlameRef.current.scale.y = flicker1;
      if (rightFlameRef.current) rightFlameRef.current.scale.y = flicker2;

      if (embersRef.current) {
        const pos = embersRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pos.length / 3; i++) {
          pos[i * 3 + 1] += delta * 1.2;
          if (pos[i * 3 + 1] > 5.2) pos[i * 3 + 1] = 1.6;
        }
        embersRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    // 4. Sakura Petals
    if (hasSakura && sakuraRef.current) {
      const pos = sakuraRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 1.2;
        pos[i * 3] += Math.cos(time * 1.8 + i) * 0.01;
        if (pos[i * 3 + 1] < 0.2) pos[i * 3 + 1] = 6.8;
      }
      sakuraRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 5. Spores
    if (hasSpores && sporesRef.current) {
      const pos = sporesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += delta * 0.8;
        if (pos[i * 3 + 1] > 3.8) pos[i * 3 + 1] = 0.4;
      }
      sporesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 6. Matrix Rain
    if (hasMatrix && matrixRef.current) {
      const pos = matrixRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 5.0;
        if (pos[i * 3 + 1] < 0.3) pos[i * 3 + 1] = 6.5;
      }
      matrixRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 7. Coral Bubbles
    if (hasCoral && bubblesRef.current) {
      const pos = bubblesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += delta * 1.1;
        if (pos[i * 3 + 1] > 3.2) pos[i * 3 + 1] = 0.3;
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 8. Gold Dust
    if (hasGold && goldRef.current) {
      const pos = goldRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] -= delta * 0.7;
        pos[i * 3] += Math.sin(time * 3 + i) * 0.005;
        if (pos[i * 3 + 1] < 0.3) pos[i * 3 + 1] = 5.8;
      }
      goldRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 9. Fireflies
    if (hasFireflies && firefliesRef.current) {
      const pos = firefliesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3] += Math.sin(time * 1.5 + i) * 0.01;
        pos[i * 3 + 1] += Math.cos(time * 1.2 + i * 2) * 0.008;
      }
      firefliesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 10. Meteors
    if (hasMeteor && meteorsRef.current) {
      const pos = meteorsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3] -= delta * 12.0;
        pos[i * 3 + 1] -= delta * 7.5;
        if (pos[i * 3 + 1] < 1.0) {
          pos[i * 3] = Math.random() * 10 - 2;
          pos[i * 3 + 1] = 8.5;
        }
      }
      meteorsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 11. Moon Drift
    if (hasMoon && moonRef.current) {
      moonRef.current.position.y = 6.2 + Math.sin(time * 0.4) * 0.2;
      moonRef.current.rotation.y = time * 0.08;
    }

    // 12. Sun Corona
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
      const r = 3.5;
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

    // 22. Lightning Flash
    if (hasLightning) {
      const isStrike = Math.random() < 0.1;
      if (lightningLightRef.current) {
        lightningLightRef.current.intensity = isStrike ? 6.5 : 0;
      }
      if (lightningArcRef.current) {
        lightningArcRef.current.visible = isStrike;
      }
    }
  });

  return (
    <group>
      {/* 1. FIRE: DUAL FLANKING BRAZIERS & RISING EMBERS */}
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

          <points ref={embersRef}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[emberPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#fbbf24" size={0.07} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
          </points>
        </group>
      )}

      {/* 2. RAIN: CELESTIAL DELUGE */}
      {hasRain && (
        <group>
          <points ref={rainRef}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[rainPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#7dd3fc" size={0.065} transparent opacity={0.75} blending={THREE.AdditiveBlending} />
          </points>
          <ambientLight intensity={0.25} color="#38bdf8" />
        </group>
      )}

      {/* 3. SNOW: FROST BLIZZARD */}
      {hasSnow && (
        <points ref={snowRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[snowPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#ffffff" size={0.08} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 4. LIGHTNING: TEMPEST ARCS & STROBE */}
      {hasLightning && (
        <group>
          <pointLight ref={lightningLightRef} position={[0, 4.5, -3.5]} color="#c084fc" distance={15} intensity={0} />
          <group ref={lightningArcRef} visible={false} position={[0, 2.5, -4.5]}>
            <mesh position={[2.0, 1.2, 0]} rotation={[0, 0, 0.35]}>
              <cylinderGeometry args={[0.015, 0.035, 3.5, 4]} />
              <meshBasicMaterial color="#e9d5ff" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh position={[-1.8, 1.0, -0.2]} rotation={[0, 0, -0.4]}>
              <cylinderGeometry args={[0.015, 0.03, 3.0, 4]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        </group>
      )}

      {/* 5. WIND: SWIRLING GALE VORTEX */}
      {hasWind && (
        <group position={[0, 1.8, 0]}>
          <mesh rotation={[Math.PI / 3, 0.2, 0]}>
            <torusGeometry args={[3.2, 0.03, 8, 48]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0.5, 0]}>
            <torusGeometry args={[2.5, 0.025, 8, 48]} />
            <meshBasicMaterial color="#bae6fd" transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* 6. QUAKE: SEISMIC SHIFT PILLARS */}
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

      {/* 7. VOLCANO: MAGMA ERUPTION */}
      {hasVolcano && (
        <group position={[0, 0.3, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.75, 16]} />
            <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#f97316" intensity={3.5} distance={5} position={[0, 0.5, 0]} />
        </group>
      )}

      {/* 8. TOXIC: MIASMA VAPORS */}
      {hasToxic && (
        <group position={[0, 1.5, 0]}>
          <mesh position={[-1.5, 0, 0.5]}>
            <sphereGeometry args={[0.6, 12, 12]} />
            <meshBasicMaterial color="#84cc16" transparent opacity={0.25} />
          </mesh>
          <mesh position={[1.5, 0.4, -0.4]}>
            <sphereGeometry args={[0.7, 12, 12]} />
            <meshBasicMaterial color="#a3e635" transparent opacity={0.2} />
          </mesh>
        </group>
      )}

      {/* 9. SAND: DESERT SIROCCO */}
      {hasSand && (
        <group position={[0, 1.5, 0]}>
          <mesh rotation={[0, 0, -0.1]}>
            <cylinderGeometry args={[4.2, 4.2, 1.2, 16, 1, true]} />
            <meshBasicMaterial color="#eab308" transparent opacity={0.15} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 10. STEAM: THERMAL GEYSER PLUMES */}
      {hasSteam && (
        <group>
          <mesh position={[-2.0, 1.8, 0]}>
            <cylinderGeometry args={[0.3, 0.1, 3.2, 12]} />
            <meshBasicMaterial color="#f1f5f9" transparent opacity={0.3} />
          </mesh>
          <mesh position={[2.0, 2.0, 0]}>
            <cylinderGeometry args={[0.35, 0.1, 3.6, 12]} />
            <meshBasicMaterial color="#f8fafc" transparent opacity={0.3} />
          </mesh>
        </group>
      )}

      {/* 11. MOON: CRESCENT ORB & HALOS */}
      {hasMoon && (
        <group ref={moonRef} position={[0, 6.2, 0.5]}>
          <mesh>
            <sphereGeometry args={[0.65, 24, 24]} />
            <meshStandardMaterial color="#f8fafc" emissive="#e2e8f0" emissiveIntensity={0.9} roughness={0.3} />
          </mesh>
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[1.0, 0.025, 8, 36]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </mesh>
          <mesh rotation={[Math.PI / 1.7, 0.3, 0]}>
            <torusGeometry args={[1.3, 0.015, 8, 36]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.45} />
          </mesh>
          <pointLight color="#93c5fd" intensity={2.5} distance={8} position={[0, -0.3, 0]} />
        </group>
      )}

      {/* 12. SUN: SOLAR CORONA */}
      {hasSun && (
        <group ref={sunRef} position={[0, 6.0, -0.8]}>
          <mesh>
            <sphereGeometry args={[0.8, 20, 20]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh>
            <ringGeometry args={[0.9, 1.8, 16]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#fbbf24" intensity={3.0} distance={10} position={[0, 0, 0]} />
        </group>
      )}

      {/* 13. AURORA BOREALIS */}
      {hasAurora && (
        <group position={[0, 6.2, -1.5]}>
          <mesh rotation={[0.2, 0, 0]}>
            <planeGeometry args={[9.0, 2.5]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[-0.1, 0.2, 0]} position={[0, 0.4, 0.3]}>
            <planeGeometry args={[8.0, 2.0]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.28} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 14. METEOR SHOWER */}
      {hasMeteor && (
        <points ref={meteorsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[meteorPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#f43f5e" size={0.12} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 15. SINGULARITY / BLACK HOLE */}
      {hasSingularity && (
        <group position={[0, 4.5, -2.0]}>
          <mesh>
            <sphereGeometry args={[0.5, 24, 24]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[0.6, 1.4, 32]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#a855f7" intensity={2.0} distance={6} />
        </group>
      )}

      {/* 16. PLANETARY RINGS */}
      {hasRings && (
        <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2.6, 0.2, 0]}>
          <ringGeometry args={[3.2, 4.5, 48]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 17. SUPERNOVA SHOCKWAVE */}
      {hasSupernova && (
        <group position={[0, 5.0, -1.0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 3.8, 36]} />
            <meshBasicMaterial color="#fb7185" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#fda4af" intensity={4.0} distance={10} />
        </group>
      )}

      {/* 18. SOLAR ECLIPSE */}
      {hasEclipse && (
        <group position={[0, 5.8, -1.0]}>
          <mesh>
            <sphereGeometry args={[0.7, 24, 24]} />
            <meshBasicMaterial color="#09090b" />
          </mesh>
          <mesh>
            <ringGeometry args={[0.72, 0.95, 36]} />
            <meshBasicMaterial color="#e2e8f0" transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 19. NEBULA CLOUD */}
      {hasNebula && (
        <group position={[0, 5.5, -2.5]}>
          <mesh position={[-2, 0, 0]}>
            <sphereGeometry args={[1.8, 12, 12]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.2} />
          </mesh>
          <mesh position={[2, 0, 0]}>
            <sphereGeometry args={[2.0, 12, 12]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.18} />
          </mesh>
        </group>
      )}

      {/* 20. PULSAR BEACON */}
      {hasPulsar && (
        <group ref={pulsarRef} position={[0, 5.2, -1.0]}>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0, 0, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.25, 5.0, 8]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* 21. TREE / BONSAI GROVES */}
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

      {/* 22. SAKURA BLOSSOM RAIN */}
      {hasSakura && (
        <points ref={sakuraRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[sakuraPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#f472b6" size={0.09} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 23. CELESTIAL BUTTERFLIES */}
      {hasButterflies && (
        <group ref={butterflyGroupRef} position={[0, 2.2, 0]}>
          {[-1.8, 0, 1.8].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, Math.sin(i) * 0.4, 0.8]}>
              <coneGeometry args={[0.15, 0.25, 4]} />
              <meshBasicMaterial color="#60a5fa" transparent opacity={0.85} />
            </mesh>
          ))}
        </group>
      )}

      {/* 24. MYCELIUM SPORES */}
      {hasSpores && (
        <group>
          <points ref={sporesRef}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[sporePositions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#4ade80" size={0.07} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
          </points>
          <mesh position={[-1.2, 0.4, 0.8]}>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial color="#86efac" emissive="#22c55e" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}

      {/* 25. OCEAN WAVES / TIDES */}
      {hasWave && (
        <mesh ref={rippleRef} position={[0, 0.3, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.85, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 26. CORAL REEF & BUBBLES */}
      {hasCoral && (
        <group>
          <mesh position={[-1.8, 0.5, 0.5]}>
            <cylinderGeometry args={[0.1, 0.18, 0.8, 5]} />
            <meshStandardMaterial color="#fb7185" roughness={0.4} />
          </mesh>
          <points ref={bubblesRef}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[bubblePositions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#bae6fd" size={0.06} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
          </points>
        </group>
      )}

      {/* 27. CRYSTAL SPIRES */}
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

      {/* 28. VINES */}
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

      {/* 29. PHOENIX ASCENT */}
      {hasPhoenix && (
        <group ref={phoenixRef}>
          <mesh>
            <coneGeometry args={[0.3, 0.8, 4]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
          <pointLight color="#f97316" intensity={3.0} distance={5} />
        </group>
      )}

      {/* 30. FIREFLIES */}
      {hasFireflies && (
        <points ref={firefliesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[fireflyPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#fde047" size={0.08} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 31. RUNIC CIRCLE */}
      {hasRunes && (
        <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.6, 2.4, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 32. SPECTRAL GHOSTS */}
      {hasGhost && (
        <group position={[0, 1.8, -1.0]}>
          <mesh position={[-1.2, 0, 0]}>
            <sphereGeometry args={[0.35, 12, 12]} />
            <meshBasicMaterial color="#cbd5e1" transparent opacity={0.35} />
          </mesh>
          <mesh position={[1.2, 0.3, 0]}>
            <sphereGeometry args={[0.4, 12, 12]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.35} />
          </mesh>
        </group>
      )}

      {/* 33. GOLD TRANSMUTATION */}
      {hasGold && (
        <points ref={goldRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[goldPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#fbbf24" size={0.075} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 34. DIMENSIONAL PORTAL */}
      {hasPortal && (
        <group ref={portalRef} position={[0, 4.2, -1.8]}>
          <mesh>
            <torusGeometry args={[1.5, 0.15, 12, 36]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <mesh>
            <circleGeometry args={[1.4, 24]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* 35. TIME DILATION GEARS */}
      {hasTime && (
        <group position={[0, 5.0, -3.0]}>
          <group ref={gearRef1} position={[-1.2, 0, 0]}>
            <mesh>
              <ringGeometry args={[1.2, 1.6, 16]} />
              <meshBasicMaterial color="#f59e0b" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
          </group>
          <group ref={gearRef2} position={[1.5, 0.4, 0]}>
            <mesh>
              <ringGeometry args={[0.9, 1.2, 12]} />
              <meshBasicMaterial color="#d97706" transparent opacity={0.45} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      )}

      {/* 36. PRISMATIC RAINBOW */}
      {hasRainbow && (
        <mesh position={[0, 4.8, -1.5]} rotation={[0, 0, 0]}>
          <ringGeometry args={[3.6, 4.2, 32, 1, 0, Math.PI]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 37. DIVINE HOLY LIGHT */}
      {hasHoly && (
        <group position={[0, 4.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.4, 1.8, 6.0, 16, 1, true]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#ffffff" intensity={3.5} distance={9} />
        </group>
      )}

      {/* 38. BLOOD MOON */}
      {hasBlood && (
        <group position={[0, 6.2, 0.5]}>
          <mesh>
            <sphereGeometry args={[0.7, 24, 24]} />
            <meshStandardMaterial color="#dc2626" emissive="#991b1b" emissiveIntensity={0.8} />
          </mesh>
          <pointLight color="#ef4444" intensity={3.0} distance={9} />
        </group>
      )}

      {/* 39. MIRROR CITADEL */}
      {hasMirror && (
        <group position={[0, 6.8, 0]} rotation={[Math.PI, 0, 0]} scale={0.65}>
          <mesh>
            <dodecahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#67e8f9" wireframe />
          </mesh>
        </group>
      )}

      {/* 40. EYE OF THE AEONS */}
      {hasEye && (
        <group position={[0, 6.0, -1.5]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 1.4, 24]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshBasicMaterial color="#c7d2fe" />
          </mesh>
        </group>
      )}

      {/* 41. CYBER MATRIX RAIN */}
      {hasMatrix && (
        <points ref={matrixRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[matrixPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#22c55e" size={0.075} transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </points>
      )}

      {/* 42. REALITY GLITCH */}
      {hasGlitch && (
        <group ref={glitchRef} position={[0, 2.5, 0.5]}>
          <mesh>
            <boxGeometry args={[7.2, 5.5, 4.5]} />
            <meshBasicMaterial color="#ec4899" wireframe transparent opacity={0.3} />
          </mesh>
          <pointLight color="#ec4899" intensity={2.0} distance={6} position={[0, 0, 0]} />
        </group>
      )}

      {/* 43. LASER BEAM ARRAY */}
      {hasLaser && (
        <group>
          <mesh position={[0, 2.5, 0]} rotation={[0.4, 0.3, 0.5]}>
            <cylinderGeometry args={[0.015, 0.015, 9.0, 4]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0, 2.5, 0]} rotation={[-0.4, -0.3, -0.5]}>
            <cylinderGeometry args={[0.015, 0.015, 9.0, 4]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
        </group>
      )}

      {/* 44. AEGIS FORCEFIELD SHIELD */}
      {hasShield && (
        <mesh ref={shieldRef} position={[0, 1.8, 0]}>
          <sphereGeometry args={[3.2, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
        </mesh>
      )}

      {/* 45. SYNTHWAVE HORIZON */}
      {hasSynthwave && (
        <group position={[0, 4.8, -2.5]}>
          <mesh>
            <circleGeometry args={[1.8, 24]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[0, -2.2, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8.0, 6.0, 12, 12]} />
            <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* 46. RADAR SCOPE PING */}
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

      {/* 47. HEART AFFINITY */}
      {hasLove && (
        <group position={[0, 2.8, 0]}>
          {[-1.5, 0, 1.5].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, Math.sin(i * 2) * 0.5, 0]}>
              <octahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial color="#ec4899" emissive="#db2777" emissiveIntensity={0.8} />
            </mesh>
          ))}
          <pointLight color="#ec4899" intensity={2.0} distance={5} />
        </group>
      )}

      {/* 48. MUSIC NOTES */}
      {hasMusic && (
        <group position={[0, 3.2, 0]}>
          {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
            <mesh key={i} position={[x, Math.sin(i + 1) * 0.6, 0]}>
              <torusGeometry args={[0.18, 0.04, 6, 16]} />
              <meshBasicMaterial color="#a855f7" />
            </mesh>
          ))}
        </group>
      )}

      {/* 49. COSMIC CHAOS */}
      {hasChaos && (
        <group position={[0, 2.5, 0]}>
          {[-2, -1, 1, 2].map((x, i) => (
            <mesh key={i} position={[x, (i % 2) * 1.5, (i % 3) - 1]} rotation={[i, i * 2, 0]}>
              <tetrahedronGeometry args={[0.35, 0]} />
              <meshStandardMaterial color="#f97316" wireframe />
            </mesh>
          ))}
        </group>
      )}

      {/* 50. ZEN PEACE */}
      {hasPeace && (
        <group position={[0, 0.4, 0.6]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.8, 16]} />
            <meshBasicMaterial color="#14b8a6" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#2dd4bf" intensity={2.0} distance={4} />
        </group>
      )}

      {/* 51. CANDY REALM */}
      {hasCandy && (
        <group position={[0, 3.5, 0]}>
          {[-2, -0.8, 0.8, 2].map((x, i) => (
            <mesh key={i} position={[x, Math.cos(i) * 0.5, 0]}>
              <sphereGeometry args={[0.22, 12, 12]} />
              <meshStandardMaterial color={['#f472b6', '#38bdf8', '#fde047', '#4ade80'][i]} />
            </mesh>
          ))}
        </group>
      )}

      {/* 52. ZERO GRAVITY */}
      {hasZeroG && (
        <group position={[0, 3.0, 0]}>
          {[-2.2, -1.0, 1.0, 2.2].map((x, i) => (
            <mesh key={i} position={[x, (i % 2) * 1.2, 0]} rotation={[0.4 * i, 0.2 * i, 0]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.6} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
