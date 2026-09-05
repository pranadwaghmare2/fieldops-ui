import { colors, spacing, radius, statusTone, typography } from './index';

describe('tokens', () => {
  it('matches FieldOps colour contract', () => {
    expect(colors.primary).toBe('#1D4ED8');
    expect(colors.danger).toBe('#DC2626');
    expect(statusTone.open).toBe('fgMuted');
    expect(statusTone.done).toBe('success');
  });

  it('uses 4-point spacing and radius 10', () => {
    expect(spacing[4]).toBe(16);
    expect(radius.md).toBe(10);
    expect(typography.title.fontSize).toBe(22);
  });
});
