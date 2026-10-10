import { FAQ } from '../../content/game';
import { asset } from '../../content/links';

export function Faq() {
  return (
    <section className="section section--alt" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="sys-label">SYS // Queries</p>
          <h2 id="faq-title">Frequently asked questions</h2>
        </div>
        <div className="faq">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <div>
                <p>{item.a}</p>
              </div>
            </details>
          ))}
          <p className="faq__more">
            More detail on data handling is in the <a href={asset('privacy.html')}>privacy policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
