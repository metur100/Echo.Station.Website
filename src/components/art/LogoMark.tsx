interface Props {
  readonly className?: string;
}

/** Isometric hull block with a glowing reactor core - used as logo and favicon. */
export function LogoMark({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 64 64" width="32" height="32" aria-hidden="true" focusable="false">
      <polygon points="32,6 57,18.5 32,31 7,18.5" fill="#13203B" stroke="#2A3C63" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="7,18.5 32,31 32,58 7,45.5" fill="#0E182E" stroke="#2A3C63" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="57,18.5 32,31 32,58 57,45.5" fill="#0B1326" stroke="#2A3C63" strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="32" cy="18.5" rx="11" ry="5.5" fill="none" stroke="#45E0DC" strokeWidth="1.5" opacity="0.9" />
      <ellipse cx="32" cy="18.5" rx="5" ry="2.5" fill="#FFB547" />
      <path d="M12 30 Q19 36 20 44" stroke="#9A84F0" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M41 39 h9" stroke="#24B8A6" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
