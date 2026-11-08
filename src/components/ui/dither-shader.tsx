"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface DitherShaderProps {
  /** Pixel size of each dither cell (default: 3) */
  gridSize?: number;
  /** Animation speed multiplier (default: 0.65) */
  speed?: number;
  /** Dither pattern style */
  ditherMode?: "bayer" | "halftone" | "crosshatch";
  /** Foreground dither pixel RGB [0..1, 0..1, 0..1] (default: crisp white/silver) */
  primaryColor?: [number, number, number];
  /** Background RGB [0..1, 0..1, 0..1] (default: pure black) */
  backgroundColor?: [number, number, number];
  /** Enable interactive mouse wave distortion */
  interactive?: boolean;
  /** Additional className for the canvas wrapper */
  className?: string;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_gridSize;
  uniform vec3 u_primaryColor;
  uniform vec3 u_bgColor;
  uniform int u_mode;

  // 8x8 Bayer ordered dithering matrix approximated via recursive 4x4 + 2x2
  float bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
  }
  float bayer4(vec2 a) {
    return bayer2(0.5 * a) * 0.25 + bayer2(a);
  }
  float bayer8(vec2 a) {
    return bayer4(0.5 * a) * 0.25 + bayer2(a);
  }

  // Simplex-like 2D value noise for FBM fluid domain warping
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.02 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 fragCoord = v_uv * u_resolution;
    // Snap coordinates to the dither pixel grid
    vec2 cellIndex = floor(fragCoord / u_gridSize);
    vec2 snappedCoord = (cellIndex + 0.5) * u_gridSize;
    vec2 uv = (snappedCoord - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    // Interactive cursor ripple & attraction
    vec2 mouseUV = (u_mouse * u_resolution - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
    float mouseDist = length(uv - mouseUV);
    float mouseRipple = sin(mouseDist * 18.0 - u_time * 4.0) * exp(-mouseDist * 3.8) * 0.22;

    // Domain-warped FBM wave field + sculptural 360° ring geometry
    vec2 q = vec2(
      fbm(uv * 2.2 + vec2(0.0, u_time * 0.22)),
      fbm(uv * 2.2 + vec2(5.2, 1.3 - u_time * 0.18))
    );
    vec2 r = vec2(
      fbm(uv * 2.6 + 3.2 * q + vec2(1.7, 9.2) + 0.15 * u_time),
      fbm(uv * 2.6 + 3.2 * q + vec2(8.3, 2.8) - 0.12 * u_time)
    );
    float fluid = fbm(uv * 2.0 + 2.8 * r + mouseRipple);

    // Sculptural 360° torus / ring highlight in the right-center hero space
    vec2 ringCenter = vec2(0.28, 0.02);
    vec2 ringUV = uv - ringCenter;
    // Slight perspective tilt
    ringUV.y *= 1.28;
    ringUV.x += ringUV.y * 0.22;
    float ringRadius = length(ringUV);
    float torusBand = exp(-pow((ringRadius - 0.44) * 5.2, 2.0));
    float innerGlow = exp(-ringRadius * 2.6) * 0.35;

    // Combine fluid waves + sculptural ring + mouse interaction
    float luminance = fluid * 0.62 + torusBand * 0.65 + innerGlow + mouseRipple;

    // Softly vignette center-left so hero headline stays ultra-legible
    vec2 textSafeZone = uv - vec2(-0.34, 0.06);
    float textMask = smoothstep(0.12, 0.78, length(textSafeZone * vec2(0.75, 1.15)));
    luminance *= mix(0.22, 1.0, textMask);

    // Edge vignette
    float edgeVignette = smoothstep(1.35, 0.32, length(uv * vec2(0.75, 1.05)));
    luminance *= edgeVignette;
    luminance = clamp(luminance, 0.0, 1.0);

    // Ordered dither threshold
    float threshold = bayer8(cellIndex);
    if (u_mode == 1) {
      // Halftone dot mode
      vec2 cellLocal = fract(fragCoord / u_gridSize) - 0.5;
      threshold = length(cellLocal) * 1.35;
    }

    // Multi-level monochrome quantization (black, charcoal, silver, pure white)
    float dithered = step(threshold, luminance);
    float midTone = step(threshold, luminance * 0.55);

    vec3 col = mix(u_bgColor, u_primaryColor * 0.42, dithered);
    col = mix(col, u_primaryColor, midTone);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function DitherShader({
  gridSize = 3,
  speed = 0.65,
  ditherMode = "bayer",
  primaryColor = [0.96, 0.96, 0.98],
  backgroundColor = [0.02, 0.02, 0.03],
  interactive = true,
  className,
}: DitherShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.7,
    y: 0.5,
    targetX: 0.7,
    targetY: 0.5,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: false, depth: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    const compileShader = (type: number, source: string) => {
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

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
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

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uGridSize = gl.getUniformLocation(program, "u_gridSize");
    const uPrimaryColor = gl.getUniformLocation(program, "u_primaryColor");
    const uBgColor = gl.getUniformLocation(program, "u_bgColor");
    const uMode = gl.getUniformLocation(program, "u_mode");

    const resize = () => {
      if (!canvas) return;
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
    window.addEventListener("resize", resize);

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(1, rect.width);
      const ny = 1.0 - (e.clientY - rect.top) / Math.max(1, rect.height);
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        mouseRef.current.targetX = nx;
        mouseRef.current.targetY = ny;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let rafId = 0;
    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = prefersReducedMotion ? 1.5 : ((now - startTime) / 1000) * speed;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uGridSize, Math.max(2, gridSize * dpr));
      gl.uniform3f(uPrimaryColor, primaryColor[0], primaryColor[1], primaryColor[2]);
      gl.uniform3f(uBgColor, backgroundColor[0], backgroundColor[1], backgroundColor[2]);
      gl.uniform1i(uMode, ditherMode === "halftone" ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [gridSize, speed, ditherMode, primaryColor, backgroundColor, interactive, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  );
}

