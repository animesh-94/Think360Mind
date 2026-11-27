'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface VgpuMeshBackgroundProps {
  className?: string;
  interactive?: boolean;
  /** Visibility multiplier for the monochrome wave ribbons (default 1.0) */
  intensity?: number;
}

/**
 * Vercel `vgpu` WGSL fragment shader:
 * Clearly visible, sculptural 3D-projected monochrome wave ribbons & luminous
 * silk horizon strands in pure silver-white over deep obsidian black.
 */
export const VGPU_MESH_WGSL = /* wgsl */ `
struct Params {
  resolution: vec2f,
  mouse: vec2f,
  time: f32,
  intensity: f32,
  _pad0: f32,
  _pad1: f32,
};

@group(0) @binding(0) var<uniform> params: Params;

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let res = max(params.resolution, vec2f(1.0, 1.0));
  let aspect = res.x / res.y;
  let p = (uv - vec2f(0.5, 0.5)) * vec2f(aspect, 1.0);
  let t = params.time * 0.55;

  // Subtle interactive pointer tilt
  let m = (params.mouse - vec2f(0.5, 0.5)) * vec2f(aspect, 1.0);
  let pointerDist = length(p - m);
  let pointerBoost = exp(-pointerDist * 2.4) * 0.35;

  var strandAccum = 0.0;
  var glowAccum = 0.0;

  // 14 layered parametric silver-white light waves sweeping across the hero
  for (var i: i32 = 0; i < 14; i = i + 1) {
    let fi = f32(i);
    let norm = fi / 13.0;
    let phase = fi * 0.52;

    // Perspective wave curve combining low-frequency arc + organic harmonics
    let x = p.x * (1.25 + norm * 0.55) + m.x * (0.14 - norm * 0.10);
    let waveY =
      sin(x * 1.85 + t * (0.65 + norm * 0.25) + phase) * (0.16 + 0.08 * sin(t * 0.4 + fi)) +
      cos(x * 3.1 - t * 0.42 + phase * 1.4) * 0.055 +
      (norm - 0.5) * 0.52 +
      m.y * (0.08 - norm * 0.06);

    let dist = abs(p.y - waveY);

    // Crisp visible architectural filament + soft luminous halo
    let core = exp(-dist * (95.0 - norm * 25.0)) * (0.42 + 0.32 * sin(t * 0.7 + fi));
    let halo = exp(-dist * 12.0) * 0.055;

    strandAccum = strandAccum + core;
    glowAccum = glowAccum + halo;
  }

  // Secondary counter-flowing perspective depth curves (subtle orbital cross-weave)
  var crossAccum = 0.0;
  for (var j: i32 = 0; j < 6; j = j + 1) {
    let fj = f32(j);
    let yn = (fj / 5.0 - 0.5) * 0.72;
    let arcY =
      sin(p.x * 1.15 - t * 0.38 + fj * 0.9) * 0.22 +
      yn * (1.0 + 0.22 * p.x * p.x);
    let d2 = abs(p.y - arcY);
    crossAccum = crossAccum + exp(-d2 * 64.0) * 0.24;
  }

  // Soft volumetric studio spotlight behind the waves
  let horizonGlow = exp(-pow(p.y * 2.1, 2.0)) * 0.085;
  let edgeVignette = smoothstep(1.45, 0.25, length(p * vec2f(0.68, 1.05)));

  // Pure Monochrome Obsidian -> Crisp Silver -> Pure White (zero neon soup)
  let base = vec3f(0.008, 0.009, 0.011);
  let silver = vec3f(0.76, 0.78, 0.82);
  let pureWhite = vec3f(0.98, 0.98, 1.0);
  // Barely-there Neon Volt glint strictly on the sharpest peak near cursor
  let neonGlint = vec3f(0.80, 1.0, 0.0);

  let energy = (strandAccum * 0.55 + crossAccum * 0.45) * edgeVignette;
  var col = base + silver * (glowAccum + horizonGlow) * edgeVignette;
  col = col + pureWhite * energy * (0.82 + pointerBoost);
  col = col + neonGlint * strandAccum * pointerBoost * 0.22 * edgeVignette;

  // Keep center text readable while leaving waves unmistakably visible across the canvas
  let textCalm = mix(0.62, 1.0, smoothstep(0.06, 0.52, length(p * vec2f(0.85, 1.35))));
  col = clamp(col * textCalm * params.intensity, vec3f(0.0), vec3f(1.0));

  return vec4f(col, 1.0);
}
`;

const WEBGL_VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const WEBGL_FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_intensity;

  void main() {
    vec2 res = max(u_resolution, vec2(1.0));
    float aspect = res.x / res.y;
    vec2 p = (v_uv - vec2(0.5)) * vec2(aspect, 1.0);
    float t = u_time * 0.55;

    vec2 m = (u_mouse - vec2(0.5)) * vec2(aspect, 1.0);
    float pointerDist = length(p - m);
    float pointerBoost = exp(-pointerDist * 2.4) * 0.35;

    float strandAccum = 0.0;
    float glowAccum = 0.0;

    for (int i = 0; i < 14; i++) {
      float fi = float(i);
      float norm = fi / 13.0;
      float phase = fi * 0.52;

      float x = p.x * (1.25 + norm * 0.55) + m.x * (0.14 - norm * 0.10);
      float waveY =
        sin(x * 1.85 + t * (0.65 + norm * 0.25) + phase) * (0.16 + 0.08 * sin(t * 0.4 + fi)) +
        cos(x * 3.1 - t * 0.42 + phase * 1.4) * 0.055 +
        (norm - 0.5) * 0.52 +
        m.y * (0.08 - norm * 0.06);

      float dist = abs(p.y - waveY);
      float core = exp(-dist * (95.0 - norm * 25.0)) * (0.42 + 0.32 * sin(t * 0.7 + fi));
      float halo = exp(-dist * 12.0) * 0.055;

      strandAccum += core;
      glowAccum += halo;
    }

    float crossAccum = 0.0;
    for (int j = 0; j < 6; j++) {
      float fj = float(j);
      float yn = (fj / 5.0 - 0.5) * 0.72;
      float arcY =
        sin(p.x * 1.15 - t * 0.38 + fj * 0.9) * 0.22 +
        yn * (1.0 + 0.22 * p.x * p.x);
      float d2 = abs(p.y - arcY);
      crossAccum += exp(-d2 * 64.0) * 0.24;
    }

    float horizonGlow = exp(-pow(p.y * 2.1, 2.0)) * 0.085;
    float edgeVignette = smoothstep(1.45, 0.25, length(p * vec2(0.68, 1.05)));

    vec3 base = vec3(0.008, 0.009, 0.011);
    vec3 silver = vec3(0.76, 0.78, 0.82);
    vec3 pureWhite = vec3(0.98, 0.98, 1.0);
    vec3 neonGlint = vec3(0.80, 1.0, 0.0);

    float energy = (strandAccum * 0.55 + crossAccum * 0.45) * edgeVignette;
    vec3 col = base + silver * (glowAccum + horizonGlow) * edgeVignette;
    col += pureWhite * energy * (0.82 + pointerBoost);
    col += neonGlint * strandAccum * pointerBoost * 0.22 * edgeVignette;

    float textCalm = mix(0.62, 1.0, smoothstep(0.06, 0.52, length(p * vec2(0.85, 1.35))));
    col = clamp(col * textCalm * u_intensity, vec3(0.0), vec3(1.0));

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function VgpuMeshBackground({
  className,
  interactive = true,
  intensity = 1.0,
}: VgpuMeshBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.58, y: 0.46, targetX: 0.58, targetY: 0.46 });
  const prefersReducedMotion = useReducedMotion();
  const [backend, setBackend] = useState<'vgpu' | 'webgl' | 'idle'>('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        mouseRef.current.targetX = nx;
        mouseRef.current.targetY = ny;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const startWebGLFallback = () => {
      const gl =
        canvas.getContext('webgl2', { antialias: false, depth: false, powerPreference: 'high-performance' }) ||
        canvas.getContext('webgl', { antialias: false, depth: false });
      if (!gl) return;

      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = compile(gl.VERTEX_SHADER, WEBGL_VERTEX_SHADER);
      const fs = compile(gl.FRAGMENT_SHADER, WEBGL_FRAGMENT_SHADER);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const uResolution = gl.getUniformLocation(program, 'u_resolution');
      const uMouse = gl.getUniformLocation(program, 'u_mouse');
      const uTime = gl.getUniformLocation(program, 'u_time');
      const uIntensity = gl.getUniformLocation(program, 'u_intensity');

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width * dpr));
        const height = Math.max(1, Math.floor(rect.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };

      resize();
      window.addEventListener('resize', resize);
      setBackend('webgl');

      let rafId = 0;
      const start = performance.now();

      const draw = (now: number) => {
        if (cancelled) return;
        const elapsed = prefersReducedMotion ? 2.2 : (now - start) / 1000;
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.065;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.065;

        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uTime, elapsed);
        gl.uniform1f(uIntensity, intensity);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        if (!prefersReducedMotion) {
          rafId = requestAnimationFrame(draw);
        }
      };

      rafId = requestAnimationFrame(draw);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    };

    const startVgpu = async () => {
      const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator && Boolean(navigator.gpu);
      if (!hasWebGPU) {
        startWebGLFallback();
        return;
      }

      try {
        const [{ init, surface, effect, frameLoop, clock, frame }, { prepareShader }] = await Promise.all([
          import('vgpu'),
          import('@vgpu/wgsl/prepare'),
        ]);

        if (cancelled) return;

        const gpu = await init();
        if (cancelled) {
          gpu.dispose();
          return;
        }

        const prepared = prepareShader(VGPU_MESH_WGSL);
        const canvasSurface = surface(gpu, canvas, {
          dpr: [1, 2],
          clearColor: [0, 0, 0, 1],
        });

        const meshEffect = effect(gpu, prepared, {
          set: {
            params: {
              resolution: [Math.max(1, canvasSurface.size[0]), Math.max(1, canvasSurface.size[1])],
              mouse: [mouseRef.current.x, mouseRef.current.y],
              time: prefersReducedMotion ? 2.2 : 0,
              intensity,
              _pad0: 0,
              _pad1: 0,
            },
          },
        });

        const unsubscribeResize = canvasSurface.onResize((ev) => {
          meshEffect.set({
            params: {
              resolution: [Math.max(1, ev.width), Math.max(1, ev.height)],
            },
          });
        });

        setBackend('vgpu');

        if (prefersReducedMotion) {
          frame(gpu, (f) => {
            f.pass(canvasSurface, meshEffect);
          });
          cleanup = () => {
            unsubscribeResize();
            meshEffect.dispose();
            canvasSurface.dispose();
            gpu.dispose();
          };
          return;
        }

        const clk = clock(gpu);
        const handle = frameLoop(gpu, (f) => {
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.065;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.065;

          meshEffect.set({
            params: {
              resolution: [Math.max(1, canvasSurface.size[0]), Math.max(1, canvasSurface.size[1])],
              mouse: [mouseRef.current.x, mouseRef.current.y],
              time: clk.time,
              intensity,
            },
          });
          f.pass(canvasSurface, meshEffect);
        });

        cleanup = () => {
          handle.stop();
          unsubscribeResize();
          meshEffect.dispose();
          canvasSurface.dispose();
          gpu.dispose();
        };
      } catch {
        if (!cancelled) {
          startWebGLFallback();
        }
      }
    };

    startVgpu();

    return () => {
      cancelled = true;
      window.removeEventListener('pointermove', onPointerMove);
      cleanup?.();
    };
  }, [interactive, intensity, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-renderer={backend}
      className={cn('pointer-events-none block h-full w-full', className)}
    />
  );
}
