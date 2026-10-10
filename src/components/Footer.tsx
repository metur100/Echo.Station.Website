import { GAME } from '../content/game';
import { asset, LINKS } from '../content/links';
import { LogoMark } from './art/LogoMark';

interface Props {
  readonly homeHref?: string;
}

export function Footer({ homeHref = '' }: Props) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <a className="wordmark" href={homeHref || '#top'} aria-label="ECHO STATION - The Living Ship, home">
              <LogoMark className="wordmark__icon" />
              <span className="wordmark__text" aria-hidden="true">
                <span className="wordmark__name">ECHO STATION</span>
                <span className="wordmark__sub">The Living Ship</span>
              </span>
            </a>
            <p className="site-footer__tag">A mobile game by {GAME.developer}. {GAME.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul>
              <li>
                <a href={asset('privacy.html')}>Privacy policy</a>
              </li>
              <li>
                <a href={`${homeHref}#support`}>Support</a>
              </li>
              <li>
                <a href={LINKS.gameRepo} rel="noopener">
                  Game repository
                </a>
              </li>
              <li>
                <a href={LINKS.websiteRepo} rel="noopener">
                  Website source
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="site-footer__legal">
          <p>&copy; 2026 {GAME.developer}. All rights reserved.</p>
          <p>ECHO STATION is an independent game. Not affiliated with any other franchise.</p>
        </div>
      </div>
    </footer>
  );
}
