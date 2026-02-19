import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressVariant = 'default' | 'striped';
type ColorToken = keyof DesignTokens['colors'];

const sizeConfig: Record<ProgressSize, string> = {
  sm: '4px',
  md: '8px',
  lg: '12px',
};

// Ensure keyframes are injected once
const injectKeyframes = () => {
  if (!document.querySelector('#progress-keyframes')) {
    const style = document.createElement('style');
    style.id = 'progress-keyframes';
    style.textContent = `
      @keyframes progress-stripes {
        0% { background-position: 1rem 0; }
        100% { background-position: 0 0; }
      }
    `;
    document.head.appendChild(style);
  }
};

export const progress = {
  create: (...children: Child[]) => {
    const container = document.createElement('div');

    tag.$(container)(trait.style('position', 'relative'), trait.style('width', '100%'));

    const track = document.createElement('div');
    tag.$(track)(
      trait.style('width', '100%'),
      trait.style('height', sizeConfig.md),
      trait.style('backgroundColor', theme.$token('colors', 'bgSecondary')),
      trait.style('borderRadius', theme.$token('borders', 'borderRadiusFull')),
      trait.style('overflow', 'hidden'),
      trait.style('position', 'relative'),
    );

    const bar = document.createElement('div');
    tag.$(bar)(
      trait.style('height', '100%'),
      trait.style('width', '0%'),
      trait.style('backgroundColor', theme.$token('colors', 'primary')),
      trait.style('transition', 'width 0.3s ease-in-out'),
      trait.style('position', 'relative'),
    );

    track.appendChild(bar);
    container.appendChild(track);

    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        container.appendChild(c);
      } else {
        c(container);
      }
    });

    return container;
  },

  value:
    (value: number, max: number = 100) =>
    (el: HTMLElement | SVGElement) => {
      const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
      const bar = el.querySelector('div > div') as HTMLElement;

      tag.$(bar)(trait.style('width', `${percentage}%`));
    },

  size: (size: ProgressSize) => (el: HTMLElement | SVGElement) => {
    const height = sizeConfig[size];
    const track = el.querySelector('div') as HTMLElement;

    tag.$(track)(trait.style('height', height));
  },

  variant: (variant: ProgressVariant) => (el: HTMLElement | SVGElement) => {
    const bar = el.querySelector('div > div') as HTMLElement;

    tag.$(bar)(
      trait.style(
        'backgroundImage',
        'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
        $test(variant === 'striped'),
      ),
      trait.style('backgroundSize', '1rem 1rem', $test(variant === 'striped')),
    );
  },

  color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
    const bar = el.querySelector('div > div') as HTMLElement;

    tag.$(bar)(trait.style('backgroundColor', theme.$token('colors', color)));
  },

  bg: (bg: ColorToken) => (el: HTMLElement | SVGElement) => {
    const track = el.querySelector('div') as HTMLElement;

    tag.$(track)(trait.style('backgroundColor', theme.$token('colors', bg)));
  },

  animated: (animated: boolean) => (el: HTMLElement | SVGElement) => {
    const bar = el.querySelector('div > div') as HTMLElement;

    tag.$(bar)(trait.style('animation', 'progress-stripes 1s linear infinite', $test(animated)));

    if (animated) {
      injectKeyframes();
    }
  },

  showLabel:
    (show: boolean, value: number = 0, max: number = 100) =>
    (el: HTMLElement | SVGElement) => {
      if (!show) return;

      const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
      const label = document.createElement('div');

      tag.$(label)(
        trait.style('position', 'absolute'),
        trait.style('top', '50%'),
        trait.style('left', '50%'),
        trait.style('transform', 'translate(-50%, -50%)'),
        trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
        trait.style('fontSize', theme.$token('typography', 'fontSizeXs')),
        trait.style('fontWeight', theme.$token('typography', 'fontWeightMedium')),
        trait.style('color', theme.$token('colors', 'textPrimary')),
        trait.style('pointerEvents', 'none'),
        trait.text(`${Math.round(percentage)}%`),
      );

      el.appendChild(label);
    },
};
