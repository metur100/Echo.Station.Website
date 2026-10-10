import { MODULES, SHIP_SYSTEMS } from '../../content/game';

export function ShipSystems() {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Ship management</p>
          <h2 id="features-title">A ship you can take apart and put back together</h2>
          <p>
            The ESV Meridian is an isometric 2.5D ship you can pan, zoom and build on, room by room, across a 10&times;10
            hull grid. Underneath the rooms runs a real simulation, so every layout decision has a cost.
          </p>
        </div>

        <div className="split">
          <div className="system-grid">
            {SHIP_SYSTEMS.map((system) => (
              <article key={system.code} className={`panel system-card tone-${system.tone}`}>
                <span className="system-card__code">{system.code}</span>
                <h3>{system.title}</h3>
                <p>{system.text}</p>
              </article>
            ))}
          </div>

          <div className="panel modules">
            <div className="modules__head">
              <h3>14 module types</h3>
              <span className="mono-tag">Build catalogue</span>
            </div>
            <ul aria-label="Module types">
              {MODULES.map((module) => (
                <li key={module.name} className={`tone-${module.tone}`}>
                  {module.name}
                </li>
              ))}
            </ul>
            <p className="modules__foot">
              Some modules have to be researched first. Placement matters: heat flows into neighbouring rooms,
              anomalies spread through them, and power is shared by priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
