import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { NAV_ITEMS } from '../components/Header';

const REQUIRED_SECTIONS = [
  'top',
  'about',
  'gameplay',
  'features',
  'echo-memory',
  'crew',
  'screenshots',
  'trailer',
  'get-the-game',
  'google-play',
  'app-store',
  'faq',
  'support',
];

describe('home page', () => {
  it('renders every required section with a heading', () => {
    const { container } = render(<App />);
    for (const id of REQUIRED_SECTIONS) {
      const section = container.querySelector(`#${id}`);
      expect(section, `section #${id}`).not.toBeNull();
      expect(section?.querySelector('h1, h2, h3')).not.toBeNull();
    }
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('ECHO STATION');
    expect(screen.getAllByText('The ship remembers.').length).toBeGreaterThan(0);
  });

  it('has landmarks, a skip link and nav links that point at existing sections', () => {
    const { container } = render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const item of NAV_ITEMS) {
      const link = within(nav).getByRole('link', { name: item.label });
      expect(link).toHaveAttribute('href', `#${item.id}`);
      expect(container.querySelector(`#${item.id}`)).not.toBeNull();
    }
  });

  it('credits the developer and states independence in the footer', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent('© 2026 Medin Turkes');
    expect(footer).toHaveTextContent('ECHO STATION is an independent game. Not affiliated with any other franchise.');
  });

  it('gives every graphic an accessible name or hides it from assistive tech', () => {
    const { container } = render(<App />);
    container.querySelectorAll('svg').forEach((svg) => {
      const hidden = svg.closest('[aria-hidden="true"]');
      const labelled = svg.getAttribute('role') === 'img' && svg.hasAttribute('aria-labelledby');
      expect(Boolean(hidden) || labelled).toBe(true);
    });
    container.querySelectorAll('img').forEach((img) => expect(img).toHaveAttribute('alt'));
  });
});
