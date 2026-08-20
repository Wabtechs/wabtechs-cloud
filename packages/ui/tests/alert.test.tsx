import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Alert } from '../src/components/alert';

describe('Alert', () => {
  it('announces content with role="alert"', () => {
    render(<Alert title="Attention" description="Action requise." />);
    expect(screen.getByRole('alert')).toHaveTextContent('Attention');
  });

  it('renders variant-specific default icons', () => {
    render(<Alert variant="success" title="OK" />);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();
  });

  it('hides the icon when showIcon is false', () => {
    render(<Alert showIcon={false} title="Titre" />);
    expect(screen.getByRole('alert').querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders a custom icon and an action', () => {
    render(
      <Alert title="Titre" icon={<span data-testid="custom-icon" />} action={<button>Action</button>} />,
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Alert variant="destructive" title="Erreur" description="Échec de la sauvegarde." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
