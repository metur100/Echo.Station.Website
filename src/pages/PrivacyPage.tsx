import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { SkipLink } from '../components/SkipLink';
import { GAME } from '../content/game';
import { asset, LINKS } from '../content/links';

export const PRIVACY_LAST_UPDATED = '10 October 2026';

export function PrivacyPage() {
  const home = asset('');
  return (
    <>
      <SkipLink />
      <Header homeHref={home} />
      <main id="main" tabIndex={-1} className="prose-page">
        <article className="container prose" aria-labelledby="privacy-title">
          <p className="sys-label">SYS // Privacy</p>
          <h1 id="privacy-title">Privacy policy</h1>
          <p className="updated">Last updated: {PRIVACY_LAST_UPDATED}</p>

          <div className="panel summary-box">
            <p>ECHO STATION does not collect, store or share any personal data.</p>
            <p>
              The game has no accounts, makes no network calls and contains no analytics, advertising, crash reporting or
              third-party SDKs that collect data. Everything the game saves stays on your device.
            </p>
          </div>

          <h2>Who is responsible</h2>
          <p>
            ECHO STATION - The Living Ship is developed by {GAME.developer}, an independent developer. This policy covers the
            mobile game for Android and iOS and this website.
          </p>

          <h2>The game</h2>
          <h3>What the game does not do</h3>
          <ul>
            <li>No user accounts, sign-in or online profiles.</li>
            <li>No network connections of any kind. The game plays fully offline and does not contact any server.</li>
            <li>No analytics, telemetry or usage tracking.</li>
            <li>No advertising and no advertising identifiers.</li>
            <li>No crash reporting services.</li>
            <li>No third-party SDKs that collect data.</li>
            <li>No in-app purchases in this version, so no payment data is processed.</li>
          </ul>

          <h3>What is stored on your device</h3>
          <p>
            Your three save slots and your settings (for example audio, haptics and accessibility options) are stored only
            on your device, in the app's own documents folder. They never leave the device and are not accessible to me.
            Uninstalling the app deletes them. Whether they are included in your phone's own system backup is controlled by
            your operating system and your backup settings, not by the game.
          </p>

          <h3>Audio and haptics</h3>
          <p>
            Sound and vibration feedback are generated locally on your device. The game does not use the microphone, camera,
            location, contacts or any other personal information.
          </p>

          <h2>This website</h2>
          <p>
            This website is a static page hosted on GitHub Pages. It uses no cookies, no analytics, no tracking scripts and
            no forms. Fonts are self-hosted with the site, so no requests are made to external font services.
          </p>
          <p>
            As the host, GitHub may process standard technical server logs, such as your IP address, browser type and the
            time of your request, to deliver and secure the site. This processing is carried out by GitHub under its own
            terms; see the{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">
              GitHub General Privacy Statement
            </a>
            .
          </p>
          <p>
            Links to GitHub (issues and source code) lead to github.com, which has its own privacy practices. Store links,
            once available, lead to Google Play or the App Store, which are governed by Google's and Apple's policies.
          </p>

          <h2>Children</h2>
          <p>
            The game collects no data from anyone, including children. There is nothing to sign up for, no chat and no way
            to share personal information through the game.
          </p>

          <h2>Your rights</h2>
          <p>
            Because no personal data about you is collected or held, there is nothing to access, correct, export or delete on
            my side. You can remove all game data at any time by uninstalling the app.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If the game ever changes in a way that affects your privacy, for example by adding an online feature, this
            policy will be updated before that version is released and the date above will change.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be raised through GitHub issues at{' '}
            <a href={LINKS.issues} rel="noopener">
              github.com/metur100/Echo.Station.Game/issues
            </a>
            . Please do not post personal information in a public issue.
          </p>
          <p>Developer: {GAME.developer}</p>
        </article>
      </main>
      <Footer homeHref={home} />
    </>
  );
}
