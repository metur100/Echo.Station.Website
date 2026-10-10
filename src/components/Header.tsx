import { useEffect, useRef, useState } from 'react';
import { LogoMark } from './art/LogoMark';
import { CloseIcon, MenuIcon } from './icons';

export const NAV_ITEMS: readonly { id: string; label: string }[] = [
  { id: 'features', label: 'Features' },
  { id: 'echo-memory', label: 'Echo Memory' },
  { id: 'crew', label: 'Crew & Research' },
  { id: 'screenshots', label: 'Screenshots' },
  { id: 'faq', label: 'FAQ' },
  { id: 'support', label: 'Support' },
];

interface Props {
  /** Prefix for in-page anchors. '' on the home page, the site root elsewhere. */
  readonly homeHref?: string;
}

export function Header({ homeHref = '' }: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const homeLink = homeHref || '#top';

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const links = NAV_ITEMS.map((item) => (
    <li key={item.id}>
      <a className="nav-link" href={`${homeHref}#${item.id}`} onClick={() => setOpen(false)}>
        {item.label}
      </a>
    </li>
  ));

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <a className="wordmark" href={homeLink} aria-label="ECHO STATION - The Living Ship, home">
          <LogoMark className="wordmark__icon" />
          <span className="wordmark__text" aria-hidden="true">
            <span className="wordmark__name">ECHO STATION</span>
            <span className="wordmark__sub">The Living Ship</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Main">
          <ul className="nav-list">{links}</ul>
        </nav>

        <div className="header-actions">
          <a className="btn btn--primary btn--sm header-cta" href={`${homeHref}#get-the-game`}>
            Get the game
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <div ref={panelRef} id="mobile-nav" className="nav-mobile" hidden={!open}>
        <nav className="container" aria-label="Main (mobile)">
          <ul className="nav-list">{links}</ul>
          <a className="btn btn--primary" href={`${homeHref}#get-the-game`} onClick={() => setOpen(false)}>
            Get the game
          </a>
        </nav>
      </div>
    </header>
  );
}
