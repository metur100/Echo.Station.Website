import { CREW, CREW_STATS, RESEARCH } from '../../content/game';
import { CrewPortrait } from '../art/CrewPortrait';

const TASKS = ['Repair', 'Research', 'Maintenance', 'Expedition prep', 'Emergency response'];

export function CrewResearch() {
  const projectCount = RESEARCH.reduce((sum, branch) => sum + branch.projects.length, 0);
  return (
    <section className="section" id="crew" aria-labelledby="crew-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Crew manifest</p>
          <h2 id="crew-title">Three people awake. Maybe four.</h2>
          <p>
            Your crew is small, tired and very human. Each of them has skills, traits, health, morale, fatigue and
            memories of what they have been through, and all of it affects how well they work.
          </p>
        </div>

        <ul className="crew-grid">
          {CREW.map((member) => (
            <li key={member.id} className={`panel crew-card tone-${member.tone}`}>
              <div className="crew-card__portrait">
                <CrewPortrait id={member.id} />
              </div>
              <div className="crew-card__body">
                <span className="mono-tag crew-card__role">{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.note}</p>
                <ul className="traits" aria-label={`${member.name} traits`}>
                  {member.traits.map((trait) => (
                    <li key={trait}>{trait}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="panel crew-meta">
          <div>
            <h3>Every crew member tracks</h3>
            <ul>
              {CREW_STATS.map((stat) => (
                <li key={stat} className="chip">
                  {stat}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Assignments</h3>
            <ul>
              {TASKS.map((task) => (
                <li key={task} className="chip tone-teal">
                  <span className="chip__dot" aria-hidden="true" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="research">
          <div className="research__head">
            <div>
              <p className="sys-label sys-label--amber">SYS // Research tree</p>
              <h3>Four branches, {projectCount} projects</h3>
            </div>
            <p>
              Laboratories and scientists produce research. Spend it to unlock modules, harden the ship, chart a way
              forward, and understand the ship's memory.
            </p>
          </div>
          <ul className="branches">
            {RESEARCH.map((branch) => (
              <li key={branch.id} className={`panel branch tone-${branch.tone}`}>
                <div className="branch__top">
                  <h4>{branch.name}</h4>
                  <span className="mono-tag">
                    {branch.code} // {branch.projects.length}
                  </span>
                </div>
                <ol aria-label={`${branch.name} projects`}>
                  {branch.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
