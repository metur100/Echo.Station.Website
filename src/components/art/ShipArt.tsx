import type { ReactNode } from 'react';
import { iso, pts, quad, seeded, TILE_H, TILE_W, wallAlongI, wallAlongJ, type Pt } from './iso';
import { C, type ToneColor } from './palette';

/**
 * Original isometric cutaway of the ESV Meridian, generated from a room list so
 * that every polygon sits exactly on the 2:1 hull grid.
 */

const WALL_OUTER = 30;
const WALL_INNER = 11;
const SLAB = 30;
const SQRT2 = Math.SQRT2;

type Machine = 'lab' | 'oxygen' | 'recycler' | 'storage' | 'workshop' | 'quarters' | 'reactor' | 'radiator' | 'shield' | 'hydro' | 'containment' | 'airlock';

interface RoomDef {
  readonly id: Machine;
  readonly i: number;
  readonly j: number;
  readonly w: number;
  readonly d: number;
  readonly tone: ToneColor;
  readonly glow: number;
}

const ROOMS: readonly RoomDef[] = [
  { id: 'lab', i: 0, j: 0, w: 2, d: 2, tone: 'cyan', glow: 0.5 },
  { id: 'oxygen', i: 2, j: 0, w: 2, d: 2, tone: 'cyan', glow: 0.7 },
  { id: 'recycler', i: 4, j: 0, w: 2, d: 2, tone: 'cyan', glow: 0.55 },
  { id: 'storage', i: 6, j: 0, w: 4, d: 2, tone: 'violet', glow: 0.75 },
  { id: 'workshop', i: 0, j: 3, w: 2, d: 2, tone: 'amber', glow: 0.35 },
  { id: 'quarters', i: 2, j: 3, w: 2, d: 2, tone: 'teal', glow: 0.4 },
  { id: 'reactor', i: 4, j: 3, w: 2, d: 2, tone: 'amber', glow: 1 },
  { id: 'radiator', i: 6, j: 3, w: 2, d: 2, tone: 'orange', glow: 0.5 },
  { id: 'shield', i: 8, j: 3, w: 2, d: 2, tone: 'cyan', glow: 0.45 },
  { id: 'hydro', i: 0, j: 5, w: 4, d: 2, tone: 'success', glow: 0.7 },
  { id: 'containment', i: 4, j: 5, w: 2, d: 2, tone: 'violet', glow: 0.45 },
  { id: 'airlock', i: 6, j: 5, w: 1, d: 2, tone: 'frost', glow: 0.4 },
];

const TONES: readonly ToneColor[] = ['cyan', 'teal', 'amber', 'orange', 'violet', 'success', 'frost'];

interface Props {
  /** Prefix for gradient/filter ids so the art can appear more than once per document. */
  readonly idPrefix?: string;
  readonly className?: string;
  /** Decorative usage hides the art from assistive technology. */
  readonly decorative?: boolean;
}

export function ShipArt({ idPrefix = 'ship', className, decorative = false }: Props) {
  const p = idPrefix;
  const sorted = [...ROOMS].sort((a, b) => a.i + a.w / 2 + a.j + a.d / 2 - (b.i + b.w / 2 + b.j + b.d / 2));
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-labelledby': `${p}-title ${p}-desc` };

  return (
    <svg
      className={className}
      viewBox="-236 -40 596 320"
      width="596"
      height="320"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y}
    >
      {!decorative && (
        <>
          <title id={`${p}-title`}>Cutaway of the ESV Meridian</title>
          <desc id={`${p}-desc`}>
            An isometric cross-section of a research vessel: an amber reactor core glows at its centre, surrounded by cyan-lit
            oxygen and recycler units, a green hydroponics bay, crew quarters, corridors with teal floor lights, an airlock on
            the hull edge and a sealed violet storage bay where faint bioluminescent tendrils of the Lumen Bloom are spreading.
          </desc>
        </>
      )}
      <Defs p={p} />

      <HullSlab p={p} i={0} j={0} w={10} d={5} />
      <HullSlab p={p} i={0} j={5} w={7} d={2} />
      <Bow p={p} />

      {/* Corridor spine: flat, so it can be painted before the rooms. */}
      <Corridor p={p} />

      {sorted.map((room) => (
        <Room key={room.id} room={room} p={p} />
      ))}

      {/* Crew walking the corridor (painted with the corridor layer's depth). */}
      <Figure at={iso(7.4, 2.55)} suit={C.cyan} />
    </svg>
  );
}

function Defs({ p }: { p: string }) {
  return (
    <defs>
      {TONES.map((tone) => (
        <radialGradient key={tone} id={`${p}-pool-${tone}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C[tone]} stopOpacity="0.42" />
          <stop offset="55%" stopColor={C[tone]} stopOpacity="0.12" />
          <stop offset="100%" stopColor={C[tone]} stopOpacity="0" />
        </radialGradient>
      ))}
      <linearGradient id={`${p}-core`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#7A4A12" />
        <stop offset="0.35" stopColor={C.amber} />
        <stop offset="0.55" stopColor="#FFE2A8" />
        <stop offset="0.8" stopColor={C.amber} />
        <stop offset="1" stopColor="#8A5414" />
      </linearGradient>
      <linearGradient id={`${p}-tank`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#0B1A2C" />
        <stop offset="0.5" stopColor="#1C3550" />
        <stop offset="1" stopColor="#0A1424" />
      </linearGradient>
      <linearGradient id={`${p}-hullL`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#15223F" />
        <stop offset="1" stopColor="#070C1A" />
      </linearGradient>
      <linearGradient id={`${p}-hullR`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#0F1930" />
        <stop offset="1" stopColor="#05080F" />
      </linearGradient>
      <filter id={`${p}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="16" />
      </filter>
      <filter id={`${p}-soft`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
    </defs>
  );
}

/* ---------- primitives ---------- */

interface PrismProps {
  readonly i: number;
  readonly j: number;
  readonly w: number;
  readonly d: number;
  readonly h: number;
  readonly z?: number;
  readonly top?: string;
  readonly left?: string;
  readonly right?: string;
  readonly stroke?: string;
}

/** Box standing on the grid. "left" faces screen down-left, "right" faces down-right. */
function Prism({ i, j, w, d, h, z = 0, top = C.raised, left = '#101B33', right = '#0B1428', stroke = C.lineStrong }: PrismProps) {
  return (
    <g strokeWidth="0.8" stroke={stroke} strokeLinejoin="round">
      <polygon points={wallAlongI(i, i + w, j + d, z, z + h)} fill={left} />
      <polygon points={wallAlongJ(i + w, j, j + d, z, z + h)} fill={right} />
      <polygon points={quad(i, j, w, d, z + h)} fill={top} />
    </g>
  );
}

interface CylProps {
  readonly i: number;
  readonly j: number;
  readonly r: number;
  readonly h: number;
  readonly z?: number;
  readonly body: string;
  readonly top: string;
  readonly stroke?: string;
  readonly className?: string;
}

function Cylinder({ i, j, r, h, z = 0, body, top, stroke = C.lineStrong, className }: CylProps) {
  const [cx, cy] = iso(i, j, z);
  const rx = (r * TILE_W * SQRT2) / 2;
  const ry = (r * TILE_H * SQRT2) / 2;
  const d = `M${cx - rx},${cy} A${rx},${ry} 0 0 0 ${cx + rx},${cy} L${cx + rx},${cy - h} L${cx - rx},${cy - h} Z`;
  return (
    <g className={className} stroke={stroke} strokeWidth="0.8">
      <path d={d} fill={body} />
      <ellipse cx={cx} cy={cy - h} rx={rx} ry={ry} fill={top} />
    </g>
  );
}

function Ring({ i, j, r, z, color, width = 1.2, opacity = 0.8, dash }: { i: number; j: number; r: number; z: number; color: string; width?: number; opacity?: number; dash?: string }) {
  const [cx, cy] = iso(i, j, z);
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={(r * TILE_W * SQRT2) / 2}
      ry={(r * TILE_H * SQRT2) / 2}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeOpacity={opacity}
      strokeDasharray={dash}
    />
  );
}

function Pool({ p, i, j, r, tone, opacity }: { p: string; i: number; j: number; r: number; tone: ToneColor; opacity: number }) {
  const [cx, cy] = iso(i, j);
  return <ellipse cx={cx} cy={cy} rx={r * TILE_W * 0.72} ry={r * TILE_H * 0.72} fill={`url(#${p}-pool-${tone})`} opacity={opacity} />;
}

function Figure({ at, suit }: { at: Pt; suit: string }) {
  const [x, y] = at;
  return (
    <g>
      <ellipse cx={x} cy={y} rx="5.5" ry="2.6" fill={C.bg0} opacity="0.55" />
      <path d={`M${x - 3.6},${y - 2} L${x - 3.8},${y - 12} Q${x},${y - 15.5} ${x + 3.8},${y - 12} L${x + 3.6},${y - 2} Z`} fill={C.raised} stroke={suit} strokeWidth="1" />
      <line x1={x - 2.6} y1={y - 9} x2={x + 2.6} y2={y - 9} stroke={suit} strokeWidth="1.4" />
      <circle cx={x} cy={y - 17.6} r="3.4" fill="#C9D3E6" stroke={C.bg2} strokeWidth="0.6" />
    </g>
  );
}

/* ---------- hull ---------- */

function HullSlab({ p, i, j, w, d }: { p: string; i: number; j: number; w: number; d: number }) {
  const seams: ReactNode[] = [];
  for (let k = i + 1; k < i + w; k += 1) {
    const [x1, y1] = iso(k, j + d, -2);
    const [, y2] = iso(k, j + d, -SLAB + 2);
    seams.push(<line key={`a${k}`} x1={x1} y1={y1} x2={x1} y2={y2} stroke={C.line} strokeWidth="0.8" />);
  }
  for (let k = j + 1; k < j + d; k += 1) {
    const [x1, y1] = iso(i + w, k, -2);
    const [, y2] = iso(i + w, k, -SLAB + 2);
    seams.push(<line key={`b${k}`} x1={x1} y1={y1} x2={x1} y2={y2} stroke={C.line} strokeWidth="0.8" />);
  }
  const stripL = [iso(i, j + d, -SLAB * 0.42), iso(i + w, j + d, -SLAB * 0.42)];
  const stripR = [iso(i + w, j, -SLAB * 0.42), iso(i + w, j + d, -SLAB * 0.42)];
  const windows: ReactNode[] = [];
  for (let k = i + 0.5; k < i + w; k += 1) {
    const [x, y] = iso(k, j + d, -SLAB * 0.7);
    windows.push(<rect key={`w${k}`} x={x - 3} y={y - 1} width="6" height="2" rx="1" fill={C.frost} opacity="0.35" />);
  }
  return (
    <g>
      <polygon points={wallAlongI(i, i + w, j + d, -SLAB, 0)} fill={`url(#${p}-hullL)`} stroke={C.lineStrong} strokeWidth="0.8" />
      <polygon points={wallAlongJ(i + w, j, j + d, -SLAB, 0)} fill={`url(#${p}-hullR)`} stroke={C.lineStrong} strokeWidth="0.8" />
      {seams}
      <polyline points={pts(stripL)} stroke={C.teal} strokeOpacity="0.45" strokeWidth="1" fill="none" />
      <polyline points={pts(stripR)} stroke={C.teal} strokeOpacity="0.3" strokeWidth="1" fill="none" />
      {windows}
      <polygon points={quad(i, j, w, d)} fill={C.bg2} stroke={C.lineStrong} strokeWidth="1" />
    </g>
  );
}

function Bow({ p }: { p: string }) {
  const top = [iso(10, 0), iso(12.7, 1.85), iso(12.7, 3.15), iso(10, 5)];
  const faceL = [iso(12.7, 3.15), iso(10, 5), iso(10, 5, -SLAB), iso(12.7, 3.15, -SLAB * 0.7)];
  const faceR = [iso(12.7, 1.85), iso(12.7, 3.15), iso(12.7, 3.15, -SLAB * 0.7), iso(12.7, 1.85, -SLAB * 0.7)];
  const tip = iso(12.7, 2.5, 4);
  return (
    <g>
      <polygon points={pts(faceL)} fill={`url(#${p}-hullL)`} stroke={C.lineStrong} strokeWidth="0.8" />
      <polygon points={pts(faceR)} fill={`url(#${p}-hullR)`} stroke={C.lineStrong} strokeWidth="0.8" />
      <polygon points={pts(top)} fill="#0D1730" stroke={C.lineStrong} strokeWidth="1" />
      {[0.8, 1.6, 2.4].map((k) => (
        <polyline key={k} points={pts([iso(10 + k, k * 0.68), iso(10 + k, 5 - k * 0.68)])} stroke={C.line} strokeWidth="0.8" fill="none" />
      ))}
      <polyline points={pts([iso(10.2, 2.5), iso(12.5, 2.5)])} stroke={C.teal} strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
      <Cylinder i={11.5} j={2.5} r={0.34} h={7} body={C.raised} top="#1A2B4C" />
      <Ring i={11.5} j={2.5} r={0.22} z={7} color={C.cyan} opacity={0.7} />
      <circle cx={tip[0]} cy={tip[1]} r="2" fill={C.success} className="es-blink es-blink--late" />
    </g>
  );
}

/* ---------- interior ---------- */

function Corridor({ p }: { p: string }) {
  const i0 = 0;
  const i1 = 10;
  const strips = [2.18, 2.82];
  return (
    <g>
      <polygon points={quad(i0, 2, i1 - i0, 1)} fill="#091124" stroke={C.line} strokeWidth="0.8" />
      {Array.from({ length: i1 - i0 - 1 }, (_, k) => (
        <polyline key={k} points={pts([iso(i0 + k + 1, 2), iso(i0 + k + 1, 3)])} stroke={C.line} strokeWidth="0.6" fill="none" />
      ))}
      {strips.map((j) => (
        <g key={j}>
          <polyline points={pts([iso(i0 + 0.15, j), iso(i1, j)])} stroke={C.teal} strokeWidth="3" strokeOpacity="0.35" filter={`url(#${p}-soft)`} fill="none" />
          <polyline points={pts([iso(i0 + 0.15, j), iso(i1, j)])} stroke={C.teal} strokeWidth="1.1" strokeOpacity="0.9" fill="none" />
        </g>
      ))}
      <polygon points={wallAlongJ(0, 2, 3, 0, WALL_OUTER)} fill="#0C1529" stroke={C.lineStrong} strokeWidth="0.8" />
    </g>
  );
}

function Room({ room, p }: { room: RoomDef; p: string }) {
  const { i, j, w, d, tone, glow } = room;
  const backOuter = j === 0;
  const sideOuter = i === 0;
  const hBack = backOuter ? WALL_OUTER : WALL_INNER;
  const hSide = sideOuter ? WALL_OUTER : WALL_INNER;
  const grid: ReactNode[] = [];
  for (let k = 1; k < w; k += 1) grid.push(<polyline key={`gi${k}`} points={pts([iso(i + k, j), iso(i + k, j + d)])} />);
  for (let k = 1; k < d; k += 1) grid.push(<polyline key={`gj${k}`} points={pts([iso(i, j + k), iso(i + w, j + k)])} />);
  const [lx1, ly1] = iso(i + 0.08, j, hBack * 0.82);
  const [lx2, ly2] = iso(i + w - 0.08, j, hBack * 0.82);

  return (
    <g>
      <polygon points={quad(i, j, w, d)} fill={C.panel} stroke={C.line} strokeWidth="0.8" />
      <g stroke={C.line} strokeWidth="0.5" fill="none" opacity="0.8">
        {grid}
      </g>
      <Pool p={p} i={i + w / 2} j={j + d / 2} r={Math.max(w, d) * 0.62} tone={tone} opacity={glow} />
      {/* two back walls */}
      <polygon points={wallAlongJ(i, j, j + d, 0, hSide)} fill={sideOuter ? '#0C1529' : '#0E1830'} stroke={C.lineStrong} strokeWidth="0.8" />
      <polygon points={wallAlongI(i, i + w, j, 0, hBack)} fill={backOuter ? '#111D37' : '#13203B'} stroke={C.lineStrong} strokeWidth="0.8" />
      {backOuter && <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={C[tone]} strokeOpacity="0.55" strokeWidth="1.2" />}
      <MachineFor room={room} p={p} />
    </g>
  );
}

function MachineFor({ room, p }: { room: RoomDef; p: string }) {
  switch (room.id) {
    case 'reactor':
      return <Reactor p={p} />;
    case 'oxygen':
      return <Oxygen p={p} />;
    case 'recycler':
      return <Recycler p={p} />;
    case 'storage':
      return <Storage p={p} />;
    case 'lab':
      return <Lab />;
    case 'workshop':
      return <Workshop />;
    case 'quarters':
      return <Quarters />;
    case 'radiator':
      return <Radiator />;
    case 'shield':
      return <Shield />;
    case 'hydro':
      return <Hydroponics />;
    case 'containment':
      return <Containment p={p} />;
    case 'airlock':
      return <Airlock />;
  }
}

function Reactor({ p }: { p: string }) {
  const [cx, cy] = iso(5, 4, 28);
  return (
    <g>
      <ellipse cx={cx} cy={cy + 4} rx="44" ry="42" fill={C.amber} opacity="0.24" filter={`url(#${p}-glow)`} className="es-pulse" />
      <Prism i={4.2} j={3.2} w={1.6} d={1.6} h={5} top="#1A2440" left="#121C35" right="#0C152A" />
      <Ring i={5} j={4} r={0.72} z={5} color={C.amber} opacity={0.5} dash="3 3" />
      <Cylinder i={5} j={4} r={0.52} h={12} z={5} body={C.raised} top="#1B2A4A" />
      <Cylinder i={5} j={4} r={0.33} h={40} z={12} body={`url(#${p}-core)`} top="#FFE7B8" stroke="#B3741F" />
      <g className="es-pulse">
        <Ring i={5} j={4} r={0.5} z={26} color={C.amber} width={1.6} />
        <Ring i={5} j={4} r={0.5} z={40} color={C.amber} width={1.6} />
      </g>
      <Cylinder i={5} j={4} r={0.42} h={4} z={52} body={C.raised} top="#22345A" />
      {[
        [4.25, 4.6],
        [5.7, 3.35],
      ].map(([a, b]) => (
        <Prism key={a} i={a ?? 0} j={b ?? 0} w={0.32} d={0.32} h={14} top={C.amber} left="#3A2A14" right="#2A1E0F" stroke="#5A3C14" />
      ))}
    </g>
  );
}

function Oxygen({ p }: { p: string }) {
  return (
    <g>
      {[2.55, 3.45].map((i) => (
        <g key={i}>
          <Cylinder i={i} j={0.55} r={0.3} h={34} body={`url(#${p}-tank)`} top="#1E3A55" />
          <Ring i={i} j={0.55} r={0.3} z={12} color={C.cyan} opacity={0.75} />
          <Ring i={i} j={0.55} r={0.3} z={24} color={C.cyan} opacity={0.75} />
          <Ring i={i} j={0.55} r={0.18} z={34} color={C.cyan} width={1.6} />
        </g>
      ))}
      <Prism i={2.35} j={1.3} w={1.3} d={0.4} h={9} top="#183048" />
      <polyline points={pts([iso(2.45, 1.5, 9.5), iso(3.55, 1.5, 9.5)])} stroke={C.cyan} strokeWidth="1.6" strokeOpacity="0.8" fill="none" />
    </g>
  );
}

function Recycler({ p }: { p: string }) {
  return (
    <g>
      <Prism i={4.25} j={0.25} w={1.5} d={0.7} h={18} top="#172846" />
      <polyline points={pts([iso(4.3, 0.95, 12), iso(5.7, 0.95, 12)])} stroke={C.cyan} strokeWidth="1.4" strokeOpacity="0.8" fill="none" />
      <Cylinder i={5.25} j={1.45} r={0.3} h={18} body={`url(#${p}-tank)`} top={C.cyan} />
      <Ring i={5.25} j={1.45} r={0.3} z={9} color={C.cyan} opacity={0.6} />
      <Prism i={4.35} j={1.3} w={0.45} d={0.45} h={8} top="#1A2C4A" />
    </g>
  );
}

function Storage({ p }: { p: string }) {
  const crates: readonly [number, number, number, number, number][] = [
    [6.25, 0.25, 0.7, 0.7, 16],
    [7.05, 0.25, 0.6, 0.6, 11],
    [6.25, 1.1, 0.55, 0.55, 9],
    [8.75, 0.25, 0.95, 0.6, 18],
    [9.1, 1.05, 0.6, 0.6, 10],
  ];
  const rnd = seeded(7);
  const spores = Array.from({ length: 16 }, () => {
    const i = 6.4 + rnd() * 3.3;
    const j = 0.2 + rnd() * 1.6;
    const z = rnd() * 22;
    return { at: iso(i, j, z), r: 0.8 + rnd() * 1.6 };
  });
  const tendril = (path: readonly Pt[]) => {
    const [first, ...rest] = path;
    if (!first) return '';
    let d = `M${first[0]},${first[1]}`;
    for (let k = 0; k + 1 < rest.length; k += 2) {
      const c = rest[k];
      const e = rest[k + 1];
      if (c && e) d += ` Q${c[0]},${c[1]} ${e[0]},${e[1]}`;
    }
    return d;
  };
  const tendrils = [
    [iso(8.1, 1.0), iso(7.6, 1.6), iso(7.1, 1.75), iso(6.7, 1.9), iso(6.3, 1.6)],
    [iso(8.1, 1.0), iso(8.6, 1.7), iso(9.3, 1.85), iso(9.7, 1.95), iso(9.9, 1.6)],
    [iso(8.1, 1.0), iso(8.2, 0.4, 4), iso(8.15, 0, 14), iso(8.1, 0, 22), iso(8.4, 0, 28)],
    [iso(8.1, 1.0), iso(7.5, 0.8), iso(7.35, 0.25, 6), iso(7.2, 0, 14), iso(6.9, 0, 18)],
    [iso(8.1, 1.0), iso(8.7, 1.2), iso(8.9, 0.9, 6), iso(9.0, 0.95, 12), iso(9.2, 0.9, 18)],
  ];
  const [hx, hy] = iso(8.1, 1.0, 2);
  const sealA = iso(6.05, 2);
  const sealB = iso(9.95, 2);
  return (
    <g>
      <ellipse cx={hx - 6} cy={hy - 10} rx="84" ry="40" fill={C.violet} opacity="0.2" filter={`url(#${p}-glow)`} className="es-bloom" />
      {crates.map(([i, j, w, d, h]) => (
        <Prism key={`${i}-${j}`} i={i} j={j} w={w} d={d} h={h} top="#1E1C3E" left="#17162F" right="#110F24" stroke="#3A3470" />
      ))}
      <g className="es-bloom" fill="none" strokeLinecap="round">
        {tendrils.map((t, k) => (
          <g key={k}>
            <path d={tendril(t)} stroke={C.violet} strokeWidth="4" strokeOpacity="0.25" filter={`url(#${p}-soft)`} />
            <path d={tendril(t)} stroke="#C7B9FF" strokeWidth="1.1" strokeOpacity="0.75" />
          </g>
        ))}
        <ellipse cx={hx} cy={hy} rx="9" ry="4.5" fill={C.violet} fillOpacity="0.55" />
        <ellipse cx={hx} cy={hy - 1} rx="4" ry="2" fill="#E2DAFF" fillOpacity="0.85" />
      </g>
      <g className="es-spores">
        {spores.map((s, k) => (
          <circle key={k} cx={s.at[0]} cy={s.at[1]} r={s.r} fill="#CFC3FF" opacity={0.25 + (k % 4) * 0.12} />
        ))}
      </g>
      {/* sealed bulkhead toward the corridor */}
      <line x1={sealA[0]} y1={sealA[1]} x2={sealB[0]} y2={sealB[1]} stroke={C.violet} strokeWidth="1.6" strokeDasharray="5 4" strokeOpacity="0.9" />
    </g>
  );
}

function Lab() {
  const screen = wallAlongI(0.3, 1.5, 0, 11, 25);
  return (
    <g>
      <polygon points={screen} fill={C.cyan} fillOpacity="0.14" stroke={C.cyan} strokeOpacity="0.7" strokeWidth="1" />
      <polyline points={pts([iso(0.45, 0, 15), iso(0.9, 0, 19), iso(1.1, 0, 16), iso(1.35, 0, 21)])} stroke={C.cyan} strokeWidth="1" fill="none" />
      <Prism i={0.3} j={0.9} w={1.2} d={0.5} h={9} top="#183048" />
      <Cylinder i={1.6} j={0.5} r={0.2} h={20} body="#132640" top={C.cyan} />
      <Figure at={iso(1.0, 1.65)} suit={C.success} />
    </g>
  );
}

function Workshop() {
  const [sx, sy] = iso(1.2, 3.55, 14);
  return (
    <g>
      <Prism i={0.25} j={3.25} w={1.5} d={0.5} h={9} top="#2A2414" left="#1C1A1C" right="#141218" stroke="#4A3C1E" />
      <Prism i={0.3} j={4.1} w={0.6} d={0.6} h={14} />
      <circle cx={sx} cy={sy} r="2.4" fill={C.amber} className="es-blink" />
      <circle cx={sx} cy={sy} r="7" fill={C.amber} opacity="0.2" />
      <Figure at={iso(1.4, 4.35)} suit={C.amber} />
    </g>
  );
}

function Quarters() {
  return (
    <g>
      {[2.2, 3.2].map((i) => (
        <g key={i}>
          <Prism i={i} j={3.2} w={0.6} d={1.4} h={7} top="#15284A" />
          <Prism i={i + 0.05} j={3.25} w={0.5} d={0.35} h={2} z={7} top={C.teal} left="#0E3A3A" right="#0B2E2E" stroke="#1D6A62" />
        </g>
      ))}
    </g>
  );
}

function Radiator() {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((k) => (
        <Prism key={k} i={6.3 + k * 0.3} j={3.3} w={0.1} d={1.4} h={22} top={C.orange} left="#3A1E14" right="#2A160F" stroke="#5A2C18" />
      ))}
      <Prism i={6.2} j={4.75} w={1.6} d={0.15} h={4} top="#3A2418" />
    </g>
  );
}

function Shield() {
  return (
    <g>
      <Cylinder i={9} j={4} r={0.5} h={10} body={C.raised} top="#1B2B4C" />
      <Cylinder i={9} j={4} r={0.22} h={18} z={10} body="#14304A" top={C.cyan} />
      <g className="es-pulse">
        <Ring i={9} j={4} r={0.8} z={4} color={C.cyan} opacity={0.45} dash="4 4" />
        <Ring i={9} j={4} r={0.36} z={22} color={C.cyan} opacity={0.8} />
      </g>
    </g>
  );
}

function Hydroponics() {
  const rows = [5.25, 5.85, 6.45];
  return (
    <g>
      {rows.map((j) => (
        <g key={j}>
          <Prism i={0.3} j={j} w={3.4} d={0.32} h={6} top="#1C3A2E" left="#122A22" right="#0E211B" stroke="#24533F" />
          {Array.from({ length: 9 }, (_, k) => {
            const [x, y] = iso(0.5 + k * 0.38, j + 0.16, 9);
            return (
              <g key={k}>
                <circle cx={x} cy={y} r={2.6 + (k % 3) * 0.6} fill={C.success} opacity="0.85" />
                <circle cx={x - 1} cy={y - 1.5} r="1.2" fill="#B8F2CF" opacity="0.8" />
              </g>
            );
          })}
        </g>
      ))}
      <polyline points={pts([iso(0.2, 5, 26), iso(3.8, 5, 26)])} stroke={C.success} strokeOpacity="0.6" strokeWidth="1.4" fill="none" />
      <Figure at={iso(3.9, 6.2)} suit={C.cyan} />
    </g>
  );
}

function Containment({ p }: { p: string }) {
  const [cx, cy] = iso(5, 6, 14);
  return (
    <g>
      <Prism i={4.45} j={5.45} w={1.1} d={1.1} h={4} />
      <g opacity="0.24" className="es-field"><Cylinder i={5} j={6} r={0.42} h={26} z={4} body={C.violet} top={C.violet} stroke={C.violet} /></g>
      <circle cx={cx} cy={cy} r="5" fill="#E2DAFF" opacity="0.7" filter={`url(#${p}-soft)`} />
      <Ring i={5} j={6} r={0.42} z={4} color={C.violet} opacity={0.9} />
      <Ring i={5} j={6} r={0.42} z={30} color={C.violet} opacity={0.9} />
    </g>
  );
}

function Airlock() {
  const stripes: ReactNode[] = [];
  for (let k = 0; k < 5; k += 1) {
    const i = 6.08 + k * 0.17;
    stripes.push(<polygon key={k} points={quad(i, 6.7, 0.08, 0.22)} fill={C.amber} opacity="0.85" />);
  }
  const frame = (z0: number, z1: number) => wallAlongI(6.12, 6.88, 7, z0, z1);
  return (
    <g>
      {stripes}
      <polygon points={wallAlongI(6.12, 6.88, 7, 0, 26)} fill={C.frost} fillOpacity="0.12" stroke={C.frost} strokeOpacity="0.8" strokeWidth="1.2" />
      <polygon points={frame(26, 30)} fill={C.raised} stroke={C.lineStrong} strokeWidth="0.8" />
      <circle cx={iso(6.5, 7, 32)[0]} cy={iso(6.5, 7, 32)[1]} r="1.8" fill={C.amber} className="es-blink" />
    </g>
  );
}
