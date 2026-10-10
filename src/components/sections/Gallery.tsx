import { asset } from '../../content/links';
import { SCREENSHOTS, type Screenshot } from '../../content/screenshots';

interface Props {
  /** Defaults to the manifest in src/content/screenshots.ts. */
  readonly items?: readonly Screenshot[];
}

export function Gallery({ items = SCREENSHOTS }: Props) {
  return (
    <section className="section" id="screenshots" aria-labelledby="screenshots-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Visual log</p>
          <h2 id="screenshots-title">Screenshots</h2>
          <p>Captured from the current build of the game. No mock-ups.</p>
        </div>

        {items.length > 0 ? (
          <ul className="gallery">
            {items.map((shot) => (
              <li key={shot.file}>
                <figure className="panel">
                  <img
                    src={asset(`screenshots/${shot.file}`)}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="panel pending" role="status">
            <div className="pending__frames" aria-hidden="true">
              <span className="pending__frame" />
              <span className="pending__frame" />
              <span className="pending__frame" />
            </div>
            <span className="mono-tag">Awaiting transmission</span>
            <h3>Screenshots from the current build arrive with the first test release</h3>
            <p>
              We would rather show you nothing than show you something that is not the game. Real captures will appear here
              as soon as the first test build is out.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
