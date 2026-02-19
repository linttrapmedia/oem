import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type IconButtonVariant = 'solid' | 'outline' | 'ghost';
type IconButtonSize = 'sm' | 'md' | 'lg';
type ColorToken = keyof DesignTokens['colors'];

const sizeConfig: Record<IconButtonSize, { size: string; iconSize: string }> = {
  sm: { size: '32px', iconSize: '16px' },
  md: { size: '40px', iconSize: '20px' },
  lg: { size: '48px', iconSize: '24px' },
};

export const iconButton = {
  create: (...children: Child[]) => {
    const el = document.createElement('button');

    tag.$(el)(
      trait.style('display', 'inline-flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('padding', '0'),
      trait.style('transition', 'all 0.2s ease-in-out'),
      trait.style('outline', 'none'),
      trait.style('border', 'none'),
      trait.style('userSelect', 'none'),
      trait.style('flexShrink', '0'),
      trait.style('cursor', 'pointer'),
      trait.attr('type', 'button'),
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

  variant: (variant: IconButtonVariant, color: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      // Variant: solid
      trait.style('backgroundColor', theme.$token('colors', color), $test(variant === 'solid')),
      trait.style('color', theme.$token('colors', 'textInverse'), $test(variant === 'solid')),

      // Variant: outline
      trait.style('backgroundColor', 'transparent', $test(variant === 'outline')),
      trait.style('color', theme.$token('colors', color), $test(variant === 'outline')),
      trait.style(
        'border',
        `1px solid ${theme.$token('colors', color)}`,
        $test(variant === 'outline'),
      ),

      // Variant: ghost
      trait.style('backgroundColor', 'transparent', $test(variant === 'ghost')),
      trait.style('color', theme.$token('colors', color), $test(variant === 'ghost')),

      // Hover state - solid
      trait.style_on_event(
        'mouseenter',
        'backgroundColor',
        theme.$token('colors', `${color}Hover` as ColorToken),
        $test(variant === 'solid'),
      ),
      trait.style_on_event(
        'mouseleave',
        'backgroundColor',
        theme.$token('colors', color),
        $test(variant === 'solid'),
      ),

      // Hover state - outline/ghost
      trait.style_on_event(
        'mouseenter',
        'backgroundColor',
        theme.$token('colors', 'bgHover'),
        $test(variant === 'outline' || variant === 'ghost'),
      ),
      trait.style_on_event(
        'mouseleave',
        'backgroundColor',
        'transparent',
        $test(variant === 'outline' || variant === 'ghost'),
      ),

      // Scale on hover
      trait.style_on_event('mouseenter', 'transform', 'scale(1.05)'),
      trait.style_on_event('mouseleave', 'transform', 'scale(1)'),

      // Active state - solid
      trait.style_on_event(
        'mousedown',
        'backgroundColor',
        theme.$token('colors', `${color}Active` as ColorToken),
        $test(variant === 'solid'),
      ),
      trait.style_on_event(
        'mouseup',
        'backgroundColor',
        theme.$token('colors', `${color}Hover` as ColorToken),
        $test(variant === 'solid'),
      ),

      // Active state - outline/ghost
      trait.style_on_event(
        'mousedown',
        'backgroundColor',
        theme.$token('colors', 'bgActive'),
        $test(variant === 'outline' || variant === 'ghost'),
      ),
      trait.style_on_event(
        'mouseup',
        'backgroundColor',
        theme.$token('colors', 'bgHover'),
        $test(variant === 'outline' || variant === 'ghost'),
      ),

      // Scale on active
      trait.style_on_event('mousedown', 'transform', 'scale(0.95)'),
      trait.style_on_event('mouseup', 'transform', 'scale(1.05)'),

      // Focus state
      trait.style_on_event('focus', 'boxShadow', theme.$token('shadows', 'shadowFocus')),
    );
  },

  size: (size: IconButtonSize) => (el: HTMLElement | SVGElement) => {
    const config = sizeConfig[size];

    tag.$(el)(trait.style('width', config.size), trait.style('height', config.size));
  },

  rounded: (isRounded: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('borderRadius', '50%', $test(isRounded)),
      trait.style('borderRadius', theme.$token('borders', 'borderRadiusButton'), $test(!isRounded)),
    );
  },

  disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('cursor', 'pointer', $test(!disabled)),
      trait.style('opacity', '0.6', $test(disabled)),
      trait.style('pointerEvents', 'none', $test(disabled)),
      trait.attr('disabled', 'true', $test(disabled)),
    );
  },

  ariaLabel: (label: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('aria-label', label));
  },

  onClick: (handler: (e: any) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.event('click', handler));
  },
};
