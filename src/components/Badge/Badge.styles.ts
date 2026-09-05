import type { StyleProp, TextStyle } from 'react-native';

import { resolveDualStyles } from '../../core/integrations/styling';
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
