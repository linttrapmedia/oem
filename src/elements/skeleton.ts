import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type SkeletonVariant = 'text' | 'circle' | 'rectangle';
type ColorToken = keyof DesignTokens['colors'];
type BorderRadiusToken = keyof DesignTokens['borders'];

// Ensure keyframes are injected once
const injectKeyframes = () => {
  if (!document.querySelector('#skeleton-keyframes')) {
    const style = document.createElement('style');
    style.id = 'skeleton-keyframes';
    style.textContent = `
      @keyframes skeleton-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }
};

export const skeleton = {
  create: (...children: Child[]) => {
    const el = document.createElement('div');

    tag.$(el)(
      trait.style('backgroundColor', theme.$token('colors', 'bgSecondary')),
      trait.style('position', 'relative'),
      trait.style('overflow', 'hidden'),
      trait.style('animation', 'skeleton-pulse 2s ease-in-out infinite'),
    );

    injectKeyframes();

    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  variant: (variant: SkeletonVariant) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      // Text variant
      trait.style('width', '100%', $test(variant === 'text')),
      trait.style('height', '1em', $test(variant === 'text')),
      trait.style(
        'borderRadius',
        theme.$token('borders', 'borderRadiusSm'),
        $test(variant === 'text'),
      ),

      // Circle variant
      trait.style('width', '40px', $test(variant === 'circle')),
      trait.style('height', '40px', $test(variant === 'circle')),
      trait.style('borderRadius', '50%', $test(variant === 'circle')),

      // Rectangle variant
      trait.style('width', '100px', $test(variant === 'rectangle')),
      trait.style('height', '100px', $test(variant === 'rectangle')),
      trait.style(
        'borderRadius',
        theme.$token('borders', 'borderRadiusMd'),
        $test(variant === 'rectangle'),
      ),
    );
  },

  width: (width: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('width', width));
  },

  height: (height: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('height', height));
  },

  bg: (bg: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('backgroundColor', theme.$token('colors', bg)));
  },

  borderRadius: (borderRadius: BorderRadiusToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('borderRadius', theme.$token('borders', borderRadius)));
  },

  animated: (animated: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('animation', 'skeleton-pulse 2s ease-in-out infinite', $test(animated)),
      trait.style('animation', 'none', $test(!animated)),
    );

    if (animated) {
      injectKeyframes();
    }
  },
};
