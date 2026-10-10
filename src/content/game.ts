/**
 * Game facts shown on the website. Everything here mirrors the current build of
 * ECHO STATION - The Living Ship. Do not add ratings, reviews, player counts,
 * prices or release dates that do not exist.
 */

export const GAME = {
  title: 'ECHO STATION',
  subtitle: 'The Living Ship',
  tagline: 'The ship remembers.',
  developer: 'Medin Turkes',
  shipName: 'ESV Meridian',
  status: 'In development',
} as const;

export type Tone = 'cyan' | 'teal' | 'amber' | 'orange' | 'violet' | 'success' | 'danger' | 'frost';

export interface LoopStep {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly text: string;
  readonly tone: Tone;
}

export const LOOP: readonly LoopStep[] = [
  { id: 'repair', label: '01', title: 'Repair', tone: 'amber', text: 'Patch hull breaches, worn modules and failing systems before they cascade.' },
  { id: 'build', label: '02', title: 'Build', tone: 'cyan', text: 'Lay out new rooms on the hull grid and route power where it matters.' },
  { id: 'crew', label: '03', title: 'Crew', tone: 'teal', text: 'Assign repair, research, maintenance, expedition prep and emergency response.' },
  { id: 'research', label: '04', title: 'Research', tone: 'violet', text: 'Study anomalies and unlock new modules across four research branches.' },
  { id: 'explore', label: '05', title: 'Explore', tone: 'frost', text: 'Send expeditions to nearby destinations and bring back salvage and answers.' },
  { id: 'consequences', label: '06', title: 'Consequences', tone: 'orange', text: 'The ship records what you did. Echoes change the next round of decisions.' },
];

export interface ModuleInfo {
  readonly name: string;
  readonly tone: Tone;
}

export const MODULES: readonly ModuleInfo[] = [
  { name: 'Reactor', tone: 'amber' },
  { name: 'Oxygen generator', tone: 'cyan' },
  { name: 'Water recycler', tone: 'cyan' },
  { name: 'Hydroponics', tone: 'success' },
  { name: 'Crew quarters', tone: 'teal' },
  { name: 'Storage', tone: 'teal' },
  { name: 'Laboratory', tone: 'violet' },
  { name: 'Repair workshop', tone: 'amber' },
  { name: 'Airlock', tone: 'frost' },
  { name: 'Corridor', tone: 'teal' },
  { name: 'Thermal radiator', tone: 'orange' },
  { name: 'Shield generator', tone: 'cyan' },
  { name: 'Containment field', tone: 'violet' },
  { name: 'Echo condenser', tone: 'violet' },
];

export interface SystemInfo {
  readonly code: string;
  readonly title: string;
  readonly text: string;
  readonly tone: Tone;
}

export const SHIP_SYSTEMS: readonly SystemInfo[] = [
  {
    code: 'PWR',
    title: 'Power allocation',
    tone: 'amber',
    text: 'Every module has a priority. When output drops, low-priority rooms go dark first and a battery buffers the gap.',
  },
  {
    code: 'LSS',
    title: 'Life support',
    tone: 'cyan',
    text: 'Oxygen, food and water are produced, stored and consumed. Shortages hit the crew long before they hit the hull.',
  },
  {
    code: 'THM',
    title: 'Heat transfer',
    tone: 'orange',
    text: 'Heat flows between neighbouring rooms. Reactors overheat their surroundings; exposed rooms freeze without it.',
  },
  {
    code: 'HUL',
    title: 'Wear and breaches',
    tone: 'danger',
    text: 'Modules wear out with use and stress. Neglect them and the hull breaches, venting the room to space.',
  },
];

export interface EchoType {
  readonly id: string;
  readonly name: string;
  readonly cause: string;
  readonly effect: string;
  readonly tone: Tone;
}

export const ECHO_TYPES: readonly EchoType[] = [
  {
    id: 'residual',
    name: 'Residual energy',
    cause: 'A reactor overload',
    effect: 'Energy lingers in nearby rooms, and the Bloom learns to feed on it.',
    tone: 'amber',
  },
  {
    id: 'contamination',
    name: 'Contamination',
    cause: 'The Bloom dying in a room',
    effect: 'The room stays contaminated, and the Bloom can grow back there.',
    tone: 'violet',
  },
  {
    id: 'fatigue',
    name: 'Structural fatigue',
    cause: 'A module damaged again and again',
    effect: 'The metal weakens and wears faster with every incident.',
    tone: 'danger',
  },
  {
    id: 'resonance',
    name: 'Resonance',
    cause: 'Major decisions',
    effect: 'The ship remembers what you chose and leans toward it.',
    tone: 'cyan',
  },
];

export const ECHO_TECH: readonly { name: string; text: string }[] = [
  { name: 'Echo Condensers', text: 'Drain residual energy from a room and its neighbours and turn it into research.' },
  { name: 'Lattice Alloys', text: 'Structural fatigue stops adding wear and slowly repairs the module instead.' },
  { name: 'Symbiotic Cultures', text: 'Cultivate the Lumen Bloom: food in hydroponics, research when sealed elsewhere.' },
];

export type CrewId = 'ines' | 'tomas' | 'mira' | 'unknown';

export interface CrewMemberInfo {
  readonly id: CrewId;
  readonly name: string;
  readonly role: string;
  readonly traits: readonly string[];
  readonly note: string;
  readonly tone: Tone;
}

export const CREW: readonly CrewMemberInfo[] = [
  {
    id: 'ines',
    name: 'Ines Varga',
    role: 'Chief engineer',
    traits: ['Steady hands', 'Stubborn'],
    note: 'Keeps the reactor honest. The fastest pair of hands on any repair.',
    tone: 'amber',
  },
  {
    id: 'tomas',
    name: 'Dr. Tomas Okafor',
    role: 'Xenobiologist',
    traits: ['Curious', 'Night owl'],
    note: 'Wants to understand the Bloom before anyone burns it out. Sometimes too close.',
    tone: 'success',
  },
  {
    id: 'mira',
    name: 'Mira Sato',
    role: 'Navigator',
    traits: ['Calm under pressure', "Pilot's instinct"],
    note: 'Plots every expedition and stays level when alarms start.',
    tone: 'cyan',
  },
  {
    id: 'unknown',
    name: 'Unknown survivor',
    role: 'Signal detected',
    traits: ['Rescuable'],
    note: 'A drifting cryo pod is out there. Bring them aboard and the crew grows to four.',
    tone: 'violet',
  },
];

export const CREW_STATS: readonly string[] = ['Skills', 'Traits', 'Health', 'Morale', 'Fatigue', 'Memories'];

export interface ResearchBranch {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly tone: Tone;
  readonly projects: readonly string[];
}

export const RESEARCH: readonly ResearchBranch[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    code: 'ENG',
    tone: 'amber',
    projects: ['Reactor Tuning', 'Thermal Radiators', 'Modular Upgrades', 'Shield Harmonics', 'Lattice Alloys'],
  },
  {
    id: 'xenobiology',
    name: 'Xenobiology',
    code: 'XEN',
    tone: 'success',
    projects: ['Bloom Taxonomy', 'Containment Fields', 'Symbiotic Cultures', 'Sterilization Protocol', 'Cryo Lattice'],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    code: 'NAV',
    tone: 'cyan',
    projects: ['Drift Charting', 'Efficient Burns', 'Long-range Scanner', 'Ark Coordinates'],
  },
  {
    id: 'echo',
    name: 'Echo Studies',
    code: 'ECH',
    tone: 'violet',
    projects: ['Echo Sensing', 'Echo Condenser', 'Choir Tap', 'Echo Cartography'],
  },
];

export interface Anomaly {
  readonly name: string;
  readonly kind: string;
  readonly text: string;
  readonly tone: Tone;
}

export const ANOMALIES: readonly Anomaly[] = [
  { name: 'Lumen Bloom', kind: 'Organism', tone: 'violet', text: 'A bioluminescent organism. Grows in warm rooms, twice as fast in organic ones, breathes oxygen and feeds on residual energy.' },
  { name: 'Static Choir', kind: 'Electromagnetic', tone: 'cyan', text: 'A resonance that lives in powered machinery. Grows with power flow, drains power and causes surges. Starve it by switching the module off.' },
  { name: 'Void Frost', kind: 'Cryogenic', tone: 'frost', text: 'A cryogenic crystal lattice. Grows in the cold, fastest on the hull edge, chills and cracks its room, and melts when warmed.' },
];

export interface Destination {
  readonly name: string;
  readonly kind: string;
  readonly code: string;
}

export const DESTINATIONS: readonly Destination[] = [
  { name: 'Kessler Drift', kind: 'Debris field', code: 'D-01' },
  { name: 'Glacier Shard', kind: 'Ice comet', code: 'D-02' },
  { name: 'The Lantern', kind: 'Dead relay beacon', code: 'D-03' },
  { name: 'The Hollow Ark', kind: 'The lost expedition', code: 'D-04' },
];

export const ENDINGS: readonly { name: string; tone: Tone }[] = [
  { name: 'Containment', tone: 'cyan' },
  { name: 'Symbiosis', tone: 'success' },
  { name: 'Resonance', tone: 'violet' },
];

export const INCIDENTS: readonly string[] = [
  'Reactor instability',
  'Oxygen shortage',
  'Decompression',
  'Crew conflict',
  'Power surges',
  'Contamination warnings',
  'Salvage',
  'Research breakthroughs',
];

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

export const FAQ: readonly FaqItem[] = [
  {
    q: 'Does ECHO STATION work offline?',
    a: 'Yes. The game plays fully offline and never needs a connection. Time away from the ship is simulated when you return, within safe limits, so you do not come back to a wreck.',
  },
  {
    q: 'What does it cost?',
    a: 'The full campaign is free to play. This version has no ads and no in-app purchases.',
  },
  {
    q: 'What data does the game collect?',
    a: 'None. There are no accounts, no analytics, no advertising and no crash reporting, and the game makes no network calls. Details are in the privacy policy.',
  },
  {
    q: 'Which platforms will it be on?',
    a: 'Android and iOS. Both versions are in development and the store pages will be linked here once they exist.',
  },
  {
    q: 'How do saves work?',
    a: 'Saves are stored on your device only, in three separate save slots. Uninstalling the app deletes them.',
  },
  {
    q: 'Is the game finished?',
    a: 'Not yet. ECHO STATION is in development and working toward its first test release. The campaign is designed with a real ending, and three different outcomes depending on how your ship evolves.',
  },
];
