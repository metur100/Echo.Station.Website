import type { CrewId } from '../../content/game';
import { C } from './palette';

interface Look {
  readonly skin: string;
  readonly skinShade: string;
  readonly hair: string;
  readonly accent: string;
}

const LOOKS: Record<Exclude<CrewId, 'unknown'>, Look> = {
  ines: { skin: '#D9A98A', skinShade: '#B9876A', hair: '#8A3B2A', accent: C.amber },
  tomas: { skin: '#7A4E34', skinShade: '#5E3A26', hair: '#17110F', accent: C.success },
  mira: { skin: '#E5BF9C', skinShade: '#C69C7A', hair: '#15151C', accent: C.cyan },
};

/** Stylised original bust portrait. Decorative: the card carries the name. */
export function CrewPortrait({ id }: { id: CrewId }) {
  return (
    <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <g stroke={C.line} strokeWidth="0.6" opacity="0.6">
        {[30, 60, 90, 120].map((y) => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} />
        ))}
      </g>
      {id === 'unknown' ? <Unknown /> : <Bust id={id} look={LOOKS[id]} />}
    </svg>
  );
}

function Shoulders({ accent }: { accent: string }) {
  return (
    <g>
      <path d="M38 150 C40 122 58 108 84 104 L116 104 C142 108 160 122 162 150 Z" fill={C.raised} stroke={C.lineStrong} strokeWidth="1" />
      <path d="M84 104 L100 124 L116 104" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M58 116 C64 130 66 140 66 150" stroke={C.lineStrong} strokeWidth="1" fill="none" />
      <path d="M142 116 C136 130 134 140 134 150" stroke={C.lineStrong} strokeWidth="1" fill="none" />
      <rect x="128" y="124" width="14" height="5" rx="1" fill={accent} opacity="0.85" />
    </g>
  );
}

function Bust({ id, look }: { id: Exclude<CrewId, 'unknown'>; look: Look }) {
  const { skin, skinShade, hair, accent } = look;
  return (
    <g>
      <Shoulders accent={accent} />
      <path d="M90 92 L90 108 Q100 114 110 108 L110 92 Z" fill={skinShade} />
      {id === 'mira' && <ellipse cx="100" cy="30" rx="13" ry="11" fill={hair} />}
      <ellipse cx="100" cy="68" rx="25" ry="31" fill={skin} />
      <path d="M77 74 Q80 92 100 99 Q86 90 81 72 Z" fill={skinShade} opacity="0.6" />
      <ellipse cx="75.5" cy="70" rx="4" ry="7" fill={skinShade} />
      <ellipse cx="124.5" cy="70" rx="4" ry="7" fill={skinShade} />
      {/* eyes and brows - minimal */}
      <g stroke="#0B1326" strokeLinecap="round">
        <line x1="88" y1="70" x2="94" y2="70" strokeWidth="2.6" />
        <line x1="106" y1="70" x2="112" y2="70" strokeWidth="2.6" />
        <line x1="86" y1="62" x2="95" y2="61" strokeWidth="1.6" opacity="0.7" />
        <line x1="105" y1="61" x2="114" y2="62" strokeWidth="1.6" opacity="0.7" />
        <path d="M95 87 Q100 89 105 87" strokeWidth="1.4" fill="none" opacity="0.55" />
      </g>
      {id === 'ines' && (
        <g>
          <path d="M74 66 C72 40 92 30 110 34 C126 38 130 52 127 64 C118 52 104 46 88 50 C82 54 78 60 74 66 Z" fill={hair} />
          <path d="M74 66 C73 58 74 52 78 48" stroke={hair} strokeWidth="6" fill="none" />
          <path d="M71 64 C71 42 85 34 100 34 C115 34 129 42 129 64" stroke={C.lineStrong} strokeWidth="3" fill="none" />
          <rect x="66" y="62" width="9" height="16" rx="3" fill={C.raised} stroke={accent} strokeWidth="1.2" />
          <path d="M70 78 Q74 92 90 92" stroke={C.dim} strokeWidth="1.6" fill="none" />
          <circle cx="91" cy="92" r="2.2" fill={accent} />
        </g>
      )}
      {id === 'tomas' && (
        <g>
          <path d="M76 60 C76 42 88 35 100 35 C112 35 124 42 124 60 C116 50 108 47 100 47 C92 47 84 50 76 60 Z" fill={hair} />
          <path d="M80 82 Q84 100 100 101 Q116 100 120 82 Q116 93 100 94 Q84 93 80 82 Z" fill={hair} opacity="0.9" />
          <g fill="none" stroke={C.frost} strokeWidth="1.6">
            <circle cx="91" cy="70" r="7" />
            <circle cx="109" cy="70" r="7" />
            <path d="M98 70 L102 70 M84 69 L77 66 M116 69 L123 66" />
          </g>
          <circle cx="132" cy="134" r="4" fill={accent} opacity="0.85" />
        </g>
      )}
      {id === 'mira' && (
        <g>
          <path d="M75 70 C72 44 86 34 100 34 C116 34 128 44 125 70 C122 58 118 50 110 48 C102 56 90 56 80 54 C77 59 76 64 75 70 Z" fill={hair} />
          <path d="M80 54 C88 56 98 54 106 46" stroke="#2A2A36" strokeWidth="1.2" fill="none" />
          <path d="M122 58 L133 54 L134 72 L124 74" fill={C.raised} stroke={accent} strokeWidth="1.2" />
          <line x1="126" y1="64" x2="132" y2="63" stroke={accent} strokeWidth="2" />
        </g>
      )}
    </g>
  );
}

function Unknown() {
  return (
    <g>
      <path d="M38 150 C40 122 58 108 84 104 L116 104 C142 108 160 122 162 150 Z" fill="#0B1326" stroke={C.violet} strokeOpacity="0.6" strokeWidth="1" />
      <path d="M90 92 L90 108 Q100 114 110 108 L110 92 Z" fill="#0B1326" />
      <ellipse cx="100" cy="66" rx="25" ry="31" fill="#0B1326" stroke={C.violet} strokeOpacity="0.7" strokeWidth="1.2" />
      {/* frosted cryo-pod glass */}
      <rect x="48" y="18" width="104" height="132" rx="40" fill={C.frost} fillOpacity="0.05" stroke={C.frost} strokeOpacity="0.45" strokeWidth="1.2" />
      <g stroke={C.frost} strokeOpacity="0.35" strokeWidth="1">
        <path d="M60 46 L70 52 L66 60 M140 40 L132 50 L138 56 M58 120 L68 114 M142 112 L132 118" fill="none" />
      </g>
      <text x="100" y="76" textAnchor="middle" fontFamily="Oxanium, sans-serif" fontWeight="700" fontSize="28" fill={C.violet}>
        ?
      </text>
    </g>
  );
}
