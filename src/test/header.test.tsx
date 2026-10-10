import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '../components/Header';

describe('mobile menu', () => {
  it('opens and closes with the toggle and with Escape', () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    const panel = document.getElementById('mobile-nav');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav');
    expect(panel).not.toBeVisible();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Close menu' })).toBe(toggle);
    expect(panel).toBeVisible();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('closes after choosing a destination', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const link = screen.getByRole('navigation', { name: 'Main (mobile)' }).querySelector('a');
    expect(link).not.toBeNull();
    if (link) fireEvent.click(link);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
