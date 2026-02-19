import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingColor = keyof DesignTokens['colors'];
type HeadingAlign = 'left' | 'center' | 'right';
type TypographyToken = keyof DesignTokens['typography'];

const levelConfig: Record<
  HeadingLevel,
  { fontSize: TypographyToken; fontWeight: TypographyToken }
> = {
  1: { fontSize: 'fontSize4xl', fontWeight: 'fontWeightBold' },
  2: { fontSize: 'fontSize3xl', fontWeight: 'fontWeightBold' },
  3: { fontSize: 'fontSize2xl', fontWeight: 'fontWeightSemibold' },
  4: { fontSize: 'fontSizeXl', fontWeight: 'fontWeightSemibold' },
  5: { fontSize: 'fontSizeLg', fontWeight: 'fontWeightMedium' },
  6: { fontSize: 'fontSizeBase', fontWeight: 'fontWeightMedium' },
};

export const heading = {
  create: (level: HeadingLevel, ...children: Child[]) => {
    const tagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    const el = document.createElement(tagName);
    const config = levelConfig[level];

    tag.$(el)(
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('color', theme.$token('colors', 'textPrimary')),
      trait.style('fontSize', theme.$token('typography', config.fontSize)),
      trait.style('fontWeight', theme.$token('typography', config.fontWeight)),
      trait.style('lineHeight', theme.$token('typography', 'lineHeightTight')),
      trait.style('margin', '0'),
      trait.style('textAlign', 'left'),
    );

    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  h1: (...children: Child[]) => heading.el(1, ...children),
  h2: (...children: Child[]) => heading.el(2, ...children),
  h3: (...children: Child[]) => heading.el(3, ...children),
  h4: (...children: Child[]) => heading.el(4, ...children),
  h5: (...children: Child[]) => heading.el(5, ...children),
  h6: (...children: Child[]) => heading.el(6, ...children),

  color: (color: HeadingColor) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('color', theme.$token('colors', color)));
  },

  align: (align: HeadingAlign) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('textAlign', align));
  },

  content: (content: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.text(content));
  },
};
