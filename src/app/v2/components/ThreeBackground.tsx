'use client';

import { useEffect, useRef } from 'react';
import { initConstellationBackground } from '../utils/three-constellation';

export const ThreeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const constellationRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncWithViewport = () => {
      const isDesktop = window.matchMedia('(min-width: 901px)').matches;

      if (!isDesktop) {
        constellationRef.current?.dispose();
        constellationRef.current = null;
        return;
      }

      // The initial mount can happen on mobile. Initialize once the viewport
      // crosses into the desktop layout, and avoid duplicate render loops.
      if (!constellationRef.current) {
        constellationRef.current = initConstellationBackground({
          canvas,
          particleCount: 40,
          maxDistance: 15,
        });
      }
    };

    syncWithViewport();
    window.addEventListener('resize', syncWithViewport);

    return () => {
      window.removeEventListener('resize', syncWithViewport);
      constellationRef.current?.dispose();
      constellationRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="three-background fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
