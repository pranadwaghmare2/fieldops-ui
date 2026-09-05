import type { TextStyle } from 'react-native';

import { colors, typography } from '../tokens';

export type TextRole = keyof typeof typography;

const roleClass: Record<TextRole, string> = {
  title: 'text-[22px] font-semibold text-fg',
  heading: 'text-[17px] font-semibold text-fg',
  body: 'text-[15px] font-normal text-fg',
  label: 'text-[13px] font-medium text-fg',
  caption: 'text-[12px] font-normal text-fg-muted',
};

/**
 * Produces matching NativeWind and native styles for a typography role.
 * Keeping both outputs here gives NativeWind and non-NativeWind hosts the same defaults.
 */
export function textRecipe(
  role: TextRole
): { className: string; style: TextStyle } {
  const type = typography[role];
  const color = role === 'caption' ? colors.fgMuted : colors.fg;

  return {
    className: roleClass[role],
    style: {
      color,
      fontSize: type.fontSize,
      fontWeight: type.fontWeight,
    },
  };
}
