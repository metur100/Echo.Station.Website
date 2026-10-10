import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PrivacyPage } from '../pages/PrivacyPage';

describe('privacy page', () => {
  it('states that no data is collected and shows the update date', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy policy' })).toBeInTheDocument();
    expect(screen.getByText('ECHO STATION does not collect, store or share any personal data.')).toBeInTheDocument();
    expect(screen.getByText('Last updated: 10 October 2026')).toBeInTheDocument();
  });

  it('describes the offline implementation and on-device storage', () => {
    const { container } = render(<PrivacyPage />);
    const text = container.textContent ?? '';
    const phrases = [
      'No user accounts',
      'No network connections',
      'No analytics',
      'No advertising',
      'No crash reporting',
      'No third-party SDKs',
      'documents folder',
      'Uninstalling the app deletes them',
    ];
    for (const phrase of phrases) expect(text).toContain(phrase);
  });

  it('covers website hosting and links to GitHub for privacy and contact', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('link', { name: 'GitHub General Privacy Statement' })).toHaveAttribute(
      'href',
      'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
    );
    expect(screen.getByRole('link', { name: 'github.com/metur100/Echo.Station.Game/issues' })).toHaveAttribute(
      'href',
      'https://github.com/metur100/Echo.Station.Game/issues',
    );
    expect(screen.getByRole('heading', { name: 'Children' })).toBeInTheDocument();
  });
});
