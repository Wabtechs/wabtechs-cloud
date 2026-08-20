import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button, buttonVariants } from '../src/components/button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Enregistrer</Button>);
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Cliquer</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows a loading state: disabled + aria-busy + spinner', () => {
    render(<Button loading>Sauvegarde…</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector('[data-testid="spinner"]')).toBeInTheDocument();
  });

  it('does not fire onClick while loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        En cours
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders a custom element via asChild (Slot)', () => {
    render(
      <Button asChild>
        <a href="/dashboard">Lien</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Lien' });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('supports disabled', () => {
    render(<Button disabled>Désactivé</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('exposes every variant through buttonVariants', () => {
    const variants = Object.keys(buttonVariants.variants.variant) as Array<
      keyof typeof buttonVariants.variants.variant
    >;
    for (const variant of variants) {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button', { name: String(variant) })).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Button variant="primary" loading>
        Valider
      </Button>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
