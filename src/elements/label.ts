import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type LabelSize = 'sm' | 'md' | 'lg';
type LabelColor = keyof DesignTokens['colors'];

type LabelProps = {
  content: string;
  htmlFor?: string;
  size?: LabelSize;
  color?: LabelColor;
  required?: boolean;
  disabled?: boolean;
  children?: HTMLElement[];
};

type TypographyToken = keyof DesignTokens['typography'];

const sizeConfig: Record<LabelSize, { fontSize: TypographyToken; fontWeight: TypographyToken }> = {
  sm: { fontSize: 'fontSizeSm', fontWeight: 'fontWeightNormal' },
  md: { fontSize: 'fontSizeBase', fontWeight: 'fontWeightMedium' },
  lg: { fontSize: 'fontSizeLg', fontWeight: 'fontWeightMedium' },
};

export const label = (props: LabelProps) => {
  const {
    content,
    htmlFor,
    size = 'md',
    color = 'textPrimary',
    required = false,
    disabled = false,
    children = [],
  } = props;

  const config = sizeConfig[size];

  const element = tag.label(
    // Base styles
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', theme.$token('typography', config.fontSize)),
    trait.style('fontWeight', theme.$token('typography', config.fontWeight)),
    trait.style('lineHeight', theme.$token('typography', 'lineHeightNormal')),
    trait.style('display', 'inline-block'),
    trait.style('marginBottom', theme.$token('spacing', 'xs')),

    // Color
    trait.style('color', theme.$token('colors', color), $test(!disabled)),
    trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),

    // Cursor
    trait.style('cursor', 'pointer', $test(!disabled && htmlFor !== undefined)),
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('cursor', 'default', $test(!disabled && htmlFor === undefined)),

    // Disabled state
    trait.style('opacity', '0.6', $test(disabled)),

    // Attributes
    trait.attr('for', htmlFor!, $test(htmlFor !== undefined)),

    // Content
    trait.text(content),

    // Required indicator
    required
      ? tag.span(
          trait.style('color', theme.$token('colors', 'error')),
          trait.style('marginLeft', theme.$token('spacing', 'xs')),
          trait.text('*'),
        )
      : null,

    // Children
    ...children.filter(Boolean),
  );

  return element;
};
