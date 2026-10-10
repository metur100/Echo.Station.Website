import { GAME } from '../../content/game';
import { ShipArt } from '../art/ShipArt';
import { Starfield } from '../art/Starfield';
import { ArrowDownIcon, PlayIcon } from '../icons';

const LEGEND = [
  { label: 'Reactor', tone: 'tone-amber' },
  { label: 'Life support', tone: 'tone-cyan' },
  { label: 'Hydroponics', tone: 'tone-success' },
  { label: 'Lumen Bloom', tone: 'tone-violet' },
];

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__sky" aria-hidden="true">
        <Starfield className="hero__stars" />
      </div>
      <div className="container">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="sys-label">
              SYS // {GAME.shipName}
              <span className="hide-sm"> // Caretaker online</span>
            </p>
            <h1 className="hero__title" id="hero-title">
              {GAME.title}
              <span className="hero__subtitle">{GAME.subtitle}</span>
            </h1>
            <p className="hero__tagline">
              <span>{GAME.tagline}</span>
            </p>
            <p className="hero__pitch">
              Keep a damaged research vessel alive at the edge of charted space. Repair failing systems, guide a small crew,
              study the organism spreading through the decks, and live with the consequences: every overload, every
              outbreak and every hard choice leaves an echo.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="#get-the-game">
                <ArrowDownIcon />
                Get the game
              </a>
              <a className="btn btn--ghost" href="#trailer">
                <PlayIcon />
                Watch the trailer
              </a>
            </div>
            <ul className="hero__facts" aria-label="At a glance">
              <li className="chip tone-cyan">
                <span className="chip__dot" aria-hidden="true" />
                Android &amp; iOS, in development
              </li>
              <li className="chip tone-success">
                <span className="chip__dot" aria-hidden="true" />
                Free, no ads, no in-app purchases
              </li>
              <li className="chip tone-violet">
                <span className="chip__dot" aria-hidden="true" />
                Plays fully offline
              </li>
            </ul>
          </div>

          <figure className="hero__art">
            <ShipArt idPrefix="hero-ship" />
            <figcaption className="hud-caption">
              <span className="mono-tag">Hull scan // {GAME.shipName} // illustration</span>
              <ul className="legend" aria-label="Legend">
                {LEGEND.map((item) => (
                  <li key={item.label} className={item.tone}>
                    <span className="swatch" aria-hidden="true" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
