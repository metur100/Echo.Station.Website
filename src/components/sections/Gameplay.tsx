import { LOOP } from '../../content/game';
import { LoopIcon } from '../icons';

export function Gameplay() {
  return (
    <section className="section section--alt" id="gameplay" aria-labelledby="gameplay-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Duty cycle</p>
          <h2 id="gameplay-title">One loop, and it never quite repeats</h2>
          <p>
            Every shift follows the same rhythm. What changes is the ship underneath you, because the consequences of the
            last cycle are still there when the next one starts.
          </p>
        </div>
        <ol className="loop">
          {LOOP.map((step) => (
            <li key={step.id} className={`panel loop__step tone-${step.tone}`}>
              <span className="loop__num">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="loop__note">
          <LoopIcon />
          Consequences feed back into repair: the loop closes, and the ship you are fixing is the ship you shaped.
        </p>
      </div>
    </section>
  );
}
