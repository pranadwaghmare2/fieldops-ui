import type { Config } from 'tailwindcss';

import { colors, radius, spacing } from './core/tokens';

/**
 * Tailwind theme extension shared by NativeWind hosts.
 * Values come from the same tokens as the native style recipes.
 */
export const fieldopsPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        bg: colors.bg,
        surface: colors.surface,
        border: colors.border,
        fg: colors.fg,
        'fg-muted': colors.fgMuted,
        primary: colors.primary,
        'primary-fg': colors.primaryFg,
        danger: colors.danger,
        warning: colors.warning,
        success: colors.success,
      },
      spacing: {
        1: `${spacing[1]}px`,
        2: `${spacing[2]}px`,
        3: `${spacing[3]}px`,
        4: `${spacing[4]}px`,
        6: `${spacing[6]}px`,
        8: `${spacing[8]}px`,
      },
      borderRadius: {
        md: `${radius.md}px`,
      },
      screens: {
        sm: '390px',
        md: '768px',
        lg: '1024px',
      },
    },
  },
};

export default fieldopsPreset;
