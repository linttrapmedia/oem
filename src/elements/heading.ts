import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingColor = keyof DesignTokens['colors'];
type HeadingAlign = 'left' | 'center' | 'right';

type HeadingProps = {
  content?: string;
  level?: HeadingLevel;
  color?: HeadingColor;
  align?: HeadingAlign;
  children?: HTMLElement[];
};

type TypographyToken = keyof DesignTokens['typography'];

const levelConfig: Record<HeadingLevel, { fontSize: TypographyToken; fontWeight: TypographyToken }> = {
  1: { fontSize: 'fontSize4xl', fontWeight: 'fontWeightBold' },
  2: { fontSize: 'fontSize3xl', fontWeight: 'fontWeightBold' },
  3: { fontSize: 'fontSize2xl', fontWeight: 'fontWeightSemibold' },
  4: { fontSize: 'fontSizeXl', fontWeight: 'fontWeightSemibold' },
  5: { fontSize: 'fontSizeLg', fontWeight: 'fontWeightMedium' },
  6: { fontSize: 'fontSizeBase', fontWeight: 'fontWeightMedium' },
};

export const heading = (props: HeadingProps) => {
  const { content, level = 1, color = 'textPrimary', align = 'left', children = [] } = props;

  const config = levelConfig[level];

  const createHeading = (tagFn: any) =>
    tagFn(
      // Base styles
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('color', theme.$token('colors', color)),
      trait.style('fontSize', theme.$token('typography', config.fontSize)),
      trait.style('fontWeight', theme.$token('typography', config.fontWeight)),
      trait.style('lineHeight', theme.$token('typography', 'lineHeightTight')),
      trait.style('textAlign', align),
      trait.style('margin', '0'),

      // Content
      trait.text(content || '', $test(content !== undefined)),

      // Children
      ...children,
    );

  switch (level) {
    case 1:
      return createHeading(tag.h1);
    case 2:
      return createHeading(tag.h2);
    case 3:
      return createHeading(tag.h3);
    case 4:
      return createHeading(tag.h4);
    case 5:
      return createHeading(tag.h5);
    case 6:
      return createHeading(tag.h6);
    default:
      return createHeading(tag.h1);
  }
};
