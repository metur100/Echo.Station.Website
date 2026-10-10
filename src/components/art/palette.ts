/** Colour tokens mirrored from the game for use inside SVG artwork. */
export const C = {
  bg0: '#04070F',
  bg1: '#070C1A',
  bg2: '#0B1326',
  panel: '#0E182E',
  raised: '#13203B',
  line: '#1C2A48',
  lineStrong: '#2A3C63',
  text: '#E6EDF8',
  dim: '#93A1BF',
  faint: '#5D6B8A',
  cyan: '#45E0DC',
  teal: '#24B8A6',
  amber: '#FFB547',
  orange: '#FF7A3D',
  violet: '#9A84F0',
  danger: '#FF5866',
  success: '#54D18C',
  frost: '#9FD8FF',
} as const;

export type ToneColor = 'cyan' | 'teal' | 'amber' | 'orange' | 'violet' | 'success' | 'danger' | 'frost';
