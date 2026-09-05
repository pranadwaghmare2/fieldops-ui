import type { TextStyle } from 'react-native';

import {
  colors,
  radius,
  spacing,
  statusTone,
  typography,
  type StatusKey,
} from '../tokens';

const statusClass: Record<StatusKey, string> = {
  open: 'border-fg-muted text-fg-muted',
  in_progress: 'border-primary text-primary',
  blocked: 'border-warning text-warning',
  done: 'border-success text-success',
};

/**
 * Produces a compact, token-backed status treatment for the Badge text node.
 * A static class map keeps every utility discoverable by the host Tailwind scan.
 */
export function badgeRecipe(
  status: StatusKey
): { className: string; style: TextStyle } {
  // Status aliases resolve through the canonical token map before style output.
  const tone = colors[statusTone[status]];

  return {
    className: `self-start rounded-md border bg-surface px-2 py-1 text-[12px] font-normal ${statusClass[status]}`,
    style: {
      alignSelf: 'flex-start',
      backgroundColor: colors.surface,
      borderColor: tone,
      borderRadius: radius.md,
      borderWidth: 1,
      color: tone,
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1],
    },
  };
}
