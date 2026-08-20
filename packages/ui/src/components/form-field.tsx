import * as React from 'react';
import { cn } from '../lib/utils';
import { Label } from './label';

export interface FormFieldProps {
  /** Le contrôle de formulaire (Input, Textarea, Select…). */
  children: React.ReactNode;
  /** Libellé accessible, relié au contrôle via `htmlFor`. */
  label?: React.ReactNode;
  /** Message d'erreur (affiche `aria-invalid` + description reliée). */
  error?: React.ReactNode;
  /** Description d'aide. */
  description?: React.ReactNode;
  required?: boolean;
  /** ID du contrôle (généré automatiquement sinon). */
  id?: string;
  className?: string;
}

function createId(baseId: string, suffix: string): string {
  return `${baseId}-${suffix}`;
}

/**
 * Champ de formulaire accessible.
 *
 * Associe automatiquement : `label` ↔ contrôle, `aria-describedby`
 * (description + erreur), `aria-invalid` en cas d'erreur, `role="alert"`
 * pour le message d'erreur. Compatible React Hook Form + Zod (prop `error`).
 *
 * @example
 * <FormField label="Nom" error={errors.name?.message}>
 *   <Input {...register('name')} />
 * </FormField>
 */
export function FormField({
  children,
  label,
  error,
  description,
  required,
  id,
  className,
}: FormFieldProps): React.JSX.Element {
  const generatedId = React.useId().replace(/[:]/g, '');
  const controlId = id ?? generatedId;
  const errorId = createId(controlId, 'error');
  const descriptionId = createId(controlId, 'description');

  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter((item): item is string => item !== null)
    .join(' ')
    .trim();

  let control = children;
  if (React.isValidElement<{
    id?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    'aria-required'?: boolean;
  }>(children)) {
    control = React.cloneElement(children, {
      id: controlId,
      ...(error ? { 'aria-invalid': true } : {}),
      ...(describedBy ? { 'aria-describedby': describedBy } : {}),
      ...(required ? { 'aria-required': true } : {}),
    });
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <Label htmlFor={controlId}>
          {label}
          {required ? (
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          ) : null}
        </Label>
      ) : null}
      {control}
      {description ? (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
