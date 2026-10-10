import { describe, expect, it } from 'vitest';
import { CREW, DESTINATIONS, ENDINGS, FAQ, MODULES, RESEARCH } from '../content/game';
import { LINKS } from '../content/links';

describe('game facts', () => {
  it('match the current build', () => {
    expect(MODULES).toHaveLength(14);
    expect(RESEARCH).toHaveLength(4);
    expect(RESEARCH.reduce((n, b) => n + b.projects.length, 0)).toBe(18);
    expect(DESTINATIONS.map((d) => d.name)).toEqual(['Kessler Drift', 'Glacier Shard', 'The Lantern', 'The Hollow Ark']);
    expect(ENDINGS).toHaveLength(3);
    expect(CREW.filter((c) => c.id !== 'unknown').map((c) => c.name)).toEqual([
      'Ines Varga',
      'Dr. Tomas Okafor',
      'Mira Sato',
    ]);
  });

  it('answers the key FAQ topics', () => {
    const all = FAQ.map((f) => `${f.q} ${f.a}`).join(' ').toLowerCase();
    for (const topic of ['offline', 'free', 'no ads', 'none', 'android', 'ios', 'three', 'in development']) {
      expect(all).toContain(topic);
    }
  });

  it('never ships a fake support address', () => {
    expect(LINKS.supportEmail).toBeNull();
    expect(LINKS.issues).toBe('https://github.com/metur100/Echo.Station.Game/issues');
  });
});
