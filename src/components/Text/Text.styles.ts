import type { StyleProp, TextStyle } from 'react-native';

import {
  composeClassName,
  composeStyle,
} from '../../core/integrations/styling';
import { textRecipe, type TextRole } from '../../core/styles/text';

/**
 * Applies one typography recipe through both supported styling paths.
 */
export function getTextStyles(
  role: TextRole,
  className?: string,
  style?: StyleProp<TextStyle>
): { className: string; style: StyleProp<TextStyle> } {
  const recipe = textRecipe(role);

  return {
    className: composeClassName(recipe.className, className),
    style: composeStyle(recipe.style, style) as StyleProp<TextStyle>,
  };
}
