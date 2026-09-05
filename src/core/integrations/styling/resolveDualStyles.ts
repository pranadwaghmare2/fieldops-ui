import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { composeClassName } from './composeClassName';
import { composeStyle } from './composeStyle';

type AnyStyle = ViewStyle | TextStyle;

export interface DualStyleInput {
  /** Token / recipe class string */
  defaultClassName: string;
  /** Token / recipe StyleSheet object */
  defaultStyle: StyleProp<AnyStyle>;
  /** Consumer NativeWind override */
  className?: string;
  /** Consumer native style override */
  style?: StyleProp<AnyStyle>;
}

/**
 * Merges dual appearance for NativeWind and non-NativeWind hosts.
 *
 * NativeWind gives the `style` prop precedence over `className`. If token
 * StyleSheet defaults are always applied, consumer `className` utilities can
 * never win. When the consumer passes a non-empty `className`, skip StyleSheet
 * defaults so NativeWind can apply the merged class string. Non-NativeWind
 * hosts ignore `className`, so StyleSheet defaults stay when no consumer
 * className is present.
 */
export function resolveDualStyles({
  defaultClassName,
  defaultStyle,
  className,
  style,
}: DualStyleInput): { className: string; style: StyleProp<AnyStyle> } {
  const mergedClassName = composeClassName(defaultClassName, className);
  const consumerUsesClassName =
    typeof className === 'string' && className.trim().length > 0;

  return {
    className: mergedClassName,
    style: consumerUsesClassName
      ? composeStyle(style)
      : composeStyle(defaultStyle, style),
  };
}
