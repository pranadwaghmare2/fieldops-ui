import { StyleSheet } from 'react-native';
import { composeStyle } from '../../../../src/core/integrations/styling/composeStyle';

describe('composeStyle', () => {
  it('appends consumer style last', () => {
    const base = { backgroundColor: '#1D4ED8' };
    const override = { backgroundColor: '#DC2626' };
    const merged = StyleSheet.flatten(composeStyle(base, override));
    expect(merged.backgroundColor).toBe('#DC2626');
  });

  it('skips undefined entries', () => {
    const base = { padding: 16 };
    const merged = StyleSheet.flatten(composeStyle(base, undefined));
    expect(merged.padding).toBe(16);
  });
});
