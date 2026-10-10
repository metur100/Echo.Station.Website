import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { StoreButton } from '../components/sections/GetTheGame';
import { LINKS } from '../content/links';

describe('store buttons', () => {
  it('are configured as coming soon until real store pages exist', () => {
    expect(LINKS.googlePlay).toBeNull();
    expect(LINKS.appStore).toBeNull();
  });

  it('show a disabled "Coming soon" state and never link to store URLs', () => {
    const { container } = render(<App />);
    for (const store of ['Google Play', 'App Store']) {
      const button = screen.getByRole('button', { name: new RegExp(`coming soon\\s*${store}`, 'i') });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    }
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '');
    expect(hrefs.some((href) => /play\.google\.com|apps\.apple\.com|itunes\.apple\.com/.test(href))).toBe(false);
  });

  it('turns into a real link once a URL is configured', () => {
    const url = 'https://play.google.com/store/apps/details?id=com.certidevelopment.echostation';
    render(<StoreButton store="Google Play" url={url} icon={null} />);
    const link = screen.getByRole('link', { name: /get it on\s*google play/i });
    expect(link).toHaveAttribute('href', url);
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });

  it('shows the trailer placeholder instead of a fake video', () => {
    const { container } = render(<App />);
    expect(screen.getByRole('heading', { name: 'Trailer in production' })).toBeInTheDocument();
    expect(container.querySelector('video, iframe')).toBeNull();
  });
});
