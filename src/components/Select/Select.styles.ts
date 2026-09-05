import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import {
  composeClassName,
  composeStyle,
  resolveDualStyles,
} from '../../core/integrations/styling';
import { fieldMessageRecipe } from '../../core/styles/field';
import { selectRecipe } from '../../core/styles/select';
import { textRecipe } from '../../core/styles/text';
import { colors, radius, spacing } from '../../core/tokens';

interface SelectStyles {
  trigger: {
    className: string;
    style: StyleProp<ViewStyle>;
  };
  label: {
    className: string;
    style: StyleProp<TextStyle>;
  };
  indicator: {
    className: string;
    style: StyleProp<TextStyle>;
  };
  list: {
    className: string;
    style: StyleProp<ViewStyle>;
  };
  option: {
    className: string;
    style: StyleProp<ViewStyle>;
  };
  optionLabel: {
    className: string;
    style: StyleProp<TextStyle>;
  };
  error: {
    className: string;
    style: StyleProp<TextStyle>;
  };
}

/**
 * Applies the Select trigger recipe and shallow list styles through both paths.
 */
export function getSelectStyles(
  hasError: boolean,
  className?: string,
  style?: StyleProp<ViewStyle>
): SelectStyles {
  const trigger = selectRecipe(hasError);
  const label = textRecipe('body');
  const error = fieldMessageRecipe(true);
  const resolvedTrigger = resolveDualStyles({
    defaultClassName: trigger.className,
    defaultStyle: trigger.style,
    className,
    style,
  });

  return {
    trigger: {
      className: resolvedTrigger.className,
      style: resolvedTrigger.style as StyleProp<ViewStyle>,
    },
    label,
    indicator: {
      className: composeClassName(label.className, 'ml-2'),
      style: composeStyle(label.style, {
        marginLeft: spacing[2],
      }) as StyleProp<TextStyle>,
    },
    list: {
      className: 'mt-1 max-h-48 rounded-md border border-border bg-bg',
      style: {
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        marginTop: spacing[1],
        maxHeight: spacing[8] * 6,
      },
    },
    option: {
      className: 'px-3 py-2',
      style: {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
      },
    },
    optionLabel: label,
    error: {
      className: composeClassName(error.className, 'mt-1'),
      style: composeStyle(error.style, {
        marginTop: spacing[1],
      }) as StyleProp<TextStyle>,
    },
  };
}
