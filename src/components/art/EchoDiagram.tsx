import { C } from './palette';

const COLS = 4;
const ROWS = 3;
const CW = 96;
const CH = 78;
const GAP = 10;
const OX = 20;
const OY = 20;

type Cell = { c: number; r: number; name: string; state?: 'reactor' | 'residue' | 'bloom' | 'contaminated' };

const CELLS: readonly Cell[] = [
  { c: 0, r: 0, name: 'Lab' },
  { c: 1, r: 0, name: 'Oxygen', state: 'residue' },
  { c: 2, r: 0, name: 'Recycler' },
  { c: 3, r: 0, name: 'Storage', state: 'contaminated' },
  { c: 0, r: 1, name: 'Workshop', state: 'residue' },
  { c: 1, r: 1, name: 'Reactor', state: 'reactor' },
  { c: 2, r: 1, name: 'Corridor', state: 'residue' },
  { c: 3, r: 1, name: 'Storage', state: 'bloom' },
  { c: 0, r: 2, name: 'Hydro' },
  { c: 1, r: 2, name: 'Radiator', state: 'residue' },
  { c: 2, r: 2, name: 'Lab' },
  { c: 3, r: 2, name: 'Shield' },
];

const x = (c: number) => OX + c * (CW + GAP);
const y = (r: number) => OY + r * (CH + GAP);
const cx = (c: number) => x(c) + CW / 2;
const cy = (r: number) => y(r) + CH / 2;

/**
 * Schematic of one echo chain: a reactor overload leaves residual energy in the
 * neighbouring rooms, and the Lumen Bloom grows toward it to feed. The pulse
 * animation is CSS-only and is switched off under prefers-reduced-motion.
 */
export function EchoDiagram() {
  const rx = cx(1);
  const ry = cy(1);
  const bx = cx(3);
  const by = cy(1) - 8;
  return (
    <svg viewBox="0 0 444 300" width="444" height="300" role="img" aria-labelledby="echo-diagram-title echo-diagram-desc">
      <title id="echo-diagram-title">How an echo propagates</title>
      <desc id="echo-diagram-desc">
        A grid of ship rooms. The reactor overloads and pulses outward; its four neighbouring rooms keep residual energy,
        shown in amber. The Lumen Bloom, shown in violet in a storage room next to the corridor, extends tendrils into the
        energised corridor to feed on it. A storage room above, where the Bloom once died, remains contaminated.
      </desc>
      <defs>
        <clipPath id="echo-clip">
          <rect x={OX - 4} y={OY - 4} width={COLS * (CW + GAP) - GAP + 8} height={ROWS * (CH + GAP) - GAP + 8} rx="10" />
        </clipPath>
        <pattern id="echo-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={C.violet} strokeWidth="1.5" strokeOpacity="0.35" />
        </pattern>
        <radialGradient id="echo-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={C.amber} stopOpacity="0.9" />
          <stop offset="1" stopColor={C.amber} stopOpacity="0" />
        </radialGradient>
      </defs>

      {CELLS.map((cell) => {
        const fill =
          cell.state === 'reactor'
            ? 'rgba(255,181,71,0.16)'
            : cell.state === 'bloom'
              ? 'rgba(154,132,240,0.18)'
              : C.panel;
        const stroke =
          cell.state === 'reactor' ? C.amber : cell.state === 'bloom' ? C.violet : cell.state === 'contaminated' ? '#5B4E94' : C.line;
        return (
          <g key={`${cell.c}-${cell.r}`}>
            <rect x={x(cell.c)} y={y(cell.r)} width={CW} height={CH} rx="6" fill={fill} stroke={stroke} strokeWidth="1" />
            {cell.state === 'residue' && (
              <rect className="echo-residue" x={x(cell.c)} y={y(cell.r)} width={CW} height={CH} rx="6" fill="rgba(255,181,71,0.13)" stroke={C.amber} strokeOpacity="0.55" strokeDasharray="3 3" />
            )}
            {cell.state === 'contaminated' && <rect x={x(cell.c)} y={y(cell.r)} width={CW} height={CH} rx="6" fill="url(#echo-hatch)" />}
            <text x={x(cell.c) + 10} y={y(cell.r) + 22} fontFamily="Oxanium, sans-serif" fontSize="12.5" fontWeight="600" letterSpacing="0.6" fill={cell.state ? C.text : C.faint}>
              {cell.name.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* overload pulses */}
      <g clipPath="url(#echo-clip)">
        {[1, 2, 3].map((n) => (
          <circle key={n} className={`echo-pulse echo-pulse--${n}`} cx={rx} cy={ry} r="150" fill="none" stroke={C.amber} strokeWidth="1.5" />
        ))}
      </g>
      <circle cx={rx} cy={ry + 6} r="22" fill="url(#echo-core)" />
      <circle cx={rx} cy={ry + 6} r="7" fill="#FFE2A8" />

      {/* bloom feeding on the residue in the corridor */}
      <g fill="none" strokeLinecap="round">
        <path className="echo-feed" d={`M${bx - 6},${by + 8} C${bx - 30},${by - 6} ${bx - 52},${by + 22} ${cx(2) + 8},${by + 4}`} stroke={C.violet} strokeWidth="2" />
        <path className="echo-feed" d={`M${bx - 4},${by + 14} C${bx - 26},${by + 16} ${bx - 48},${by + 16} ${cx(2) + 14},${by + 12}`} stroke={C.violet} strokeWidth="1.5" />
        <path d={`M${bx},${by + 4} C${bx + 14},${by - 14} ${bx + 26},${by - 8} ${bx + 30},${by - 20}`} stroke="#C7B9FF" strokeWidth="1.2" strokeOpacity="0.8" />
      </g>
      <circle cx={bx} cy={by + 4} r="9" fill={C.violet} opacity="0.55" />
      <circle cx={bx} cy={by + 4} r="4" fill="#E2DAFF" />

      {/* tags */}
      <Tag x={x(1) + 10} y={y(1) + CH - 12} color={C.amber} text="OVERLOAD" />
      <Tag x={x(2) + 10} y={y(1) + CH - 12} color={C.amber} text="RESIDUE" />
      <Tag x={x(3) + 10} y={y(1) + CH - 12} color={C.violet} text="FEEDING" />
      <Tag x={x(3) + 10} y={y(0) + CH - 12} color="#B3A4F5" text="REGROWTH" />
    </svg>
  );
}

function Tag({ x: tx, y: ty, color, text }: { x: number; y: number; color: string; text: string }) {
  return (
    <text x={tx} y={ty} fontFamily="Oxanium, sans-serif" fontSize="11" fontWeight="700" letterSpacing="0.8" fill={color}>
      {text}
    </text>
  );
}
