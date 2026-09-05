import { forwardRef } from 'react';
import { Text as NativeText } from 'react-native';

import { getTextStyles } from './Text.styles';
import type { TextProps } from './Text.types';

/**
 * Renders text using a token-backed typography role.
 *
 * Consumer `className` utilities and native `style` values override the
 * selected role's defaults.
 *
 * @remarks
 * Forwards its ref to the underlying React Native `Text`. NativeWind hosts use
 * `className`; other hosts retain the same defaults through native styles.
 *
 * @example
 * ```tsx
 * <Text role="heading">Work orders</Text>
 * ```
 */
export const Text = forwardRef<NativeText, TextProps>(function Text(
  { children, className, role = 'body', style, ...props },
  ref
) {
  const textStyles = getTextStyles(role, className, style);

  return (
    <NativeText
      {...props}
      {...textStyles}
      ref={ref}
    >
      {children}
    </NativeText>
  );
});
