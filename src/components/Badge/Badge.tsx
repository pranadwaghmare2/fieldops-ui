import { forwardRef } from 'react';
import { Text as NativeText } from 'react-native';

import { getBadgeStyles } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

/**
 * Renders a compact, token-backed work-order status label.
 *
 * Consumer `className` utilities and native `style` values override the
 * selected status tone's defaults.
 *
 * @remarks
 * Forwards its ref to the underlying React Native `Text`. NativeWind hosts use
 * `className`; other hosts retain the same defaults through native styles.
 *
 * @example
 * ```tsx
 * <Badge status="in_progress">In progress</Badge>
 * ```
 */
export const Badge = forwardRef<NativeText, BadgeProps>(function Badge(
  { children, className, status, style, ...props },
  ref
) {
  const badgeStyles = getBadgeStyles(status, className, style);

  return (
    <NativeText
      {...props}
      {...badgeStyles}
      ref={ref}
    >
      {children}
    </NativeText>
  );
});
