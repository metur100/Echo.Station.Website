import { LINKS } from '../../content/links';
import { ExternalIcon, PlayIcon } from '../icons';

export function Trailer() {
  const url = LINKS.trailer;
  return (
    <section className="section section--alt" id="trailer" aria-labelledby="trailer-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Transmission</p>
          <h2 id="trailer-title">Trailer</h2>
          <p>A first look at the ESV Meridian in motion.</p>
        </div>

        <div className="trailer-frame">
          <div className="trailer-frame__corners" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="mono-tag trailer-frame__rec" aria-hidden="true">
            {url ? 'Ready' : 'Standby'}
          </span>
          <span className="mono-tag trailer-frame__tc" aria-hidden="true">
            00:00:00
          </span>
          <div className="trailer-frame__inner">
            <div className="trailer-frame__play" aria-hidden="true">
              <PlayIcon />
            </div>
            {url ? (
              <>
                <h3>Watch the trailer</h3>
                <a className="btn btn--primary" href={url} rel="noopener">
                  Open trailer
                  <ExternalIcon />
                </a>
              </>
            ) : (
              <>
                <h3>Trailer in production</h3>
                <p>The trailer is being cut from the current build. It will be posted here when it is ready.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
