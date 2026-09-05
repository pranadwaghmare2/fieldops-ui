import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ForwardedRef,
  type ReactElement,
  type RefAttributes,
} from 'react';
import {
  FlatList,
  Pressable,
  Text as NativeText,
  View,
  type ListRenderItem,
} from 'react-native';

import { getSelectStyles } from './Select.styles';
import type { SelectOption, SelectProps } from './Select.types';

const SELECTED_STATE = { selected: true } as const;

function optionKey<T>(_option: SelectOption<T>, index: number): string {
  return String(index);
}

function SelectInner<T>(
  {
    accessibilityHint,
    accessibilityState,
    className,
    errorMessage,
    onValueChange,
    options,
    style,
    value,
    ...props
  }: SelectProps<T>,
  ref: ForwardedRef<View>
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasError = Boolean(errorMessage);
  const styles = getSelectStyles(hasError, className, style);
  const selectedOption = useMemo(
    () => options.find((option) => Object.is(option.value, value)),
    [options, value]
  );

  const renderOption = useCallback<ListRenderItem<SelectOption<T>>>(
    ({ item }) => {
      const isSelected = Object.is(item.value, value);

      return (
        <Pressable
          accessibilityLabel={item.label}
          accessibilityRole="button"
          accessibilityState={isSelected ? SELECTED_STATE : undefined}
          onPress={() => {
            onValueChange(item.value);
            setIsExpanded(false);
          }}
          {...styles.option}
        >
          <NativeText {...styles.optionLabel}>{item.label}</NativeText>
        </Pressable>
      );
    },
    [onValueChange, styles.option, styles.optionLabel, value]
  );

  return (
    <View>
      <Pressable
        {...props}
        {...styles.trigger}
        accessibilityHint={errorMessage ?? accessibilityHint}
        accessibilityRole="button"
        accessibilityState={{
          ...accessibilityState,
          expanded: isExpanded,
          // Forward-compat: TextInput keeps `invalid`; Pressable on RN ≥0.73
          // may strip unknown AccessibilityState keys — hint still carries error.
          ...(hasError ? { invalid: true as const } : {}),
        }}
        onPress={() => setIsExpanded((current) => !current)}
        ref={ref}
      >
        <NativeText {...styles.label}>
          {selectedOption?.label ?? 'Select an option'}
        </NativeText>
        <NativeText {...styles.indicator} accessibilityElementsHidden>
          {isExpanded ? '▲' : '▼'}
        </NativeText>
      </Pressable>

      {isExpanded ? (
        <FlatList
          data={options}
          extraData={value}
          keyExtractor={optionKey}
          renderItem={renderOption}
          testID="select-options-list"
          {...styles.list}
        />
      ) : null}

      {errorMessage ? (
        <NativeText
          {...styles.error}
          accessibilityLiveRegion="polite"
        >
          {errorMessage}
        </NativeText>
      ) : null}
    </View>
  );
}

/**
 * Renders a generic single-value select backed by a virtualized option list.
 *
 * Consumer `className` and `style` values override the token-backed trigger.
 *
 * @remarks
 * Pressing the trigger expands an inline `FlatList`; selecting an option calls
 * `onValueChange` and closes the list. The ref forwards to the trigger.
 *
 * @example
 * ```tsx
 * <Select
 *   accessibilityLabel="Status"
 *   options={[{ label: 'Open', value: 'open' }]}
 *   value="open"
 *   onValueChange={setStatus}
 * />
 * ```
 */
export const Select = forwardRef(SelectInner) as <T>(
  props: SelectProps<T> & RefAttributes<View>
) => ReactElement | null;
