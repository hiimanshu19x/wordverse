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
  count = 140,
  isWon = false,
  reducedMotion = false
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const meteorsLineRef = useRef<THREE.LineSegments>(null);

  // Background ambient stardust
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    return pos;
  }, [count]);

  // Shooting stars (2 concurrent meteors in deep space)
  const meteors = useRef<Meteor[]>([
    {
      active: false,
      startX: 0,
      startY: 0,
      startZ: -7,
      currX: 0,
      currY: 0,
      currZ: -7,
      speed: 12,
      length: 1.6,
      dirX: -0.85,
      dirY: -0.52,
      timer: 1.5
    },
    {
      active: false,
      startX: 0,
      startY: 0,
      startZ: -8,
      currX: 0,
      currY: 0,
      currZ: -8,
      speed: 14,
      length: 1.9,
      dirX: -0.75,
      dirY: -0.65,
      timer: 4.2
    }
  ]);

  const meteorPositions = useMemo(() => new Float32Array(2 * 2 * 3), []);

  useFrame((state, delta) => {
    // 1. Ambient Stardust Drift
    if (pointsRef.current && !reducedMotion) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < count; i++) {
        const idx = i * 3 + 1;
        const riseSpeed = isWon ? 0.9 : 0.15;
        arr[idx] += delta * riseSpeed;

        if (arr[idx] > 8) {
          arr[idx] = -7;
        }

        arr[i * 3] += Math.sin(time * 0.4 + i) * 0.002;
      }
      posAttr.needsUpdate = true;
    }

    // 2. Cosmic Shooting Stars (Meteors)
    if (meteorsLineRef.current && !reducedMotion) {
      const lineAttr = meteorsLineRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const mArr = lineAttr.array as Float32Array;

      meteors.current.forEach((m, idx) => {
        m.timer -= delta;
        if (m.timer <= 0 && !m.active) {
          // Spawn new meteor at random top sky location
          m.active = true;
          m.startX = (Math.random() * 8 + 2) * (Math.random() > 0.5 ? 1 : -0.3);
          m.startY = Math.random() * 4 + 4;
          m.startZ = -7.5 + Math.random() * -2;
          m.currX = m.startX;
          m.currY = m.startY;
          m.currZ = m.startZ;
          m.speed = 13 + Math.random() * 6;
          m.timer = 0;
        }

        if (m.active) {
          // Advance head
          m.currX += m.dirX * m.speed * delta;
          m.currY += m.dirY * m.speed * delta;

          // Head vertex
          const base = idx * 6;
          mArr[base] = m.currX;
          mArr[base + 1] = m.currY;
          mArr[base + 2] = m.currZ;

          // Tail vertex (trailing behind along direction)
          mArr[base + 3] = m.currX - m.dirX * m.length;
          mArr[base + 4] = m.currY - m.dirY * m.length;
          mArr[base + 5] = m.currZ;

          // Out of bounds reset
          if (m.currY < -6 || m.currX < -12) {
            m.active = false;
            m.timer = 3.5 + Math.random() * 4.5; // Next spawn in 3.5 - 8 seconds
            // Collapse line segment
            mArr[base] = 0;
            mArr[base + 1] = -20;
            mArr[base + 2] = 0;
            mArr[base + 3] = 0;
            mArr[base + 4] = -20;
            mArr[base + 5] = 0;
          }
        }
      });

      lineAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Ambient Stardust Field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isWon ? 0.09 : 0.065}
          color={isWon ? '#6ee7b7' : '#93c5fd'}
          transparent
          opacity={isWon ? 0.8 : 0.45}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Deep Space Cosmic Shooting Stars */}
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
            opacity={0.65}
            linewidth={1.5}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
    </group>
  );
};
