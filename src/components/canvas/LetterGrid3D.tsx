import React from 'react';
import { useThree } from '@react-three/fiber';
import type { GuessRowData, LetterStatus } from '../../types/game.ts';
import { LetterTile3D } from './LetterTile3D.tsx';

interface LetterGrid3DProps {
  rows: GuessRowData[];
  currentRowIndex: number;
  currentInput: string;
  isSubmitting: boolean;
  colorblindMode: boolean;
  reducedMotion: boolean;
  position?: [number, number, number];
}

export const LetterGrid3D: React.FC<LetterGrid3DProps> = ({
  rows,
  currentRowIndex,
  currentInput,
  isSubmitting,
  colorblindMode,
  reducedMotion,
  position
}) => {
  const { width, height } = useThree((s) => s.size);
  const isMobile = width < 768 || width / height < 1.0;

  // On mobile, the bottom 35% is occupied by the virtual keyboard.
  // We dynamically lift the grid and scale to 0.88 so all 6 rows remain 100% visible above the keyboard.
  const defaultPos: [number, number, number] = isMobile ? [0, 0.72, 0.35] : [0, 0.15, 0.35];
  const gridPosition = position || defaultPos;
  const gridScale = isMobile ? 0.88 : 1.0;

  const colSpacing = 0.52;
  const rowSpacing = 0.54;

  return (
    <group position={gridPosition} scale={gridScale} rotation={[-0.04, 0, 0]}>
      {rows.map((row, rowIndex) => {
        const isCurrentRow = rowIndex === currentRowIndex;

        return (
          <group
            key={rowIndex}
            position={[0, (2.5 - rowIndex) * rowSpacing, (rowIndex - 2.5) * 0.04]}
          >
            {[0, 1, 2, 3, 4].map((colIndex) => {
              let letter = '';
              let status: LetterStatus = 'empty';

              if (row.isSubmitted && row.evaluations) {
                letter = row.letters[colIndex] || '';
                status = row.evaluations[colIndex] || 'empty';
              } else if (isCurrentRow) {
                letter = currentInput[colIndex] || '';
                status = letter ? 'pending' : 'empty';
              }

              const isRowRevealing = isCurrentRow && isSubmitting;
              const revealDelay = colIndex * 0.22;

              return (
                <LetterTile3D
                  key={colIndex}
                  letter={letter}
                  status={status}
                  colIndex={colIndex}
                  isCurrentRow={isCurrentRow}
                  isRevealing={isRowRevealing}
                  revealDelay={revealDelay}
                  colorblindMode={colorblindMode}
                  reducedMotion={reducedMotion}
                  position={[(colIndex - 2) * colSpacing, 0, 0]}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
