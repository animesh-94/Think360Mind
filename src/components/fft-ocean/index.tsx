'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { VgpuMeshBackground } from '../ui/vgpu-mesh-background';

export function FftOceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hasWebGPU =
      typeof navigator !== 'undefined' &&
      'gpu' in navigator &&
      Boolean(navigator.gpu);

    if (!hasWebGPU) {
      setFallback(true);
      return;
    }

    let cancelled = false;
    let disposeRenderer: (() => void) | undefined;

    import('./renderer')
      .then(({ createRenderer }) => {
        if (cancelled || !canvasRef.current) return;
        const renderer = createRenderer({
          canvas: canvasRef.current,
          reducedMotion: Boolean(prefersReducedMotion),
        });
        disposeRenderer = renderer.dispose;
        renderer.ready.catch(() => {
          if (!cancelled) setFallback(true);
        });
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      disposeRenderer?.();
    };
  }, [prefersReducedMotion]);

  if (fallback) {
    return <VgpuMeshBackground intensity={1.08} interactive={true} />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none block h-full w-full touch-none"
      />
    </div>
  );
}

export default FftOceanBackground;
