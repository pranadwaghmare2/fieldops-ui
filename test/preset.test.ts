import fieldopsPreset, { fieldopsPreset as namedPreset } from '../src/preset';

describe('fieldopsPreset', () => {
  it('exports token-backed theme values and native-friendly screens', () => {
    expect(namedPreset).toBe(fieldopsPreset);
    expect(fieldopsPreset.theme?.extend).toMatchObject({
      colors: {
        primary: '#1D4ED8',
        'fg-muted': '#6B7280',
      },
      spacing: {
        4: '16px',
      },
      borderRadius: {
        md: '10px',
      },
      screens: {
        sm: '390px',
        md: '768px',
        lg: '1024px',
      },
    });
  });
});
