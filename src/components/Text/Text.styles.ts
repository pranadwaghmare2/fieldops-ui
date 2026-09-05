import type { StyleProp, TextStyle } from 'react-native';

import { resolveDualStyles } from '../../core/integrations/styling';
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
  const resolved = resolveDualStyles({
    defaultClassName: recipe.className,
    defaultStyle: recipe.style,
    className,
    style,
  });

  return {
    className: resolved.className,
    style: resolved.style as StyleProp<TextStyle>,
  };
}
