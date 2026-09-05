import { createRef } from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { colors, statusTone, type StatusKey } from '../../src/core/tokens';
import { Badge } from '../../src/components/Badge';

describe('Badge', () => {
  it.each<StatusKey>(['open', 'in_progress', 'blocked', 'done'])(
    'renders the %s status with its token tone',
    (status) => {
      render(<Badge status={status}>{status}</Badge>);

      expect(
        StyleSheet.flatten(screen.getByText(status).props.style)
      ).toMatchObject({
        borderColor: colors[statusTone[status]],
        color: colors[statusTone[status]],
      });
    }
  );

  it('lets consumer className utilities override recipe conflicts', () => {
    render(
      <Badge
        status="open"
        className="border-danger text-danger"
      >
        Blocked
      </Badge>
    );

    const className = screen.getByText('Blocked').props.className as string;
    expect(className).toContain('border-danger');
    expect(className).toContain('text-danger');
    expect(className).not.toContain('border-fg-muted');
    expect(className).not.toMatch(/\btext-fg-muted\b/);
  });

  it('lets consumer style override recipe defaults', () => {
    render(
      <Badge
        status="open"
        style={{ borderColor: colors.danger, color: colors.danger }}
      >
        Urgent
      </Badge>
    );

    expect(
      StyleSheet.flatten(screen.getByText('Urgent').props.style)
    ).toMatchObject({
      borderColor: colors.danger,
      color: colors.danger,
    });
  });

  it('forwards its ref to the native Text', () => {
    const ref = createRef<NativeText>();

    render(
      <Badge
        ref={ref}
        status="done"
      >
        Done
      </Badge>
    );

    expect(ref.current).toBeTruthy();
  });
});
