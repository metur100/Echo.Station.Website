import { GAME } from '../../content/game';

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__text">
          <p className="sys-label">SYS // Mission brief</p>
          <h2 id="about-title">
            Wake up. Keep her flying.
          </h2>
          <p>
            You are the caretaker of the <strong>{GAME.shipName}</strong>, a damaged research vessel drifting through an
            unexplored region of space. A mysterious systems failure woke the crew early. Critical systems are unstable,
            and an unknown bioluminescent organism, the <strong>Lumen Bloom</strong>, is spreading through the ship.
          </p>
          <p>
            Repair the ship, keep the crew alive, research the anomalies, explore nearby destinations, and find out what
            happened to the original expedition. ECHO STATION is a management game about a ship that does not forget:
            what you do to it, and what happens inside it, shapes what it becomes.
          </p>
        </div>

        <aside className="panel log" aria-label="Vessel status">
          <div className="log__head">
            <span className="mono-tag">Vessel status</span>
            <span className="status-dot">Unstable</span>
          </div>
          <dl>
            <div>
              <dt>Vessel</dt>
              <dd>{GAME.shipName}, research class</dd>
            </div>
            <div>
              <dt>Position</dt>
              <dd>Drifting, uncharted region</dd>
            </div>
            <div>
              <dt>Crew awake</dt>
              <dd>3, woken early by a systems failure</dd>
            </div>
            <div>
              <dt>Anomaly</dt>
              <dd className="text-violet">Lumen Bloom, spreading</dd>
            </div>
            <div>
              <dt>Objective</dt>
              <dd>Find the original expedition</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
