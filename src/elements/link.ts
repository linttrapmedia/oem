import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type LinkVariant = 'default' | 'subtle' | 'unstyled';
type ColorToken = keyof DesignTokens['colors'];

export const link = {
  create: (...children: Child[]) => {
    const el = document.createElement('a');

    tag.$(el)(
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('fontSize', 'inherit'),
      trait.style('lineHeight', 'inherit'),
      trait.style('transition', 'all 0.2s ease-in-out'),
      trait.style('cursor', 'pointer'),
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

  variant: (variant: LinkVariant) => (el: HTMLElement | SVGElement) => {
    const colorMap: Record<LinkVariant, ColorToken> = {
      default: 'primary',
      subtle: 'textSecondary',
      unstyled: 'textPrimary',
    };

    const hoverColorMap: Record<LinkVariant, ColorToken> = {
      default: 'primaryHover',
      subtle: 'textPrimary',
      unstyled: 'textPrimary',
    };

    const color = colorMap[variant];
    const hoverColor = hoverColorMap[variant];

    tag.$(el)(
      trait.style('color', theme.$token('colors', color)),

      trait.style_on_event('mouseenter', 'color', theme.$token('colors', hoverColor)),
      trait.style_on_event(
        'mouseenter',
        'textDecoration',
        'underline',
        $test(variant !== 'unstyled'),
      ),

      trait.style_on_event('mouseleave', 'color', theme.$token('colors', color)),
    );
  },

  color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('color', theme.$token('colors', color)));
  },

  underline: (underline: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('textDecoration', 'underline', $test(underline)),
      trait.style('textDecoration', 'none', $test(!underline)),
    );
  },

  href: (href: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('href', href));
  },

  external: (external: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.attr('target', '_blank', $test(external)),
      trait.attr('rel', 'noopener noreferrer', $test(external)),
    );
  },

  disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('opacity', '0.6', $test(disabled)),
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('pointerEvents', 'none', $test(disabled)),
      trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),
    );
  },

  text: (text: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.text(text));
  },

  onClick: (handler: (e: any) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.event('click', handler));
  },
};
