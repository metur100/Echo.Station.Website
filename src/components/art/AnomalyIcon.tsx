import { C } from './palette';

export function AnomalyIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="47" height="47" rx="10" fill={C.bg1} stroke={C.lineStrong} />
      {name === 'Lumen Bloom' && (
        <g fill="none" strokeLinecap="round">
          <path d="M24 30 C18 26 14 30 11 26 M24 30 C28 24 34 27 37 22 M24 30 C23 36 18 38 16 40 M24 30 C27 35 32 36 34 39" stroke={C.violet} strokeWidth="1.6" />
          <circle cx="24" cy="30" r="4" fill={C.violet} opacity="0.8" />
          <circle cx="11" cy="26" r="1.6" fill="#C7B9FF" />
          <circle cx="37" cy="22" r="1.6" fill="#C7B9FF" />
          <circle cx="20" cy="15" r="1.2" fill="#C7B9FF" opacity="0.7" />
          <circle cx="30" cy="12" r="1" fill="#C7B9FF" opacity="0.6" />
        </g>
      )}
      {name === 'Static Choir' && (
        <g fill="none" stroke={C.cyan} strokeLinecap="round" strokeWidth="1.6">
          <path d="M8 24 L13 24 L16 16 L20 32 L24 12 L28 36 L32 18 L35 28 L37 24 L40 24" />
          <circle cx="24" cy="24" r="16" strokeOpacity="0.25" />
        </g>
      )}
      {name === 'Void Frost' && (
        <g fill="none" stroke={C.frost} strokeLinecap="round" strokeWidth="1.6">
          <path d="M24 10 V38 M12 17 L36 31 M12 31 L36 17" />
          <path d="M20 12 L24 16 L28 12 M20 36 L24 32 L28 36 M11 22 L16 20 L14 15 M37 26 L32 28 L34 33 M11 26 L16 28 L14 33 M37 22 L32 20 L34 15" strokeWidth="1.2" />
        </g>
      )}
    </svg>
  );
}
