import type { TextStyle, ViewStyle } from 'react-native';

import { colors, radius, spacing } from '../tokens';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'border border-primary bg-primary',
  secondary: 'border border-border bg-surface',
  ghost: 'border-0 bg-transparent',
  destructive: 'border border-danger bg-danger',
};

const variantStyle: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  ghost: {
    borderWidth: 0,
  },
  destructive: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
    borderWidth: 1,
  },
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const sizeStyle: Record<ButtonSize, ViewStyle> = {
  sm: { paddingHorizontal: spacing[3], paddingVertical: spacing[1] },
  md: { paddingHorizontal: spacing[4], paddingVertical: spacing[2] },
  lg: { paddingHorizontal: spacing[6], paddingVertical: spacing[3] },
};

/**
 * Produces button container styles without coupling components to a style engine.
 * Variant and size maps are combined here so both style paths stay in sync.
 */
export function buttonRecipe(
  variant: ButtonVariant,
  size: ButtonSize
): { className: string; style: ViewStyle } {
  return {
    className: `flex-row items-center justify-center rounded-md ${variantClass[variant]} ${sizeClass[size]}`,
    style: {
      alignItems: 'center',
      borderRadius: radius.md,
      flexDirection: 'row',
      justifyContent: 'center',
      ...variantStyle[variant],
      ...sizeStyle[size],
    },
  };
}

/**
 * Supplies the label colour paired with each button surface.
 */
export function buttonLabelRecipe(
  variant: ButtonVariant
): { className: string; style: TextStyle } {
  const isFilled = variant === 'primary' || variant === 'destructive';

  return {
    className: isFilled ? 'text-primary-fg' : 'text-fg',
    style: { color: isFilled ? colors.primaryFg : colors.fg },
  };
}
