import { forwardRef } from 'react';
import {
  Text as NativeText,
  TextInput,
  View,
} from 'react-native';

import { colors } from '../../core/tokens';
import { getTextFieldStyles } from './TextField.styles';
import type { TextFieldProps } from './TextField.types';

/**
 * Renders a controlled, token-backed text input with validation messaging.
 *
 * Consumer `className` and `style` values override the field chrome, while
 * `inputClassName` and `inputStyle` override the native text input.
 *
 * @remarks
 * `endAdornment` is the composable escape hatch for controls such as password
 * visibility toggles or unit labels. It remains visible without replacing
 * helper or error messaging. The ref forwards to the native `TextInput`.
 *
 * @example
 * ```tsx
 * <TextField
 *   label="Email"
 *   value={email}
 *   onChangeText={setEmail}
 *   placeholder="name@example.com"
 * />
 * ```
 */
export const TextField = forwardRef<TextInput, TextFieldProps>(
  function TextField(
    {
      accessibilityHint,
      accessibilityLabel,
      accessibilityState,
      className,
      endAdornment,
      errorMessage,
      helperText,
      inputClassName,
      inputStyle,
      label,
      onChangeText,
      placeholder,
      style,
      value,
      ...props
    },
    ref
  ) {
    const hasError = Boolean(errorMessage);
    const message = errorMessage ?? helperText;
    const styles = getTextFieldStyles(
      hasError,
      className,
      style,
      inputClassName,
      inputStyle
    );

    return (
      <View>
        <NativeText {...styles.label}>{label}</NativeText>
        <View {...styles.container}>
          <TextInput
            {...props}
            {...styles.input}
            accessibilityHint={
              errorMessage ?? accessibilityHint
            }
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityState={{
              ...accessibilityState,
              ...(hasError ? { invalid: true } : {}),
            }}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.fgMuted}
            ref={ref}
            value={value}
          />
          {endAdornment}
        </View>
        {message ? (
          <NativeText
            {...styles.message}
            accessibilityLiveRegion={hasError ? 'polite' : 'none'}
          >
            {message}
          </NativeText>
        ) : null}
      </View>
    );
  }
);
