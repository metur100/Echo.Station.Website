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
  // Real captures of build 1.0.0 (Android, 1080 × 1920 scaled to 720 × 1280).
  {
    file: '01-ship.webp',
    caption: 'The ESV Meridian, mid-campaign, with resources, objective and overlays',
    alt: 'Isometric view of the ship with a glowing reactor, hydroponics and a quarantined storage bay, under a resource bar and objective card',
    width: 720,
    height: 1280,
  },
  {
    file: '02-inspect.webp',
    caption: 'Inspecting the Lumen Bloom: why it grows and which room is next',
    alt: 'Module inspector for the hydroponics bay showing the Lumen Bloom intensity, growth reasons and the room at risk',
    width: 720,
    height: 1280,
  },
  {
    file: '03-echo.webp',
    caption: 'The Echo archive: what the ship remembers',
    alt: 'List of echoes: residual energy around the reactor, structural fatigue in the airlock, and resonance',
    width: 720,
    height: 1280,
  },
  {
    file: '04-build.webp',
    caption: 'Placing a new room on the hull grid',
    alt: 'Build placement with a highlighted hydroponics footprint and the Build here button',
    width: 720,
    height: 1280,
  },
  {
    file: '05-crew.webp',
    caption: 'Chief engineer Ines Varga: skills, traits and tasks',
    alt: 'Crew detail screen with a portrait, health, morale and fatigue bars, skills and task buttons',
    width: 720,
    height: 1280,
  },
  {
    file: '06-power.webp',
    caption: 'Power overlay: what is powered and where the power flows',
    alt: 'Ship rooms tinted by power state with animated power-flow lines from the reactor',
    width: 720,
    height: 1280,
  },
  {
    file: '07-research.webp',
    caption: 'Research tree with four branches',
    alt: 'Engineering research tiers with completed projects marked',
    width: 720,
    height: 1280,
  },
  {
    file: '08-map.webp',
    caption: 'Expedition map: four destinations',
    alt: 'Star chart with Kessler Drift, Glacier Shard, the Lantern and the Hollow Ark',
    width: 720,
    height: 1280,
  },
];
