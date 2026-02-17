import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted';
type ColorToken = keyof DesignTokens['colors'];
type SpacingToken = keyof DesignTokens['spacing'];

type DividerProps = {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  color?: ColorToken;
  thickness?: string;
  spacing?: SpacingToken;
};

export const divider = (props: DividerProps) => {
  const {
    orientation = 'horizontal',
    variant = 'solid',
    color = 'borderPrimary',
    thickness = '1px',
    spacing = 'md',
  } = props;

  const element = tag.hr(
    // Base styles
    trait.style('border', 'none'),
    trait.style('margin', '0'),
    trait.style('padding', '0'),
    trait.style('backgroundColor', theme.$token('colors', color)),

    // Horizontal orientation
    trait.style('width', '100%', $test(orientation === 'horizontal')),
    trait.style('height', thickness, $test(orientation === 'horizontal')),
    trait.style('marginTop', theme.$token('spacing', spacing), $test(orientation === 'horizontal')),
    trait.style('marginBottom', theme.$token('spacing', spacing), $test(orientation === 'horizontal')),

    // Vertical orientation
    trait.style('width', thickness, $test(orientation === 'vertical')),
    trait.style('height', '100%', $test(orientation === 'vertical')),
    trait.style('marginLeft', theme.$token('spacing', spacing), $test(orientation === 'vertical')),
    trait.style('marginRight', theme.$token('spacing', spacing), $test(orientation === 'vertical')),
    trait.style('display', 'inline-block', $test(orientation === 'vertical')),

    // Variant styles using background patterns
    trait.style(
      'backgroundImage',
      () => {
        const colorValue = theme.token('colors', color);
        if (variant === 'dashed') {
          return orientation === 'horizontal'
            ? `repeating-linear-gradient(to right, ${colorValue} 0, ${colorValue} 8px, transparent 8px, transparent 16px)`
            : `repeating-linear-gradient(to bottom, ${colorValue} 0, ${colorValue} 8px, transparent 8px, transparent 16px)`;
        } else if (variant === 'dotted') {
          return orientation === 'horizontal'
            ? `repeating-linear-gradient(to right, ${colorValue} 0, ${colorValue} 2px, transparent 2px, transparent 6px)`
            : `repeating-linear-gradient(to bottom, ${colorValue} 0, ${colorValue} 2px, transparent 2px, transparent 6px)`;
        }
        return 'none';
      },
      $test(variant !== 'solid'),
      theme,
    ),
    trait.style('backgroundColor', 'transparent', $test(variant !== 'solid')),
  );

  return element;
};
