import { createRef } from 'react';
import {
  StyleSheet,
  Text as NativeText,
  TextInput,
  View,
} from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { colors } from '../../src/core/tokens';
import { TextField } from '../../src/components/TextField';

function getFieldChrome(container: ReturnType<typeof render>) {
  return container.UNSAFE_getAllByType(View).find((node) => {
    const className = node.props.className as string | undefined;
    return className?.includes('rounded-md') && className?.includes('border');
  });
}

describe('TextField', () => {
  it('reports controlled text changes', () => {
    const onChangeText = jest.fn();

    render(
      <TextField
        label="Email"
        onChangeText={onChangeText}
        placeholder="name@example.com"
        value=""
      />
    );

    fireEvent.changeText(screen.getByLabelText('Email'), 'dev@example.com');

    expect(onChangeText).toHaveBeenCalledWith('dev@example.com');
  });

  it('exposes and displays its error state', () => {
    render(
      <TextField
        errorMessage="Enter a valid email"
        label="Email"
        onChangeText={jest.fn()}
        value="invalid"
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input.props.accessibilityHint).toBe('Enter a valid email');
    expect(input.props.accessibilityState).toMatchObject({ invalid: true });
    expect(screen.getByText('Enter a valid email')).toBeTruthy();
  });

  it('merges consumer accessibilityState and marks invalid on error', () => {
    render(
      <TextField
        accessibilityState={{ disabled: true }}
        errorMessage="Required"
        label="Email"
        onChangeText={jest.fn()}
        value=""
      />
    );

    expect(screen.getByLabelText('Email').props.accessibilityState).toMatchObject({
      disabled: true,
      invalid: true,
    });
  });

  it('shows helper text when there is no error', () => {
    render(
      <TextField
        helperText="We will never share your email"
        label="Email"
        onChangeText={jest.fn()}
        value=""
      />
    );

    expect(screen.getByText('We will never share your email')).toBeTruthy();
  });

  it('replaces helper text with the error message', () => {
    render(
      <TextField
        errorMessage="Email is required"
        helperText="We will never share your email"
        label="Email"
        onChangeText={jest.fn()}
        value=""
      />
    );

    expect(screen.queryByText('We will never share your email')).toBeNull();
    expect(screen.getByText('Email is required')).toBeTruthy();
  });

  it('applies token StyleSheet defaults for error border color', () => {
    const view = render(
      <TextField
        errorMessage="Invalid"
        label="Email"
        onChangeText={jest.fn()}
        value=""
      />
    );

    const container = getFieldChrome(view);
    expect(StyleSheet.flatten(container?.props.style)).toMatchObject({
      borderColor: colors.danger,
    });
  });

  it('lets consumer className and style override field chrome defaults', () => {
    const view = render(
      <TextField
        className="bg-danger px-8"
        label="Email"
        onChangeText={jest.fn()}
        style={{ backgroundColor: colors.warning, paddingHorizontal: 40 }}
        value=""
      />
    );

    const container = getFieldChrome(view);
    const className = container?.props.className as string;
    expect(className).toContain('bg-danger');
    expect(className).toContain('px-8');
    expect(className).not.toContain('bg-bg');
    expect(className).not.toContain('px-3');
    expect(StyleSheet.flatten(container?.props.style)).toMatchObject({
      backgroundColor: colors.warning,
      paddingHorizontal: 40,
    });
  });

  it('lets consumer inputClassName and inputStyle override input defaults', () => {
    render(
      <TextField
        inputClassName="text-[20px]"
        inputStyle={{ fontSize: 20 }}
        label="Email"
        onChangeText={jest.fn()}
        value=""
      />
    );

    const input = screen.getByLabelText('Email');
    const className = input.props.className as string;
    expect(className).toContain('text-[20px]');
    expect(className).not.toContain('text-[15px]');
    expect(StyleSheet.flatten(input.props.style)).toMatchObject({
      fontSize: 20,
    });
  });

  it('renders an end adornment without hiding its error', () => {
    render(
      <TextField
        endAdornment={<NativeText>@</NativeText>}
        errorMessage="Email is required"
        label="Email"
        onChangeText={jest.fn()}
        value=""
      />
    );

    expect(screen.getByText('@')).toBeTruthy();
    expect(screen.getByText('Email is required')).toBeTruthy();
  });

  it('forwards its ref to the native text input', () => {
    const ref = createRef<TextInput>();

    render(
      <TextField
        label="Email"
        onChangeText={jest.fn()}
        ref={ref}
        value=""
      />
    );

    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.focus).toBe('function');
    expect(ref.current?.props.value).toBe('');
  });
});
