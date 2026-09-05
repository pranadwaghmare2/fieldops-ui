import { StyleSheet } from 'react-native';

import { resolveDualStyles } from '../../../../src/core/integrations/styling/resolveDualStyles';

describe('resolveDualStyles', () => {
  it('keeps StyleSheet defaults when consumer omits className', () => {
    const resolved = resolveDualStyles({
      defaultClassName: 'bg-primary',
      defaultStyle: { backgroundColor: '#1D4ED8' },
      style: { paddingHorizontal: 40 },
    });

    expect(resolved.className).toContain('bg-primary');
    expect(StyleSheet.flatten(resolved.style)).toMatchObject({
      backgroundColor: '#1D4ED8',
      paddingHorizontal: 40,
    });
  });

  it('skips StyleSheet defaults when consumer passes className', () => {
    const resolved = resolveDualStyles({
      defaultClassName: 'bg-primary',
      defaultStyle: { backgroundColor: '#1D4ED8' },
      className: 'bg-danger',
      style: { paddingHorizontal: 40 },
    });

    expect(resolved.className).toContain('bg-danger');
    expect(resolved.className).not.toMatch(/bg-primary/);
    expect(StyleSheet.flatten(resolved.style)).toMatchObject({
      paddingHorizontal: 40,
    });
    expect(StyleSheet.flatten(resolved.style).backgroundColor).toBeUndefined();
  });
});
