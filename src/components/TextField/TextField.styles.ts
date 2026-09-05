import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import {
  composeClassName,
  composeStyle,
  resolveDualStyles,
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
  const layout = { alignItems: 'center' as const, flexDirection: 'row' as const };

  const resolvedContainer = resolveDualStyles({
    defaultClassName: composeClassName(container.className, 'flex-row items-center'),
    defaultStyle: composeStyle(container.style, layout),
    className,
    style,
  });

  const resolvedInput = resolveDualStyles({
    defaultClassName: composeClassName(input.className, 'flex-1 p-0'),
    defaultStyle: composeStyle(input.style, { flex: 1, padding: 0 }),
    className: inputClassName,
    style: inputStyle,
  });

  return {
    container: {
      className: resolvedContainer.className,
      style: resolvedContainer.style as StyleProp<ViewStyle>,
    },
    input: {
      className: resolvedInput.className,
      style: resolvedInput.style as StyleProp<TextStyle>,
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
