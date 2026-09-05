import { createRef } from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { colors, typography } from '../../src/core/tokens';
import { Text } from '../../src/components/Text';

describe('Text', () => {
  it('renders children with the body role by default', () => {
    render(<Text>Hello</Text>);

    const text = screen.getByText('Hello');
    expect(text).toBeTruthy();
    expect(text.props.className).toContain('text-[15px]');
    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      color: colors.fg,
      fontSize: typography.body.fontSize,
      fontWeight: typography.body.fontWeight,
    });
  });

  it('applies the requested typography role', () => {
    render(<Text role="caption">Details</Text>);

    const text = screen.getByText('Details');
    expect(text.props.className).toContain('text-[12px]');
    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      color: colors.fgMuted,
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
    });
  });

  it('lets consumer className utilities override recipe conflicts', () => {
    render(<Text className="text-[20px] text-danger">Alert</Text>);

    const className = screen.getByText('Alert').props.className as string;
    expect(className).toContain('text-[20px]');
    expect(className).toContain('text-danger');
    expect(className).not.toContain('text-[15px]');
    expect(className).not.toMatch(/\btext-fg\b/);
  });

  it('lets consumer style override recipe defaults', () => {
    render(<Text style={{ color: colors.danger, fontSize: 20 }}>Alert</Text>);

    expect(StyleSheet.flatten(screen.getByText('Alert').props.style)).toMatchObject({
      color: colors.danger,
      fontSize: 20,
    });
  });

  it('forwards its ref to the native Text', () => {
    const ref = createRef<NativeText>();

    render(<Text ref={ref}>Referenced</Text>);

    expect(ref.current).toBeTruthy();
  });
});
