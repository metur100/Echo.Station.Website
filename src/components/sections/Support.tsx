import { LINKS } from '../../content/links';
import { CodeIcon, ExternalIcon, IssueIcon } from '../icons';

export function Support() {
  return (
    <section className="section" id="support" aria-labelledby="support-title">
      <div className="container">
        <div className="section-head">
          <p className="sys-label">SYS // Comms</p>
          <h2 id="support-title">Support &amp; contact</h2>
          <p>Found a bug, stuck on something, or have a question about the game? Get in touch through GitHub.</p>
        </div>
        <div className="support">
          <article className="panel support-card">
            <IssueIcon width={28} height={28} className="support-card__icon" />
            <h3>Report an issue</h3>
            <p>
              Bug reports, questions and privacy requests go to the issue tracker. Please describe your device, the save
              slot and what happened.
            </p>
            <a className="btn btn--primary" href={LINKS.issues} rel="noopener">
              Open GitHub issues
              <ExternalIcon />
            </a>
          </article>
          <article className="panel support-card">
            <CodeIcon width={28} height={28} className="support-card__icon" />
            <h3>Source repository</h3>
            <p>Follow development and see how the simulation works under the hood.</p>
            <a className="btn btn--ghost" href={LINKS.gameRepo} rel="noopener">
              View the game repository
              <ExternalIcon />
            </a>
          </article>
        </div>
        {LINKS.supportEmail && (
          <p className="support__email">
            Prefer e-mail? Write to <a href={`mailto:${LINKS.supportEmail}`}>{LINKS.supportEmail}</a>.
          </p>
        )}
      </div>
    </section>
  );
}
