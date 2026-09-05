import { createRef } from 'react';
import { Text as NativeText, TextInput } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { TextField } from './TextField';

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
    expect(screen.getByText('Enter a valid email')).toBeTruthy();
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
  });
});
