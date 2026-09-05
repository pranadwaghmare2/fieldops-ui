import { createRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { colors } from '../../src/core/tokens';
import { Select } from '../../src/components/Select';

const options = [
  { label: 'Open', value: 'open' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
] as const;

describe('Select', () => {
  it('selects an option and closes the list', () => {
    const onValueChange = jest.fn();

    render(
      <Select
        accessibilityLabel="Status"
        onValueChange={onValueChange}
        options={options}
        value="open"
      />
    );

    fireEvent.press(screen.getByRole('button', { name: 'Status' }));
    fireEvent.press(screen.getByRole('button', { name: 'Done' }));

    expect(onValueChange).toHaveBeenCalledWith('done');
    expect(screen.queryByTestId('select-options-list')).toBeNull();
  });

  it('renders options with a FlatList', () => {
    render(
      <Select
        accessibilityLabel="Status"
        onValueChange={jest.fn()}
        options={Array.from({ length: 100 }, (_, value) => ({
          label: `Option ${value}`,
          value,
        }))}
        value={0}
      />
    );

    fireEvent.press(screen.getByRole('button', { name: 'Status' }));

    expect(screen.getByTestId('select-options-list')).toBeTruthy();
    expect(screen.UNSAFE_getByType(FlatList)).toBeTruthy();
  });

  it('exposes and displays its error state', () => {
    render(
      <Select
        accessibilityLabel="Status"
        errorMessage="Choose a status"
        onValueChange={jest.fn()}
        options={options}
        value="open"
      />
    );

    // Pressable on RN floor A strips unknown AccessibilityState keys such as
    // `invalid`; error is still announced via hint + visible message (parity
    // with TextField's TextInput path where `invalid` is retained).
    expect(
      screen.getByRole('button', { name: 'Status' }).props.accessibilityHint
    ).toBe('Choose a status');
    expect(screen.getByText('Choose a status')).toBeTruthy();
  });

  it('renders the selected option on the default path', () => {
    render(
      <Select
        accessibilityLabel="Status"
        onValueChange={jest.fn()}
        options={options}
        value="in_progress"
      />
    );

    expect(screen.getByText('In progress')).toBeTruthy();
  });

  it('lets consumer className and style override trigger defaults', () => {
    render(
      <Select
        accessibilityLabel="Status"
        className="bg-danger px-8"
        onValueChange={jest.fn()}
        options={options}
        style={{ backgroundColor: colors.warning, paddingHorizontal: 40 }}
        value="open"
      />
    );

    const trigger = screen.getByRole('button', { name: 'Status' });
    const className = trigger.props.className as string;
    expect(className).toContain('bg-danger');
    expect(className).toContain('px-8');
    expect(className).not.toContain('bg-bg');
    expect(className).not.toContain('px-3');
    expect(StyleSheet.flatten(trigger.props.style)).toMatchObject({
      backgroundColor: colors.warning,
      paddingHorizontal: 40,
    });
  });

  it('forwards its ref to the trigger', () => {
    const ref = createRef<View>();

    render(
      <Select
        accessibilityLabel="Status"
        onValueChange={jest.fn()}
        options={options}
        ref={ref}
        value="open"
      />
    );

    expect(ref.current).toBeTruthy();
  });
});
