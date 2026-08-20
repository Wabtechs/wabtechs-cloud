import * as React from 'react';

export interface WabtechsMarkProps extends React.ComponentProps<'svg'> {}

/**
 * Symbole Wabtechs : un « W » dans un carré arrondi à dégradé violet.
 */
export function WabtechsMark({ ...props }: WabtechsMarkProps): React.JSX.Element {
  const gradientId = React.useId();

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect width="48" height="48" rx="12" fill={`url(#${gradientId})`} />
      <path
        d="M12 15 L18 33 L24 21 L30 33 L36 15"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a055f5" />
          <stop offset="1" stopColor="#5b1fa0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export interface WabtechsWordmarkProps extends React.ComponentProps<'svg'> {}

/**
 * Mot-symbole Wabtechs : marque + texte « Wabtechs ».
 */
export function WabtechsWordmark({ ...props }: WabtechsWordmarkProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <rect width="48" height="48" rx="12" fill="#842ae3" />
      <path
        d="M12 15 L18 33 L24 21 L30 33 L36 15"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="60"
        y="34"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="currentColor"
      >
        Wabtechs
      </text>
    </svg>
  );
}

export interface WabtechsLogoProps {
  markClassName?: string;
  textClassName?: string;
  text?: string;
}

/**
 * Logo Wabtechs (mark + texte), pour les applications consommatrices.
 */
export function WabtechsLogo({
  markClassName,
  textClassName,
  text = 'Wabtechs',
}: WabtechsLogoProps): React.JSX.Element {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <WabtechsMark
        className={markClassName}
        style={{ width: '2rem', height: '2rem', flexShrink: 0 }}
      />
      <span
        className={textClassName}
        style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em' }}
      >
        {text}
      </span>
    </span>
  );
}
