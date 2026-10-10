/**
 * Every external link the site uses lives here.
 *
 * Store and trailer URLs are `null` until the pages really exist. While a value
 * is `null` the site shows a disabled "Coming soon" state instead of a link.
 * To go live, replace `null` with the full https URL, e.g.
 *   googlePlay: 'https://play.google.com/store/apps/details?id=com.certidevelopment.echostation',
 */
export interface SiteLinks {
  /** Google Play listing. `null` = coming soon. */
  readonly googlePlay: string | null;
  /** Apple App Store listing. `null` = coming soon. */
  readonly appStore: string | null;
  /** Public trailer URL (e.g. a YouTube video). `null` = trailer in production. */
  readonly trailer: string | null;
  /** Dedicated support e-mail. `null` = not set up yet (see README TODO). */
  readonly supportEmail: string | null;
  /** Public source repository of the game. */
  readonly gameRepo: string;
  /** Issue tracker used for support and privacy questions. */
  readonly issues: string;
  /** Source repository of this website. */
  readonly websiteRepo: string;
}

export const LINKS: SiteLinks = {
  googlePlay: null,
  appStore: null,
  trailer: null,
  supportEmail: null,
  gameRepo: 'https://github.com/metur100/Echo.Station.Game',
  issues: 'https://github.com/metur100/Echo.Station.Game/issues',
  websiteRepo: 'https://github.com/metur100/Echo.Station.Website',
};

export const SITE_URL = 'https://metur100.github.io/Echo.Station.Website/';

/** Resolve a path inside `public/` against the deployed base path. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}
