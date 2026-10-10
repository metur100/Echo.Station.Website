import { Starfield } from '../components/art/Starfield';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SkipLink } from '../components/SkipLink';
import { asset } from '../content/links';

export function NotFoundPage() {
  const home = asset('');
  return (
    <>
      <SkipLink />
      <Header homeHref={home} />
      <main id="main" tabIndex={-1} className="lost">
        <div className="hero__sky" aria-hidden="true">
          <Starfield className="hero__stars" seed={404} count={120} />
        </div>
        <div className="container">
          <div className="panel lost__card">
            <p className="sys-label sys-label--violet">SYS // Signal lost</p>
            <p className="lost__code" aria-hidden="true">
              404
            </p>
            <h1>This compartment does not exist</h1>
            <p>The page you are looking for was never built, or it drifted off with the original expedition.</p>
            <a className="btn btn--primary" href={home}>
              Return to the ship
            </a>
          </div>
        </div>
      </main>
      <Footer homeHref={home} />
    </>
  );
}
