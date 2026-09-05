import { forwardRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text as NativeText,
  type View,
} from 'react-native';

import { getButtonStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

/**
 * Renders a token-backed pressable with variants, sizes, and progress state.
 *
 * Consumer `className` utilities and native `style` values override the
 * selected variant and size defaults.
 *
 * @remarks
 * Forwards its ref to the underlying React Native `Pressable`. Loading and
 * disabled buttons prevent interaction. Loading replaces the leading icon
 * with an activity indicator.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onPress={handleSave} isLoading={isSaving}>
 *   Save
 * </Button>
 * ```
 */
export const Button = forwardRef<View, ButtonProps>(function Button(
  {
    accessibilityState,
    children,
    className,
    isDisabled = false,
    isLoading = false,
    leadingIcon,
    onPress,
    size = 'md',
    style,
    variant = 'primary',
    ...props
  },
  ref
) {
  const isInteractionDisabled = isDisabled || isLoading;
  const buttonStyles = getButtonStyles(variant, size, className, style);

  return (
    <Pressable
      {...props}
      {...buttonStyles.container}
      accessibilityRole="button"
      accessibilityState={{
        ...accessibilityState,
        busy: isLoading,
        disabled: isInteractionDisabled,
      }}
      disabled={isInteractionDisabled}
      onPress={onPress}
      ref={ref}
    >
      {isLoading ? (
        <ActivityIndicator color={buttonStyles.indicatorColor} />
      ) : (
        leadingIcon
      )}
      <NativeText {...buttonStyles.label}>{children}</NativeText>
    </Pressable>
  );
});
