export const colors = {
  bg: '#FFFFFF',
  surface: '#F6F7F9',
  border: '#E3E6EA',
  fg: '#111827',
  fgMuted: '#6B7280',
  primary: '#1D4ED8',
  primaryFg: '#FFFFFF',
  danger: '#DC2626',
  warning: '#D97706',
  success: '#15803D',
} as const;

export const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32 } as const;

export const radius = { md: 10 } as const;

export const typography = {
  title: { fontSize: 22, fontWeight: '600' as const },
  heading: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '500' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
} as const;

export type StatusKey = 'open' | 'in_progress' | 'blocked' | 'done';

export const statusTone: Record<StatusKey, keyof typeof colors> = {
  open: 'fgMuted',
  in_progress: 'primary',
  blocked: 'warning',
  done: 'success',
};
