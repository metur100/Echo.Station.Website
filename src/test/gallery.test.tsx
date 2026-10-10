import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Gallery } from '../components/sections/Gallery';
import { SCREENSHOTS } from '../content/screenshots';

describe('screenshot gallery', () => {
  it('ships with an empty manifest and shows the pending panel', () => {
    expect(SCREENSHOTS).toHaveLength(0);
    render(<Gallery />);
    expect(screen.getByRole('status')).toHaveTextContent(
      'Screenshots from the current build arrive with the first test release',
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders manifest entries as lazy images with intrinsic size and captions', () => {
    render(
      <Gallery
        items={[
          { file: 'reactor.webp', caption: 'Reactor bay', alt: 'Reactor room glowing amber', width: 2340, height: 1080 },
          { file: 'crew.webp', caption: 'Crew view', alt: 'Crew panel', width: 1080, height: 2340 },
        ]}
      />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
    const first = screen.getByAltText('Reactor room glowing amber');
    expect(first).toHaveAttribute('loading', 'lazy');
    expect(first).toHaveAttribute('width', '2340');
    expect(first).toHaveAttribute('height', '1080');
    expect(first.getAttribute('src')).toMatch(/screenshots\/reactor\.webp$/);
    expect(screen.getByText('Reactor bay')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
