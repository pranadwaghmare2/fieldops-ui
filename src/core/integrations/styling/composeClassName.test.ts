import { composeClassName } from './composeClassName';

describe('composeClassName', () => {
  it('lets consumer utility win conflicting group', () => {
    expect(composeClassName('bg-primary', 'bg-danger')).toContain('bg-danger');
    expect(composeClassName('bg-primary', 'bg-danger')).not.toMatch(/bg-primary/);
  });

  it('drops falsy inputs via clsx', () => {
    expect(composeClassName('p-4', false, undefined, null, 'text-fg')).toBe(
      'p-4 text-fg'
    );
  });
});
