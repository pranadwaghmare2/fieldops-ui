import type { ReactNode } from 'react';
import type {
  AccessibilityState,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import type {
  ButtonSize,
  ButtonVariant,
} from '../../core/styles/button';

/**
 * Props for the token-driven {@link Button} component.
 */
export interface ButtonProps
  extends Omit<
    PressableProps,
    | 'accessibilityRole'
    | 'accessibilityState'
    | 'children'
    | 'disabled'
    | 'onPress'
    | 'style'
  > {
  /** Label rendered inside the button. */
  children?: ReactNode;

  /** Surface treatment used by the button. */
  variant?: ButtonVariant;

  /** Padding scale used by the button. */
  size?: ButtonSize;

  /** Whether to show a progress indicator and prevent interaction. */
  isLoading?: boolean;

  /** Whether to prevent interaction. */
  isDisabled?: boolean;

  /** Optional content rendered before the label when not loading. */
  leadingIcon?: ReactNode;

  /** Called when the enabled button is pressed. */
  onPress?: PressableProps['onPress'];

  /** Native accessibility state merged with disabled and busy state. */
  accessibilityState?: AccessibilityState;

  /** NativeWind utilities merged after the variant and size recipe. */
  className?: string;

  /** Native view styles applied after token defaults. */
  style?: StyleProp<ViewStyle>;
}
