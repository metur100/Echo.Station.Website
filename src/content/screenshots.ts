/**
 * Screenshot manifest for the gallery.
 *
 * HOW TO ADD SCREENSHOTS
 * 1. Export real captures from the current build (PNG, JPEG or WebP; keep each
 *    file below ~400 KB, e.g. 1080 x 2340 portrait or 2340 x 1080 landscape).
 * 2. Copy them to `public/screenshots/` (e.g. `public/screenshots/reactor-bay.webp`).
 * 3. Add one entry per file below. `file` is relative to `public/screenshots/`;
 *    `width` and `height` are the real pixel size of the file (prevents layout shift).
 *
 * While this list is empty the gallery shows a "screenshots arrive with the
 * first test release" panel. Never add mock-ups or edited images here.
 */
export interface Screenshot {
  /** File name inside `public/screenshots/`. */
  readonly file: string;
  /** Short visible caption. */
  readonly caption: string;
  /** Alternative text describing what the image shows. */
  readonly alt: string;
  /** Intrinsic pixel width of the file. */
  readonly width: number;
  /** Intrinsic pixel height of the file. */
  readonly height: number;
}

export const SCREENSHOTS: readonly Screenshot[] = [
  // Example:
  // {
  //   file: 'reactor-bay.webp',
  //   caption: 'Rerouting power around an unstable reactor',
  //   alt: 'Isometric view of the ship with the reactor room glowing amber and a warning panel open',
  //   width: 2340,
  //   height: 1080,
  // },
];
