import type { StyleProp, TextStyle } from 'react-native';

import {
  composeClassName,
  composeStyle,
} from '../../core/integrations/styling';
import { badgeRecipe } from '../../core/styles/badge';
import type { StatusKey } from '../../core/tokens';

/**
 * Applies one status recipe through both supported styling paths.
 */
export function getBadgeStyles(
  status: StatusKey,
  className?: string,
  style?: StyleProp<TextStyle>
): { className: string; style: StyleProp<TextStyle> } {
  const recipe = badgeRecipe(status);

  return {
    className: composeClassName(recipe.className, className),
    style: composeStyle(recipe.style, style) as StyleProp<TextStyle>,
  };
}
