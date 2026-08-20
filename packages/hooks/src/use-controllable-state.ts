import * as React from 'react';

export interface ControllableStateProps<T> {
  /** Valeur contrôlée (prioritaire). */
  value?: T;
  /** Valeur par défaut en mode non contrôlé. */
  defaultValue: T;
  /** Notifié de chaque changement. */
  onChange?: (value: T) => void;
}

/**
 * Gère un état contrôlé / non contrôlé (pattern des composants Radix).
 */
export function useControllableState<T>({
  value: valueProp,
  defaultValue,
  onChange,
}: ControllableStateProps<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const setValue = React.useCallback(
    (next: React.SetStateAction<T>) => {
      const nextValue = typeof next === 'function' ? (next as (prev: T) => T)(value) : next;
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange, value],
  );

  return [value, setValue];
}
