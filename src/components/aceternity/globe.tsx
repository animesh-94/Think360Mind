'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface GlobeArc {
  id: string;
  fromCity: string;
  toCity: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
}

export const WORLDWIDE_ARCS: GlobeArc[] = [
  {
    id: 'mum-nyc',
    fromCity: 'Mumbai',
    toCity: 'New York',
    startLat: 19.076,
    startLng: 72.8777,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.32,
  },
  {
    id: 'blr-lon',
    fromCity: 'Bengaluru',
    toCity: 'London',
    startLat: 12.9716,
    startLng: 77.5946,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.25,
  },
  {
    id: 'del-dxb',
    fromCity: 'New Delhi',
    toCity: 'Dubai',
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 25.2048,
    endLng: 55.2708,
    arcAlt: 0.16,
  },
  {
    id: 'mum-sin',
    fromCity: 'Mumbai',
    toCity: 'Singapore',
    startLat: 19.076,
    startLng: 72.8777,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.18,
  },
  {
    id: 'blr-syd',
    fromCity: 'Bengaluru',
    toCity: 'Sydney',
    startLat: 12.9716,
    startLng: 77.5946,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.28,
  },
  {
    id: 'del-fra',
    fromCity: 'New Delhi',
    toCity: 'Frankfurt',
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 50.1109,
    endLng: 8.6821,
    arcAlt: 0.24,
  },
  {
    id: 'mum-tor',
    fromCity: 'Mumbai',
    toCity: 'Toronto',
    startLat: 19.076,
    startLng: 72.8777,
    endLat: 43.6532,
    endLng: -79.3832,
    arcAlt: 0.34,
  },
  {
    id: 'blr-tyo',
    fromCity: 'Bengaluru',
    toCity: 'Tokyo',
    startLat: 12.9716,
    startLng: 77.5946,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.24,
  },
];

// Geographically accurate continental coastline polygons [lng, lat]
const CONTINENT_POLYGONS: Array<Array<[number, number]>> = [
  // North America
  [
    [-168, 65], [-160, 71], [-130, 70], [-95, 72], [-78, 73], [-62, 66],
    [-53, 47], [-67, 45], [-70, 41], [-76, 35], [-81, 25], [-83, 29],
    [-90, 29], [-97, 26], [-96, 19], [-87, 21], [-83, 10], [-78, 8],
    [-85, 11], [-92, 15], [-105, 20], [-110, 24], [-114, 31], [-117, 33],
    [-122, 37], [-124, 48], [-135, 58], [-150, 61], [-162, 55],
  ],
  // Greenland
  [
    [-52, 60], [-43, 60], [-22, 70], [-18, 78], [-32, 83], [-58, 81],
    [-70, 76], [-56, 70],
  ],
  // South America
  [
    [-78, 9], [-72, 12], [-61, 10], [-50, 1], [-35, -6], [-39, -18],
    [-41, -23], [-48, -26], [-53, -34], [-62, -40], [-66, -48],
    [-68, -55], [-74, -52], [-74, -42], [-71, -30], [-71, -18],
    [-77, -12], [-81, -5], [-79, 2],
  ],
  // Europe (Mainland + Scandinavia)
  [
    [-9, 37], [-9, 43], [-2, 43], [-4, 48], [2, 51], [8, 54], [8, 58],
    [5, 62], [14, 68], [26, 71], [31, 70], [42, 67], [60, 68], [60, 50],
    [40, 47], [37, 45], [29, 45], [28, 41], [24, 40], [23, 37], [20, 39],
    [18, 43], [13, 45], [16, 41], [15, 38], [12, 42], [9, 44], [5, 43],
    [3, 42], [-1, 38], [-5, 36],
  ],
  // UK & Ireland
  [
    [-10, 51], [-6, 55], [-5, 58], [-2, 58], [1, 53], [1, 51], [-5, 50],
  ],
  // Africa
  [
    [-17, 15], [-17, 21], [-13, 28], [-6, 36], [10, 37], [11, 33],
    [25, 32], [33, 31], [38, 22], [43, 12], [51, 12], [49, 5], [41, -2],
    [40, -11], [35, -20], [33, -26], [28, -33], [18, -35], [15, -26],
    [12, -17], [13, -8], [9, -1], [9, 4], [2, 6], [-5, 5], [-8, 4],
    [-13, 9],
  ],
  // Madagascar
  [
    [44, -25], [47, -25], [50, -15], [49, -12], [44, -18],
  ],
  // Arabian Peninsula & Middle East
  [
    [35, 30], [36, 37], [48, 38], [50, 30], [56, 26], [60, 22],
    [54, 17], [44, 13], [40, 20],
  ],
  // India & South Asia
  [
    [67, 24], [72, 22], [73, 18], [75, 12], [77, 8], [80, 10],
    [81, 16], [87, 21], [90, 22], [92, 26], [88, 28], [78, 34], [70, 30],
  ],
  // Sri Lanka
  [
    [79.5, 6], [81.8, 6], [81.5, 9.5], [79.8, 9.5],
  ],
  // Eurasia / Asia Mainland
  [
    [60, 68], [85, 73], [115, 73], [145, 70], [170, 66], [162, 58],
    [156, 51], [142, 54], [135, 45], [131, 43], [129, 35], [126, 37],
    [124, 40], [119, 39], [122, 31], [120, 24], [114, 22], [108, 21],
    [109, 12], [105, 9], [100, 13], [103, 2], [100, 5], [98, 16],
    [92, 22], [88, 28], [75, 35], [66, 25], [56, 26], [48, 30],
    [48, 40], [60, 50],
  ],
  // Japan
  [
    [130, 31], [133, 33], [137, 35], [140, 35], [142, 41], [145, 44],
    [141, 45], [139, 39], [135, 35],
  ],
  // Indonesia / Borneo / Sumatra
  [
    [95, 5], [104, -1], [106, -6], [103, -5], [96, 2],
  ],
  [
    [106, -6], [114, -7], [114, -8.5], [106, -7.5],
  ],
  [
    [109, 1], [118, 5], [118, -3], [111, -3],
  ],
  // Philippines
  [
    [120, 18], [122, 18], [126, 7], [122, 7], [120, 14],
  ],
  // Australia
  [
    [114, -22], [122, -17], [131, -12], [136, -12], [136, -15],
    [141, -15], [142, -11], [146, -17], [153, -25], [153, -32],
    [150, -37], [145, -38], [138, -35], [135, -34], [129, -32],
    [122, -34], [115, -34], [113, -26],
  ],
  // New Zealand
  [
    [166, -46], [170, -45], [178, -38], [174, -35], [172, -41],
  ],
];

function pointInPolygon(lng: number, lat: number, poly: Array<[number, number]>) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isContinentLand(lat: number, lng: number): boolean {
  for (let i = 0; i < CONTINENT_POLYGONS.length; i++) {
    if (pointInPolygon(lng, lat, CONTINENT_POLYGONS[i])) {
      return true;
    }
  }
  return false;
}

function latLngToUnitVec3(lat: number, lng: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

function rotatePoint(
  p: { x: number; y: number; z: number },
  rotY: number,
  rotX: number
) {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

// Spherical linear interpolation (slerp) along great circle + 3D altitude
function sampleArc3DPoint(
  v0: { x: number; y: number; z: number },
  v1: { x: number; y: number; z: number },
  u: number,
  radius: number,
  arcAlt: number
) {
  const dot = Math.max(-1, Math.min(1, v0.x * v1.x + v0.y * v1.y + v0.z * v1.z));
  const omega = Math.acos(dot);
  let ux: number;
  let uy: number;
  let uz: number;

  if (omega < 0.001) {
    ux = v0.x;
    uy = v0.y;
    uz = v0.z;
  } else {
    const sinOmega = Math.sin(omega);
    const w0 = Math.sin((1 - u) * omega) / sinOmega;
    const w1 = Math.sin(u * omega) / sinOmega;
    ux = w0 * v0.x + w1 * v1.x;
    uy = w0 * v0.y + w1 * v1.y;
    uz = w0 * v0.z + w1 * v1.z;
  }

  const r = radius * (1 + arcAlt * Math.sin(Math.PI * u));
  return {
    x: ux * r,
    y: uy * r,
    z: uz * r,
  };
}

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  // Start centered on India / Europe / Middle East / Asia
  const rotationRef = useRef({ y: -2.65, x: 0.28 });
  const dragStartRef = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Precompute high-density Fibonacci sphere continent dots
    const landDots: Array<{ x: number; y: number; z: number }> = [];
    const totalSamples = 6500;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < totalSamples; i++) {
      const y = 1 - (i / (totalSamples - 1)) * 2;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lng = (((i / goldenRatio) * 360) % 360) - 180;
      if (isContinentLand(lat, lng)) {
        landDots.push(latLngToUnitVec3(lat, lng));
      }
    }

    // Precompute unit vectors for arcs
    const arcVectors = WORLDWIDE_ARCS.map((arc) => ({
      ...arc,
      v0: latLngToUnitVec3(arc.startLat, arc.startLng),
      v1: latLngToUnitVec3(arc.endLat, arc.endLng),
    }));

    let animId: number;
    let width = 560;
    let height = 560;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width || 540));
      height = Math.max(320, Math.floor(rect.height || 540));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const render = (now: number) => {
      if (!prefersReducedMotion && !isDragging) {
        rotationRef.current.y += 0.0028;
      }

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.4;
      const rotY = rotationRef.current.y;
      const rotX = rotationRef.current.x;

      ctx.clearRect(0, 0, width, height);

      // Pre-sample rotated 3D points for all arcs (48 segments per arc)
      const SAMPLES = 48;
      const sampledArcs = arcVectors.map((arc, idx) => {
        const pts: Array<{
          sx: number;
          sy: number;
          z: number;
          occluded: boolean;
        }> = [];
        for (let s = 0; s <= SAMPLES; s++) {
          const u = s / SAMPLES;
          const p3 = sampleArc3DPoint(arc.v0, arc.v1, u, radius, arc.arcAlt);
          const r = rotatePoint(p3, rotY, rotX);
          const distSq2D = r.x * r.x + r.y * r.y;
          // Strictly occluded if behind the sphere center plane AND inside the solid sphere silhouette
          const occluded = r.z < 0 && distSq2D < radius * radius;
          pts.push({
            sx: cx + r.x,
            sy: cy - r.y,
            z: r.z,
            occluded,
          });
        }
        return { arc, idx, pts };
      });

      // PASS 1: Draw back-limb arc segments (z < 0 but peeking above the horizon rim: !occluded)
      // Drawn BEFORE the solid opaque sphere so the sphere naturally masks any segment behind it
      sampledArcs.forEach(({ pts, idx }) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        let penDown = false;
        for (let s = 0; s <= SAMPLES; s++) {
          const pt = pts[s];
          if (pt.z < 0 && !pt.occluded) {
            if (!penDown) {
              ctx.moveTo(pt.sx, pt.sy);
              penDown = true;
            } else {
              ctx.lineTo(pt.sx, pt.sy);
            }
          } else {
            penDown = false;
          }
        }
        ctx.stroke();

        // Animated comet pulse on non-occluded back limb
        const t = (now * 0.00042 + idx * 0.17) % 1;
        const headIdx = Math.floor(t * SAMPLES);
        const tailIdx = Math.max(0, headIdx - 10);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        let cometPen = false;
        for (let s = tailIdx; s <= headIdx; s++) {
          const pt = pts[s];
          if (pt.z < 0 && !pt.occluded) {
            if (!cometPen) {
              ctx.moveTo(pt.sx, pt.sy);
              cometPen = true;
            } else {
              ctx.lineTo(pt.sx, pt.sy);
            }
          } else {
            cometPen = false;
          }
        }
        ctx.stroke();
      });

      // PASS 2: Draw 100% Opaque Solid Sphere Body (completely blocks everything behind it)
      const coreGrad = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.05,
        cx,
        cy,
        radius
      );
      coreGrad.addColorStop(0, '#181818');
      coreGrad.addColorStop(0.6, '#090909');
      coreGrad.addColorStop(1, '#000000');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle latitude/longitude graticule lines on front hemisphere only (z > 0)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.75;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 6) {
          const u = latLngToUnitVec3(lat, lng);
          const r = rotatePoint(
            { x: u.x * radius, y: u.y * radius, z: u.z * radius },
            rotY,
            rotX
          );
          if (r.z > 0) {
            if (!started) {
              ctx.moveTo(cx + r.x, cy - r.y);
              started = true;
            } else {
              ctx.lineTo(cx + r.x, cy - r.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Crisp rim outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.26)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // PASS 3: Draw Front-Hemisphere Geographical Continent Dots (strictly z > 0)
      for (let i = 0; i < landDots.length; i++) {
        const u = landDots[i];
        const r = rotatePoint(u, rotY, rotX);
        if (r.z > 0.02) {
          const sx = cx + r.x * radius;
          const sy = cy - r.y * radius;
          const alpha = Math.min(0.95, 0.25 + r.z * 0.75);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
          ctx.fillRect(sx - 1.15, sy - 1.15, 2.3, 2.3);
        }
      }

      // PASS 4: Draw Front-Hemisphere Arcs & City Beacons (strictly z >= 0)
      sampledArcs.forEach(({ arc, pts, idx }) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        let penDown = false;
        for (let s = 0; s <= SAMPLES; s++) {
          const pt = pts[s];
          if (pt.z >= 0) {
            if (!penDown) {
              ctx.moveTo(pt.sx, pt.sy);
              penDown = true;
            } else {
              ctx.lineTo(pt.sx, pt.sy);
            }
          } else {
            penDown = false;
          }
        }
        ctx.stroke();

        // Animated front-hemisphere comet trail
        const t = (now * 0.00042 + idx * 0.17) % 1;
        const headIdx = Math.floor(t * SAMPLES);
        const tailIdx = Math.max(0, headIdx - 10);

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        let cometPen = false;
        for (let s = tailIdx; s <= headIdx; s++) {
          const pt = pts[s];
          if (pt.z >= 0) {
            if (!cometPen) {
              ctx.moveTo(pt.sx, pt.sy);
              cometPen = true;
            } else {
              ctx.lineTo(pt.sx, pt.sy);
            }
          } else {
            cometPen = false;
          }
        }
        ctx.stroke();

        const headPt = pts[headIdx];
        if (headPt && headPt.z >= 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(headPt.sx, headPt.sy, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Endpoint beacons only when on front hemisphere (z > 0.08)
        const startPt = pts[0];
        const endPt = pts[SAMPLES];
        [
          { pt: startPt, label: arc.fromCity, isOrigin: true },
          { pt: endPt, label: arc.toCity, isOrigin: false },
        ].forEach((node) => {
          if (node.pt.z > radius * 0.08) {
            const pulse = (now * 0.0018 + idx * 0.25) % 1;
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(node.pt.sx, node.pt.sy, node.isOrigin ? 3.2 : 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - pulse) * 0.65})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.arc(node.pt.sx, node.pt.sy, 3 + pulse * 9, 0, Math.PI * 2);
            ctx.stroke();

            if (!node.isOrigin || idx === 0) {
              ctx.font = '700 9.5px Manrope, sans-serif';
              ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
              ctx.fillText(node.label.toUpperCase(), node.pt.sx + 7, node.pt.sy + 3);
            }
          }
        });
      });

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: rotationRef.current.y,
      rotX: rotationRef.current.x,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    rotationRef.current.y = dragStartRef.current.rotY + dx * 0.006;
    rotationRef.current.x = Math.max(
      -0.8,
      Math.min(0.8, dragStartRef.current.rotX + dy * 0.006)
    );
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-full h-[400px] sm:h-[520px] select-none',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label="Interactive 3D geographical globe showing Think360 Media global delivery network"
        role="img"
        className="w-full h-full max-w-[540px] max-h-[540px] cursor-grab active:cursor-grabbing touch-none"
      />
    </div>
  );
}
