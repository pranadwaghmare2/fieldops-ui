import type {
  ColorValue,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { resolveDualStyles } from '../../core/integrations/styling';
import {
  buttonLabelRecipe,
  buttonRecipe,
  type ButtonSize,
  type ButtonVariant,
} from '../../core/styles/button';

interface ButtonStyles {
  container: {
    className: string;
    style: StyleProp<ViewStyle>;
  };
  label: {
    className: string;
    style: StyleProp<TextStyle>;
  };
  indicatorColor?: ColorValue;
}

/**
 * Applies the selected button recipes through both supported styling paths.
 */
export function getButtonStyles(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
  style?: StyleProp<ViewStyle>
): ButtonStyles {
  const containerRecipe = buttonRecipe(variant, size);
  const labelRecipe = buttonLabelRecipe(variant);
  const container = resolveDualStyles({
    defaultClassName: containerRecipe.className,
    defaultStyle: containerRecipe.style,
    className,
    style,
  });

  return {
    container: {
      className: container.className,
      style: container.style as StyleProp<ViewStyle>,
    },
    label: {
      className: labelRecipe.className,
      style: labelRecipe.style,
    },
    indicatorColor: labelRecipe.style.color,
  };
}
