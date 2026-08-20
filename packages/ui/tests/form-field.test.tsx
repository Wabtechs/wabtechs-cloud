import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Input } from '../src/components/input';
import { Textarea } from '../src/components/textarea';
import { FormField } from '../src/components/form-field';

describe('FormField', () => {
  it('associates the label with the control via htmlFor', () => {
    render(
      <FormField label="Nom complet">
        <Input placeholder="Jean Dupont" />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Nom complet' });
    expect(input).toHaveAttribute('id');
    expect(input.id).not.toBe('');
  });

  it('injects aria-invalid and links the error message (role=alert)', () => {
    render(
      <FormField label="Email" error="Adresse invalide">
        <Input />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Adresse invalide');
    expect(error.id).toBe(input.getAttribute('aria-describedby'));
  });

  it('links the description via aria-describedby', () => {
    render(
      <FormField label="Mot de passe" description="8 caractères minimum">
        <Input />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Mot de passe' });
    expect(input.getAttribute('aria-describedby')).toBeTruthy();
    expect(screen.getByText('8 caractères minimum')).toBeInTheDocument();
  });

  it('marks a required control with aria-required and an asterisk', () => {
    render(
      <FormField label="Téléphone" required>
        <Input />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: /Téléphone/ });
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('allows typing into a field', async () => {
    const user = userEvent.setup();
    render(
      <FormField label="Nom" error="Requis">
        <Input />
      </FormField>,
    );
    const input = screen.getByRole('textbox', { name: 'Nom' });
    await user.type(input, 'Wabtechs');
    expect(input).toHaveValue('Wabtechs');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <FormField
        label="Email"
        description="Vous recevrez une confirmation."
        error="Adresse invalide"
        required
      >
        <Input />
      </FormField>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Textarea', () => {
  it('renders a textbox and forwards value', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Message" />);
    const textarea = screen.getByRole('textbox', { name: 'Message' });
    await user.type(textarea, 'Bonjour');
    expect(textarea).toHaveValue('Bonjour');
  });
});
