import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import {
  composeClassName,
  composeStyle,
} from '../../core/integrations/styling';
import {
  fieldMessageRecipe,
  fieldRecipe,
} from '../../core/styles/field';
import { textRecipe } from '../../core/styles/text';
import { spacing } from '../../core/tokens';

interface TextFieldStyles {
  container: {
    className: string;
    style: StyleProp<ViewStyle>;
  };
  input: {
    className: string;
    style: StyleProp<TextStyle>;
  };
  label: {
    className: string;
    style: StyleProp<TextStyle>;
  };
  message: {
    className: string;
    style: StyleProp<TextStyle>;
  };
}

/**
 * Applies field, typography, and message recipes through both styling paths.
 */
export function getTextFieldStyles(
  hasError: boolean,
  className?: string,
  style?: StyleProp<ViewStyle>,
  inputClassName?: string,
  inputStyle?: StyleProp<TextStyle>
): TextFieldStyles {
  const container = fieldRecipe(hasError);
  const input = textRecipe('body');
  const label = textRecipe('label');
  const message = fieldMessageRecipe(hasError);

  return {
    container: {
      className: composeClassName(
        container.className,
        'flex-row items-center',
        className
      ),
      style: composeStyle(
        container.style,
        { alignItems: 'center', flexDirection: 'row' },
        style
      ) as StyleProp<ViewStyle>,
    },
    input: {
      className: composeClassName(input.className, 'flex-1 p-0', inputClassName),
      style: composeStyle(
        input.style,
        { flex: 1, padding: 0 },
        inputStyle
      ) as StyleProp<TextStyle>,
    },
    label: {
      className: composeClassName(label.className, 'mb-1'),
      style: composeStyle(label.style, {
        marginBottom: spacing[1],
      }) as StyleProp<TextStyle>,
    },
    message: {
      className: composeClassName(message.className, 'mt-1'),
      style: composeStyle(message.style, {
        marginTop: spacing[1],
      }) as StyleProp<TextStyle>,
    },
  };
}
