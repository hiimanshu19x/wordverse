import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import type {
  GuessRowData,
  WorldBiome,
  CameraMode,
  SolvedWorld
} from '../../types/game.ts';
import type { ScreenFXType } from '../../game/reactions.ts';
import { CameraController } from './CameraController.tsx';
import { LetterGrid3D } from './LetterGrid3D.tsx';
import { MiniatureWorld } from './MiniatureWorld.tsx';
import { ParticleField } from './ParticleField.tsx';
import { GalaxyView3D } from './GalaxyView3D.tsx';
import { DynamicWordFX3D } from './DynamicWordFX3D.tsx';
import { SemanticVFX } from './SemanticVFX.tsx';

interface WorldCanvasProps {
  mode: CameraMode;
  biome: WorldBiome;
  stage: number;
  isWon: boolean;
  rows: GuessRowData[];
  currentRowIndex: number;
  currentInput: string;
  isSubmitting: boolean;
  colorblindMode: boolean;
  reducedMotion: boolean;
  solvedWorlds: SolvedWorld[];
  onSelectGalaxyWorld: (world: SolvedWorld) => void;
  selectedGalaxyWorld: SolvedWorld | null;
  isLanding?: boolean;
  keyboardPosition?: 'right' | 'left' | 'bottom';
  reactionState?: import('../../types/game.ts').WorldReactionState;
  clues?: import('../../types/game.ts').HiddenClue[];
  onDiscoverClue?: (clue: import('../../types/game.ts').HiddenClue) => void;
  streak?: number;
  screenFX?: ScreenFXType;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({
  mode,
  biome,
  stage,
  isWon,
  rows,
  currentRowIndex,
  currentInput,
  isSubmitting,
  colorblindMode,
  reducedMotion,
  solvedWorlds,
  onSelectGalaxyWorld,
  selectedGalaxyWorld,
  isLanding = false,
  keyboardPosition = 'right',
  reactionState,
  clues,
  onDiscoverClue,
  streak = 1,
  screenFX = null
}) => {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#07090e']} />
        <fog attach="fog" args={['#07090e', 14, 42]} />

        {/* Ambient & Directional Lighting modulated by word physics brightness */}
        <hemisphereLight
          color="#38bdf8"
          groundColor="#090d16"
          intensity={0.65 * (reactionState?.physics.brightness || 1.0)}
        />
        <directionalLight
          position={[5, 10, 6]}
          intensity={1.3 * (reactionState?.physics.brightness || 1.0)}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={0.0001}
        />
        {/* Cool Rim Light */}
        <directionalLight
          position={[-6, 4, -4]}
          intensity={0.9 * (reactionState?.physics.brightness || 1.0)}
          color="#38bdf8"
        />
        {/* Subtle Front Key Light for crisp, high-contrast 3D tiles */}
        <directionalLight
          position={[0, 3, 5]}
          intensity={0.65}
          color="#f1f5f9"
        />
        {/* Subtle Ambient Diorama Upward Glow */}
        <pointLight
          position={[0, -3.2, -1]}
          intensity={0.5}
          color="#10b981"
          distance={7}
        />

        <Suspense fallback={null}>
          <CameraController
            mode={mode}
            reducedMotion={reducedMotion}
            keyboardPosition={keyboardPosition}
            nearMiss={reactionState?.nearMiss || false}
            screenFX={screenFX}
          />

          <DynamicWordFX3D fx={screenFX} reducedMotion={reducedMotion} />

          {mode === 'galaxy' ? (
            <GalaxyView3D
              worlds={solvedWorlds}
              onSelectWorld={onSelectGalaxyWorld}
              selectedWorld={selectedGalaxyWorld}
              reducedMotion={reducedMotion}
              streak={streak}
            />
          ) : (
            <>
              <MiniatureWorld
                biome={biome}
                stage={stage}
                isWon={isWon}
                reducedMotion={reducedMotion}
                reactionState={reactionState}
                clues={clues}
                onDiscoverClue={onDiscoverClue}
                mode={mode}
                position={mode === 'intro' ? [0, -0.65, 0] : [0, -3.1, -2.7]}
                scale={mode === 'intro' ? 1.25 : 0.78}
              />

              {/* Show Letter Grid ONLY during active gameplay & inspection, NEVER on landing */}
              {!isLanding && mode !== 'intro' && (
                <LetterGrid3D
                  rows={rows}
                  currentRowIndex={currentRowIndex}
                  currentInput={currentInput}
                  isSubmitting={isSubmitting}
                  colorblindMode={colorblindMode}
                  reducedMotion={reducedMotion}
                />
              )}

              {/* Full-Screen Semantic Environmental VFX */}
              <SemanticVFX
                activeEffects={reactionState?.activeEffects || []}
                isWon={isWon}
                reducedMotion={reducedMotion}
                mode={mode}
              />
            </>
          )}

          <ParticleField isWon={isWon} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};
