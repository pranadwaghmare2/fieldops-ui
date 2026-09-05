import type { TextStyle, ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../tokens';

/**
 * Produces shared input chrome with an error-state border.
 */
export function fieldRecipe(
  hasError: boolean
): { className: string; style: ViewStyle } {
  return {
    className: `rounded-md border bg-bg px-3 py-2 ${
      hasError ? 'border-danger' : 'border-border'
    }`,
    style: {
      backgroundColor: colors.bg,
      borderColor: hasError ? colors.danger : colors.border,
      borderRadius: radius.md,
      borderWidth: 1,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
    },
  };
}

/**
 * Produces helper or error text styles from the caption token.
 */
export function fieldMessageRecipe(
  hasError: boolean
): { className: string; style: TextStyle } {
  const color = hasError ? colors.danger : colors.fgMuted;

  return {
    className: `text-[12px] font-normal ${
      hasError ? 'text-danger' : 'text-fg-muted'
    }`,
    style: {
      color,
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
    },
  };
}
