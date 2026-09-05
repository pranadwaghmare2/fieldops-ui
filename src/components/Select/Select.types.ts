import type {
  AccessibilityState,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

/**
 * One labelled value presented by {@link Select}.
 */
export interface SelectOption<T> {
  /** Human-readable option label. */
  label: string;

  /** Consumer-owned value returned when this option is selected. */
  value: T;
}

/**
 * Props for the generic, single-value {@link Select} component.
 */
export interface SelectProps<T>
  extends Omit<
    PressableProps,
    | 'accessibilityRole'
    | 'accessibilityState'
    | 'children'
    | 'onPress'
    | 'style'
  > {
  /** Options available for selection. */
  options: readonly SelectOption<T>[];

  /** Currently selected value. */
  value: T;

  /** Called with an option value after the option is pressed. */
  onValueChange: (value: T) => void;

  /** Validation message shown below the trigger. */
  errorMessage?: string;

  /** Native accessibility state merged with the trigger's expanded state. */
  accessibilityState?: AccessibilityState;

  /** NativeWind utilities merged after the trigger recipe. */
  className?: string;

  /** Native view styles applied after token trigger defaults. */
  style?: StyleProp<ViewStyle>;
}
