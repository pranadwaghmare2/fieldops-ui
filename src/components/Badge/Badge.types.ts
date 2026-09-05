import type { ReactNode } from 'react';
import type {
  StyleProp,
  TextProps as NativeTextProps,
  TextStyle,
} from 'react-native';

import type { StatusKey } from '../../core/tokens';

/**
 * Props for the token-driven {@link Badge} component.
 */
export interface BadgeProps
  extends Omit<NativeTextProps, 'children' | 'style'> {
  /** Work-order status that selects the badge's visual tone. */
  status: StatusKey;

  /** Label rendered by the native text element. */
  children?: ReactNode;

  /** NativeWind utilities merged after the status recipe. */
  className?: string;

  /** Native text styles applied after token defaults. */
  style?: StyleProp<TextStyle>;
}
