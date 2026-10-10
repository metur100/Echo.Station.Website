import { seeded } from './iso';

interface Props {
  readonly className?: string;
  readonly count?: number;
  readonly seed?: number;
}

interface Star {
  readonly x: number;
  readonly y: number;
  readonly r: number;
  readonly o: number;
  readonly tint: string;
}

const CACHE = new Map<string, readonly Star[]>();

function makeStars(count: number, seed: number): readonly Star[] {
  const key = `${count}:${seed}`;
  const cached = CACHE.get(key);
  if (cached) return cached;
  const r = seeded(seed);
  const stars = Array.from({ length: count }, () => {
    const roll = r();
    return {
      x: Math.round(r() * 14400) / 10,
      y: Math.round(r() * 9000) / 10,
      r: roll < 0.06 ? 1.5 : roll < 0.4 ? 0.95 : 0.6,
      o: Math.round((0.25 + r() * 0.6) * 100) / 100,
      tint: roll < 0.1 ? '#9FD8FF' : roll > 0.94 ? '#C7B9FF' : '#E6EDF8',
    };
  });
  CACHE.set(key, stars);
  return stars;
}

/** Faint deterministic starfield, purely decorative. */
export function Starfield({ className, count = 160, seed = 1977 }: Props) {
  const stars = makeStars(count, seed);
  return (
    <svg className={className} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {stars.map((s, k) => (
        <circle key={k} cx={s.x} cy={s.y} r={s.r} fill={s.tint} opacity={s.o} />
      ))}
    </svg>
  );
}
