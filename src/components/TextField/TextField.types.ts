import type { ReactNode } from 'react';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

/**
 * Props for the controlled, token-driven {@link TextField} component.
 */
export interface TextFieldProps
  extends Omit<
    TextInputProps,
    'onChangeText' | 'placeholder' | 'style' | 'value'
  > {
  /** Visible label and default accessibility label for the input. */
  label: string;

  /** Placeholder displayed while the controlled value is empty. */
  placeholder?: string;

  /** Supporting text displayed below the field when there is no error. */
  helperText?: string;

  /** Validation message displayed accessibly in place of helper text. */
  errorMessage?: string;

  /** Controlled text value. */
  value: string;

  /** Called with the next controlled text value. */
  onChangeText: NonNullable<TextInputProps['onChangeText']>;

  /** Optional content rendered at the trailing edge of the input chrome. */
  endAdornment?: ReactNode;

  /** NativeWind utilities merged after the field chrome recipe. */
  className?: string;

  /** Native view styles applied after field chrome defaults. */
  style?: StyleProp<ViewStyle>;

  /** NativeWind utilities merged after the input text recipe. */
  inputClassName?: string;

  /** Native text input styles applied after input defaults. */
  inputStyle?: StyleProp<TextStyle>;
}
