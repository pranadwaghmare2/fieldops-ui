import type { ReactNode } from 'react';
import type {
  StyleProp,
  TextProps as NativeTextProps,
  TextStyle,
} from 'react-native';

import type { TextRole } from '../../core/styles/text';

/**
 * Props for the token-driven {@link Text} component.
 */
export interface TextProps
  extends Omit<NativeTextProps, 'children' | 'role' | 'style'> {
  /** Content rendered by the native text element. */
  children?: ReactNode;

  /** Typography role used for the default token-backed appearance. */
  role?: TextRole;

  /** NativeWind utilities merged after the role recipe. */
  className?: string;

  /** Native text styles applied after token defaults. */
  style?: StyleProp<TextStyle>;
}
