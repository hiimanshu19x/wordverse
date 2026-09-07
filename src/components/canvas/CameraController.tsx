import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { CameraMode } from '../../types/game.ts';
import type { ScreenFXType } from '../../game/reactions.ts';

interface CameraControllerProps {
  mode: CameraMode;
  reducedMotion: boolean;
  keyboardPosition?: 'right' | 'left' | 'bottom';
  nearMiss?: boolean;
  screenFX?: ScreenFXType;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  mode,
  reducedMotion,
  keyboardPosition: _keyboardPosition = 'right',
  nearMiss = false,
  screenFX
}) => {
  const { camera } = useThree();
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.5, 7));
  const targetLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const trauma = useRef<number>(0);
  const prevFX = useRef<ScreenFXType>(null);

  if (screenFX && screenFX !== prevFX.current) {
    if (screenFX === 'lightning' || screenFX === 'quake') {
      trauma.current = 1.0;
    } else if (screenFX === 'laser' || screenFX === 'glitch' || screenFX === 'portal' || screenFX === 'blood') {
      trauma.current = 0.65;
    } else {
      trauma.current = 0.35;
    }
    prevFX.current = screenFX;
  } else if (!screenFX) {
    prevFX.current = null;
  }

  const prevModeRef = useRef<CameraMode>(mode);
  useEffect(() => {
    if (mode === 'galaxy' && prevModeRef.current !== 'galaxy') {
      const isMobile = window.innerWidth < 768;
      camera.position.set(0, isMobile ? 3.6 : 4.2, isMobile ? 8.2 : 9.2);
      camera.lookAt(0, 0, 0);
    }
    prevModeRef.current = mode;
  }, [mode, camera]);

  useFrame((state, delta) => {
    if (mode === 'explore' || mode === 'galaxy') return; // Handled by OrbitControls

    const time = state.clock.getElapsedTime();
    const { width, height } = state.size;
    const aspect = width / height;
    const isMobile = width < 768 || aspect < 1.0;

    switch (mode) {
      case 'intro': {
        // Slow poetic circular drift around the miniature world
        const introRadius = isMobile ? 8.6 : 7.2;
        const introAngle = time * 0.12;
        targetPos.current.set(
          Math.sin(introAngle) * introRadius * 0.55,
          2.0 + Math.sin(time * 0.2) * 0.3,
          Math.cos(introAngle) * introRadius * 0.75 + 1.6
        );
        targetLook.current.set(0, -0.3, -0.4);
        break;
      }

      case 'play': {
        const nearMissOffset = nearMiss && !reducedMotion ? -0.45 : 0;
        const nearMissPulse = nearMiss && !reducedMotion ? Math.sin(time * 5) * 0.03 : 0;

        if (isMobile) {
          const zDist = Math.min(8.6, Math.max(7.2, 3.1 / (2 * Math.tan((45 * Math.PI) / 360) * Math.max(0.44, aspect))));
          const parallaxX = reducedMotion ? 0 : state.pointer.x * 0.15;
          const parallaxY = reducedMotion ? 0 : -state.pointer.y * 0.1;

          // Align mobile camera with elevated letter grid safely above fixed bottom keyboard
          targetPos.current.set(parallaxX, 0.95 + parallaxY + nearMissPulse, zDist + nearMissOffset);
          targetLook.current.set(0, 0.68, 0.1);
        } else {
          const parallaxX = reducedMotion ? 0 : state.pointer.x * 0.25;
          const parallaxY = reducedMotion ? 0 : -state.pointer.y * 0.15;

          targetPos.current.set(parallaxX, 0.40 + parallaxY + nearMissPulse, 6.4 + nearMissOffset);
          targetLook.current.set(0, 0.15, 0.1);
        }
        break;
      }

      case 'submit': {
        if (isMobile) {
          const zDist = Math.min(8.2, Math.max(6.6, 2.9 / (2 * Math.tan((45 * Math.PI) / 360) * Math.max(0.44, aspect))));
          targetPos.current.set(0, 0.90, zDist - 0.4);
          targetLook.current.set(0, 0.68, 0.1);
        } else {
          targetPos.current.set(0, 0.35, 5.8);
          targetLook.current.set(0, 0.15, 0.1);
        }
        break;
      }

      case 'won': {
        // Dramatic pull-back orbital flyover celebrating the stabilized world
        const winAngle = time * 0.22;
        const winDist = isMobile ? 9.5 : 8.2;
        targetPos.current.set(
          Math.sin(winAngle) * winDist * 0.7,
          3.2 + Math.sin(time * 0.4) * 0.3,
          Math.cos(winAngle) * winDist * 0.7 + 1.2
        );
        targetLook.current.set(0, -0.3, -0.7);
        break;
      }
    }

    const lerpSpeed = reducedMotion ? 1.0 : delta * 2.8;
    camera.position.lerp(targetPos.current, lerpSpeed);

    // Apply procedural trauma camera shake
    if (trauma.current > 0 && !reducedMotion) {
      trauma.current = Math.max(0, trauma.current - delta * 2.2);
      const intensity = trauma.current * trauma.current;
      const shakeX = (Math.random() - 0.5) * intensity * 0.5;
      const shakeY = (Math.random() - 0.5) * intensity * 0.5;
      const shakeZ = (Math.random() - 0.5) * intensity * 0.25;
      camera.position.x += shakeX;
      camera.position.y += shakeY;
      camera.position.z += shakeZ;
    }

    // Smoothly interpolate camera lookAt
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    const desiredDir = targetLook.current.clone().sub(camera.position).normalize();
    camera.lookAt(
      camera.position.x + THREE.MathUtils.lerp(currentLook.x, desiredDir.x, lerpSpeed),
      camera.position.y + THREE.MathUtils.lerp(currentLook.y, desiredDir.y, lerpSpeed),
      camera.position.z + THREE.MathUtils.lerp(currentLook.z, desiredDir.z, lerpSpeed)
    );
  });

  return (
    <>
      {mode === 'explore' && (
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minDistance={3.5}
          maxDistance={12}
          target={[0, -0.3, 0]}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
        />
      )}
      {mode === 'galaxy' && (
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minDistance={4}
          maxDistance={16}
          target={[0, 0, 0]}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
        />
      )}
    </>
  );
};
