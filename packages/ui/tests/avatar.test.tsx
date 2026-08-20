import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '../src/components/avatar';

describe('Avatar', () => {
  it('renders the image with alt text', () => {
    render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="Profil de Kim" />
      </Avatar>,
    );
    expect(screen.getByRole('img', { name: 'Profil de Kim' })).toHaveAttribute('src', '/avatar.jpg');
  });

  it('renders the initials fallback', () => {
    render(
      <Avatar>
        <AvatarFallback>KW</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText('KW')).toBeInTheDocument();
  });

  it('collapses overflowing avatars into a +N counter', () => {
    render(
      <AvatarGroup max={2}>
        {['A', 'B', 'C', 'D'].map((name) => (
          <Avatar key={name}>
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>,
    );
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.getAllByText(/^[A-D]$/)).toHaveLength(2);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="Profil" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
