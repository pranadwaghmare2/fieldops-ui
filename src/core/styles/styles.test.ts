import { badgeRecipe } from './badge';
import { buttonLabelRecipe, buttonRecipe } from './button';
import { fieldMessageRecipe, fieldRecipe } from './field';
import { selectRecipe } from './select';
import { textRecipe } from './text';

describe('core style recipes', () => {
  it('builds text roles from typography and colour tokens', () => {
    expect(textRecipe('title')).toMatchObject({
      className: 'text-[22px] font-semibold text-fg',
      style: { fontSize: 22, fontWeight: '600', color: '#111827' },
    });
    expect(textRecipe('caption').style.color).toBe('#6B7280');
  });

  it('builds button variants and sizes from shared tokens', () => {
    expect(buttonRecipe('primary', 'md')).toMatchObject({
      style: {
        backgroundColor: '#1D4ED8',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
    });
    expect(buttonLabelRecipe('destructive').style.color).toBe('#FFFFFF');
  });

  it('builds field and select error chrome without shadows', () => {
    expect(fieldRecipe(true).style).toMatchObject({
      borderColor: '#DC2626',
      borderRadius: 10,
      borderWidth: 1,
    });
    expect(fieldMessageRecipe(true).style.color).toBe('#DC2626');
    expect(selectRecipe(false).style).toMatchObject({
      borderColor: '#E3E6EA',
      borderRadius: 10,
      borderWidth: 1,
    });
    expect(fieldRecipe(false).style).not.toHaveProperty('shadowColor');
  });

  it('maps badge status to the canonical status tone', () => {
    expect(badgeRecipe('blocked')).toMatchObject({
      className: expect.stringContaining('text-warning'),
      style: {
        borderColor: '#D97706',
        color: '#D97706',
      },
    });
  });
});
