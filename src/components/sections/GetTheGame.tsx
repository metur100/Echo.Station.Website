import type { ReactNode } from 'react';
import { LINKS } from '../../content/links';
import { AndroidGlyph, PhoneGlyph } from '../icons';

interface StoreButtonProps {
  readonly store: string;
  readonly url: string | null;
  readonly icon: ReactNode;
}

/**
 * Neutral store button (deliberately not the official badge artwork).
 * With `url === null` it renders a disabled "Coming soon" control and no link.
 */
export function StoreButton({ store, url, icon }: StoreButtonProps) {
  if (!url) {
    return (
      <button type="button" className="store-btn" disabled aria-disabled="true">
        {icon}
        <span className="store-btn__text">
          <span className="store-btn__small">Coming soon</span>
          <span className="store-btn__name">{store}</span>
        </span>
      </button>
    );
  }
  return (
    <a className="store-btn" href={url} rel="noopener">
      {icon}
      <span className="store-btn__text">
        <span className="store-btn__small">Get it on</span>
        <span className="store-btn__name">{store}</span>
      </span>
    </a>
  );
}

export function GetTheGame() {
  return (
    <section className="section" id="get-the-game" aria-labelledby="get-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Distribution</p>
          <h2 id="get-title">Get the game</h2>
          <p>
            ECHO STATION is coming to Android and iOS. The full campaign is free to play, with no ads and no in-app purchases
            in this version. Store pages will be linked here as soon as they go live.
          </p>
        </div>

        <div className="stores">
          <section className="panel store" id="google-play" aria-labelledby="google-play-title">
            <div className="store__top">
              <AndroidGlyph />
              <h3 id="google-play-title">Google Play</h3>
            </div>
            <p>{LINKS.googlePlay ? 'Available for Android phones and tablets.' : 'The Android version is in development.'}</p>
            <StoreButton store="Google Play" url={LINKS.googlePlay} icon={<AndroidGlyph />} />
            <ul className="store__notes" aria-label="Android version">
              <li className="chip">Android</li>
              <li className="chip">Offline</li>
              <li className="chip">No ads</li>
            </ul>
          </section>

          <section className="panel store" id="app-store" aria-labelledby="app-store-title">
            <div className="store__top">
              <PhoneGlyph />
              <h3 id="app-store-title">App Store</h3>
            </div>
            <p>{LINKS.appStore ? 'Available for iPhone and iPad.' : 'The iOS version is in development.'}</p>
            <StoreButton store="App Store" url={LINKS.appStore} icon={<PhoneGlyph />} />
            <ul className="store__notes" aria-label="iOS version">
              <li className="chip">iOS</li>
              <li className="chip">Offline</li>
              <li className="chip">No in-app purchases</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
