import { createRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text as NativeText,
  View,
} from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { colors, spacing } from '../../core/tokens';
import { Button } from './Button';

describe('Button', () => {
  it.each([
    ['primary', { backgroundColor: colors.primary }],
    ['secondary', { backgroundColor: colors.surface }],
    ['ghost', { borderWidth: 0 }],
    ['destructive', { backgroundColor: colors.danger }],
  ] as const)('applies the %s variant', (variant, expectedStyle) => {
    render(<Button variant={variant}>Save</Button>);

    expect(
      StyleSheet.flatten(screen.getByRole('button').props.style)
    ).toMatchObject(expectedStyle);
  });

  it.each([
    ['sm', spacing[3], spacing[1]],
    ['md', spacing[4], spacing[2]],
    ['lg', spacing[6], spacing[3]],
  ] as const)(
    'applies the %s size',
    (size, paddingHorizontal, paddingVertical) => {
      render(<Button size={size}>Save</Button>);

      expect(
        StyleSheet.flatten(screen.getByRole('button').props.style)
      ).toMatchObject({ paddingHorizontal, paddingVertical });
    }
  );

  it('renders and handles presses on the default path', () => {
    const onPress = jest.fn();

    render(<Button onPress={onPress}>Save</Button>);
    fireEvent.press(screen.getByRole('button'));

    expect(screen.getByText('Save')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a leading icon before the label', () => {
    render(
      <Button leadingIcon={<NativeText>+</NativeText>}>Create</Button>
    );

    expect(screen.getByText('+')).toBeTruthy();
    expect(screen.getByText('Create')).toBeTruthy();
  });

  it('marks a loading button busy and prevents presses', () => {
    const onPress = jest.fn();

    render(
      <Button
        isLoading
        onPress={onPress}
      >
        Save
      </Button>
    );
    const button = screen.getByRole('button');
    fireEvent.press(button);

    expect(button.props.accessibilityState).toMatchObject({
      busy: true,
      disabled: true,
    });
    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('marks a disabled button disabled and prevents presses', () => {
    const onPress = jest.fn();

    render(
      <Button
        isDisabled
        onPress={onPress}
      >
        Save
      </Button>
    );
    const button = screen.getByRole('button');
    fireEvent.press(button);

    expect(button.props.accessibilityState).toMatchObject({
      busy: false,
      disabled: true,
    });
    expect(onPress).not.toHaveBeenCalled();
  });

  it('lets consumer className and style override recipe defaults', () => {
    render(
      <Button
        className="bg-danger px-8"
        style={{ backgroundColor: colors.warning, paddingHorizontal: 40 }}
      >
        Override
      </Button>
    );

    const button = screen.getByRole('button');
    const className = button.props.className as string;
    expect(className).toContain('bg-danger');
    expect(className).toContain('px-8');
    expect(className).not.toContain('bg-primary');
    expect(className).not.toContain('px-4');
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: colors.warning,
      paddingHorizontal: 40,
    });
  });

  it('forwards its ref to the native pressable element', () => {
    const ref = createRef<View>();

    render(<Button ref={ref}>Referenced</Button>);

    expect(ref.current).toBeTruthy();
  });
});
