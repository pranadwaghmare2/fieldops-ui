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
  backdrop: {
    className: string;
    style: StyleProp<ViewStyle>;
  };
  backdropDismiss: {
    style: StyleProp<ViewStyle>;
  };
  sheet: {
    className: string;
    style: StyleProp<ViewStyle>;
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
 * Applies the Select trigger recipe and modal list styles through both paths.
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
    backdrop: {
      className: 'flex-1 justify-center px-4',
      style: {
        backgroundColor: `${colors.fg}66`,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: spacing[4],
      },
    },
    backdropDismiss: {
      style: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
    },
    sheet: {
      className: 'max-h-64 overflow-hidden rounded-md border border-border bg-bg',
      style: {
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        maxHeight: spacing[8] * 8,
        overflow: 'hidden',
      },
    },
    list: {
      className: 'max-h-64 bg-bg',
      style: {
        backgroundColor: colors.bg,
        maxHeight: spacing[8] * 8,
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
