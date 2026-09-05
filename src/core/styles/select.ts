import type { ViewStyle } from 'react-native';

import { colors, radius, spacing } from '../tokens';

/**
 * Produces Select trigger chrome with the same token contract as other fields.
 */
export function selectRecipe(
  hasError: boolean
): { className: string; style: ViewStyle } {
  return {
    className: `flex-row items-center justify-between rounded-md border bg-bg px-3 py-2 ${
      hasError ? 'border-danger' : 'border-border'
    }`,
    style: {
      alignItems: 'center',
      backgroundColor: colors.bg,
      borderColor: hasError ? colors.danger : colors.border,
      borderRadius: radius.md,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
    },
  };
}
