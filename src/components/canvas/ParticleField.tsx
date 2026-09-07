import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  isWon?: boolean;
  reducedMotion?: boolean;
}

interface Meteor {
  active: boolean;
  startX: number;
  startY: number;
  startZ: number;
  currX: number;
  currY: number;
  currZ: number;
  speed: number;
  length: number;
  dirX: number;
  dirY: number;
  timer: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 360,
  isWon = false,
  reducedMotion = false
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const foregroundRef = useRef<THREE.Points>(null);
  const meteorsLineRef = useRef<THREE.LineSegments>(null);
  const nebulaGroupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  // 1. Wide Cosmic Starfield (Deep & Mid space)
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Color palette for cosmic stars
    const palette = [
      [0.96, 0.98, 1.00], // Starlight white
      [0.22, 0.75, 0.98], // Celestial cyan
      [0.72, 0.52, 0.98], // Cosmic violet
      [0.20, 0.90, 0.60], // Emerald shimmer
      [0.98, 0.86, 0.45]  // Solar gold
    ];

    for (let i = 0; i < count; i++) {
      // Wide frustum spanning the entire web page at any aspect ratio
      pos[i * 3] = (Math.random() - 0.5) * 68;     // X: -34 to +34
      pos[i * 3 + 1] = (Math.random() - 0.5) * 48; // Y: -24 to +24
      pos[i * 3 + 2] = -5 - Math.random() * 24;    // Z: -29 to -5

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return { positions: pos, colors: col };
  }, [count]);

  // 2. Close Foreground Luminous Motes (80 particles that float close to camera)
  // Provides high-contrast stereoscopic 3D parallax depth when cursor or device moves
  const moteCount = 80;
  const { motePositions, moteColors } = useMemo(() => {
    const pos = new Float32Array(moteCount * 3);
    const col = new Float32Array(moteCount * 3);

    for (let i = 0; i < moteCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = 0.5 + Math.random() * 5.5; // In front of diorama, close to camera

      const isEmerald = Math.random() > 0.5;
      col[i * 3] = isEmerald ? 0.4 : 0.45;
      col[i * 3 + 1] = isEmerald ? 0.95 : 0.85;
      col[i * 3 + 2] = isEmerald ? 0.75 : 1.0;
    }
    return { motePositions: pos, moteColors: col };
  }, [moteCount]);

  // 3. Shooting Stars (4 concurrent meteors spanning the entire sky)
  const meteors = useRef<Meteor[]>([
    {
      active: false,
      startX: 0,
      startY: 0,
      startZ: -10,
      currX: 0,
      currY: 0,
      currZ: -10,
      speed: 15,
      length: 2.2,
      dirX: -0.85,
      dirY: -0.52,
      timer: 1.2
    },
    {
      active: false,
      startX: 0,
      startY: 0,
      startZ: -14,
      currX: 0,
      currY: 0,
      currZ: -14,
      speed: 18,
      length: 2.6,
      dirX: -0.75,
      dirY: -0.65,
      timer: 3.5
    },
    {
      active: false,
      startX: 0,
      startY: 0,
      startZ: -12,
      currX: 0,
      currY: 0,
      currZ: -12,
      speed: 16,
      length: 2.0,
      dirX: 0.82,
      dirY: -0.55,
      timer: 5.8
    },
    {
      active: false,
      startX: 0,
      startY: 0,
      startZ: -16,
      currX: 0,
      currY: 0,
      currZ: -16,
      speed: 21,
      length: 2.8,
      dirX: -0.88,
      dirY: -0.46,
      timer: 7.4
    }
  ]);

  const meteorPositions = useMemo(() => new Float32Array(4 * 2 * 3), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Deep Space Cosmic Starfield Drift
    if (pointsRef.current && !reducedMotion) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const yIdx = i * 3 + 1;
        const riseSpeed = isWon ? 0.7 : 0.12;
        arr[yIdx] += delta * riseSpeed;

        if (arr[yIdx] > 24) {
          arr[yIdx] = -24;
        }

        arr[i * 3] += Math.sin(time * 0.3 + i * 0.5) * 0.003;
      }
      posAttr.needsUpdate = true;
    }

    // 2. Foreground Luminous Motes (Subtle Drifting Floating Speculars)
    if (foregroundRef.current && !reducedMotion) {
      const posAttr = foregroundRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < moteCount; i++) {
        const yIdx = i * 3 + 1;
        arr[yIdx] += delta * (isWon ? 0.85 : 0.18);

        if (arr[yIdx] > 12) {
          arr[yIdx] = -12;
        }

        arr[i * 3] += Math.cos(time * 0.4 + i) * 0.005;
      }
      posAttr.needsUpdate = true;
    }

    // 3. Deep Space Nebulae Breathing & Slow Orbit
    if (nebulaGroupRef.current && !reducedMotion) {
      nebulaGroupRef.current.rotation.z = time * 0.015;
    }

    // 4. Celestial Rings Gentle Precession
    if (ringsRef.current && !reducedMotion) {
      ringsRef.current.rotation.y = time * 0.02;
    }

    // 5. Multi-Meteor Shooting Star System
    if (meteorsLineRef.current && !reducedMotion) {
      const lineAttr = meteorsLineRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const mArr = lineAttr.array as Float32Array;

      meteors.current.forEach((m, idx) => {
        m.timer -= delta;
        if (m.timer <= 0 && !m.active) {
          m.active = true;
          const isLeftToRight = m.dirX > 0;
          m.startX = isLeftToRight
            ? -18 - Math.random() * 8
            : 18 + Math.random() * 8;
          m.startY = 8 + Math.random() * 8;
          m.startZ = -9 - Math.random() * 9;
          m.currX = m.startX;
          m.currY = m.startY;
          m.currZ = m.startZ;
          m.speed = 15 + Math.random() * 8;
          m.timer = 0;
        }

        if (m.active) {
          m.currX += m.dirX * m.speed * delta;
          m.currY += m.dirY * m.speed * delta;

          const base = idx * 6;
          // Head vertex
          mArr[base] = m.currX;
          mArr[base + 1] = m.currY;
          mArr[base + 2] = m.currZ;

          // Tail vertex
          mArr[base + 3] = m.currX - m.dirX * m.length;
          mArr[base + 4] = m.currY - m.dirY * m.length;
          mArr[base + 5] = m.currZ;

          // Reset when out of bounds
          if (m.currY < -16 || Math.abs(m.currX) > 32) {
            m.active = false;
            m.timer = 2.5 + Math.random() * 4.5;
            // Collapse line segment off-screen
            mArr[base] = 0;
            mArr[base + 1] = -50;
            mArr[base + 2] = 0;
            mArr[base + 3] = 0;
            mArr[base + 4] = -50;
            mArr[base + 5] = 0;
          }
        }
      });

      lineAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Deep & Wide Space Cosmic Starfield with Vertex Colors */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isWon ? 0.10 : 0.075}
          vertexColors
          transparent
          opacity={isWon ? 0.9 : 0.75}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 2. Foreground Floating Luminous Motes (Pronounced Parallax) */}
      <points ref={foregroundRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[motePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[moteColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isWon ? 0.12 : 0.085}
          vertexColors
          transparent
          opacity={isWon ? 0.85 : 0.55}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 3. Deep Space Volumetric Nebula Glows (Spans Full Page) */}
      <group ref={nebulaGroupRef} position={[0, 0, -18]}>
        {/* Upper-Left Nebula (Celestial Cyan) */}
        <mesh position={[-12, 8, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial
            color="#0284c7"
            transparent
            opacity={0.10}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Lower-Right Nebula (Cosmic Violet) */}
        <mesh position={[12, -8, -1]}>
          <planeGeometry args={[22, 22]} />
          <meshBasicMaterial
            color="#6366f1"
            transparent
            opacity={0.09}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {/* Center Emerald Ambient Glow behind island */}
        <mesh position={[0, -4, 2]}>
          <planeGeometry args={[16, 16]} />
          <meshBasicMaterial
            color="#059669"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 4. Celestial Coordinate Rings (Armillary Depth across entire screen) */}
      <group ref={ringsRef} position={[0, -0.5, -12]}>
        {/* Primary Celestial Ring */}
        <mesh rotation={[1.1, 0, 0]}>
          <ringGeometry args={[14.2, 14.3, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Secondary Coordinate Ring */}
        <mesh rotation={[-0.85, 0.4, 0]}>
          <ringGeometry args={[17.0, 17.1, 64]} />
          <meshBasicMaterial
            color="#818cf8"
            transparent
            opacity={0.10}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 5. Deep Space Cosmic Shooting Stars */}
      {!reducedMotion && (
        <lineSegments ref={meteorsLineRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[meteorPositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#bae6fd"
            transparent
            opacity={0.75}
            linewidth={2}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
    </group>
  );
};
