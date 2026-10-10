/** Isometric (2:1 diamond) projection helpers shared by the SVG artwork. */

export const TILE_W = 64;
export const TILE_H = 32;

export type Pt = readonly [number, number];

/** Grid (i, j) at height z (px) to screen coordinates. */
export function iso(i: number, j: number, z = 0): Pt {
  return [((i - j) * TILE_W) / 2, ((i + j) * TILE_H) / 2 - z];
}

export function pts(list: readonly Pt[]): string {
  return list.map(([x, y]) => `${round(x)},${round(y)}`).join(' ');
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Floor diamond of a rectangle on the grid. */
export function quad(i: number, j: number, w: number, d: number, z = 0): string {
  return pts([iso(i, j, z), iso(i + w, j, z), iso(i + w, j + d, z), iso(i, j + d, z)]);
}

/** Face along the j = j0 edge (runs i0 -> i1), rising by h; it faces screen down-left. */
export function wallAlongI(i0: number, i1: number, j: number, z0: number, z1: number): string {
  return pts([iso(i0, j, z0), iso(i1, j, z0), iso(i1, j, z1), iso(i0, j, z1)]);
}

/** Face along the i = i0 edge (runs j0 -> j1), rising by h; it faces screen down-right. */
export function wallAlongJ(i: number, j0: number, j1: number, z0: number, z1: number): string {
  return pts([iso(i, j0, z0), iso(i, j1, z0), iso(i, j1, z1), iso(i, j0, z1)]);
}

/** Deterministic pseudo-random generator so the artwork renders identically everywhere. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
