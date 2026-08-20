import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

export type AspectRatioProps = React.ComponentProps<typeof AspectRatioPrimitive.Root>;

/**
 * Ratio d'aspect (Radix) — conteneur à ratio fixe.
 *
 * @example <AspectRatio ratio={16 / 9}>…</AspectRatio>
 */
export const AspectRatio = AspectRatioPrimitive.Root;
