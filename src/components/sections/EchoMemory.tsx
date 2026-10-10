import { ECHO_TECH, ECHO_TYPES } from '../../content/game';
import { EchoDiagram } from '../art/EchoDiagram';

export function EchoMemory() {
  return (
    <section className="section section--alt echo" id="echo-memory" aria-labelledby="echo-title">
      <div className="container">
        <div className="echo__intro">
          <div>
            <p className="sys-label sys-label--violet">SYS // Echo memory</p>
            <h2 id="echo-title" className="echo__title">
              The ship remembers.
            </h2>
            <p className="echo__lead">
              Echo Memory is the heart of ECHO STATION. Events do not simply end: they leave traces in the rooms where they
              happened, and those traces change how the ship behaves from then on.
            </p>
            <p className="echo__lead">
              Every echo is listed in the Echo archive with its cause and its consequences, so you can always read why the
              ship is acting the way it is.
            </p>
            <p className="echo__quote">Nothing that happens aboard is ever fully over.</p>
          </div>

          <figure className="panel diagram">
            <div className="diagram__head">
              <span className="mono-tag">Echo propagation // schematic</span>
              <span className="mono-tag text-violet">Illustrative</span>
            </div>
            <EchoDiagram />
            <figcaption>
              <ol className="diagram__steps">
                <li className="tone-amber">
                  <b>1</b>
                  <span>The reactor overloads. The surge is contained, but not erased.</span>
                </li>
                <li className="tone-amber">
                  <b>2</b>
                  <span>Residual energy lingers in the rooms around it.</span>
                </li>
                <li className="tone-violet">
                  <b>3</b>
                  <span>The Lumen Bloom grows toward the energy and learns to feed on it.</span>
                </li>
              </ol>
            </figcaption>
          </figure>
        </div>

        <ul className="echo-types" aria-label="Kinds of echoes">
          {ECHO_TYPES.map((echo) => (
            <li key={echo.id} className={`panel echo-card tone-${echo.tone}`}>
              <span className="mono-tag">Echo // {echo.id}</span>
              <h3>{echo.name}</h3>
              <dl>
                <div>
                  <dt>Cause</dt>
                  <dd>{echo.cause}</dd>
                </div>
                <div>
                  <dt>Consequence</dt>
                  <dd>{echo.effect}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="panel panel--raised echo-tech">
          <div>
            <p className="sys-label sys-label--violet">Research // Echo studies</p>
            <h3>Turn dangerous echoes into technology</h3>
            <p>An echo is a problem until you understand it. Research can turn the ship's memory into an advantage.</p>
          </div>
          <ul>
            {ECHO_TECH.map((tech) => (
              <li key={tech.name}>
                <strong>{tech.name}</strong>
                <span>{tech.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
