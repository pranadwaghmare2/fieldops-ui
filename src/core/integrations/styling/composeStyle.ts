import {
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

type AnyStyle = ViewStyle | TextStyle;

/**
 * Flattens token StyleSheet defaults with consumer overrides (last-wins).
 * Components may still pass `[base, style]` to RN primitives; this port
 * centralizes merge for tests and shared call sites.
 */
export function composeStyle(
  ...styles: Array<StyleProp<AnyStyle> | undefined>
): StyleProp<AnyStyle> {
  return StyleSheet.flatten(styles.filter(Boolean) as StyleProp<AnyStyle>[]);
}
