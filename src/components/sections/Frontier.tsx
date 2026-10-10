import { ANOMALIES, DESTINATIONS, ENDINGS, INCIDENTS } from '../../content/game';
import { AnomalyIcon } from '../art/AnomalyIcon';

const ALSO = [
  {
    title: 'Incidents with real choices',
    text: `${INCIDENTS.map((x, k) => (k === 0 ? x : x.toLowerCase())).join(", ")}. Each one asks you to choose.`,
  },
  {
    title: 'Offline progression',
    text: 'The ship keeps running while you are away, capped and with safety floors, so a break never ends your run.',
  },
  {
    title: 'Three save slots',
    text: 'Run separate ships side by side. Saves stay on your device.',
  },
  {
    title: 'Achievements and captain progression',
    text: 'Unlock achievements and raise your captain level as you play.',
  },
  {
    title: 'Readable by design',
    text: 'Clear text, status indicators that never rely on colour alone, and reduced-motion support.',
  },
];

export function Frontier() {
  return (
    <section className="section section--alt" id="anomalies" aria-labelledby="anomalies-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Anomalies &amp; expeditions</p>
          <h2 id="anomalies-title">Something is growing in the dark</h2>
          <p>
            Three anomalies, each spreading to neighbouring rooms by rules you can learn and read. Contain them, purge them,
            study them, or put them to work.
          </p>
        </div>

        <ul className="anomalies">
          {ANOMALIES.map((anomaly) => (
            <li key={anomaly.name} className={`panel anomaly tone-${anomaly.tone}`}>
              <AnomalyIcon name={anomaly.name} />
              <div>
                <span className="mono-tag">{anomaly.kind}</span>
                <h3>{anomaly.name}</h3>
                <p>{anomaly.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="panel route">
          <div className="route__head">
            <div>
              <p className="sys-label">NAV // Expedition map</p>
              <h3>Four destinations, one lost expedition</h3>
            </div>
          </div>
          <ol>
            {DESTINATIONS.map((destination) => (
              <li key={destination.name}>
                <span className="mono-tag">{destination.code}</span>
                <strong>{destination.name}</strong>
                <span>{destination.kind}</span>
              </li>
            ))}
          </ol>
          <p className="endings">
            <span>A campaign with a real ending, and three different endings depending on how your ship evolves:</span>
            {ENDINGS.map((ending) => (
              <span key={ending.name} className={`chip tone-${ending.tone}`}>
                <span className="chip__dot" aria-hidden="true" />
                {ending.name}
              </span>
            ))}
          </p>
        </div>

        <ul className="also">
          {ALSO.map((item) => (
            <li key={item.title} className="panel">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
