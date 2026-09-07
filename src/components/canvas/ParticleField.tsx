import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  isWon?: boolean;
  reducedMotion?: boolean;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 120,
  isWon = false,
  reducedMotion = false
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 12 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1;
      const riseSpeed = isWon ? 0.8 : 0.15;
      arr[idx] += delta * riseSpeed;

      // Wrap around bounds
      if (arr[idx] > 8) {
        arr[idx] = -6;
      }

      // Gentle lateral drift
      arr[i * 3] += Math.sin(time * 0.5 + i) * 0.002;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isWon ? 0.09 : 0.06}
        color={isWon ? '#a7f3d0' : '#94a3b8'}
        transparent
        opacity={isWon ? 0.75 : 0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};
