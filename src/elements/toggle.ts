import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type Size = 'sm' | 'md' | 'lg';
type ColorToken = keyof DesignTokens['colors'];

const sizeConfig: Record<
  Size,
  { width: string; height: string; thumbSize: string; thumbOffset: string }
> = {
  sm: { width: '32px', height: '18px', thumbSize: '14px', thumbOffset: '16px' },
  md: { width: '44px', height: '24px', thumbSize: '20px', thumbOffset: '22px' },
  lg: { width: '56px', height: '32px', thumbSize: '28px', thumbOffset: '28px' },
};

export const toggle = {
  create: (...children: Child[]) => {
    const el = document.createElement('label');

    // Create hidden checkbox input
    const input = document.createElement('input');
    tag.$(input)(
      trait.attr('type', 'checkbox'),
      trait.style('position', 'absolute'),
      trait.style('opacity', '0'),
      trait.style('width', '0'),
      trait.style('height', '0'),
    );

    // Create track
    const track = document.createElement('div');
    tag.$(track)(
      trait.style('position', 'relative'),
      trait.style('borderRadius', '9999px'),
      trait.style('transition', 'all 0.2s ease-in-out'),
      trait.style('cursor', 'pointer'),
      trait.style('display', 'inline-block'),
    );

    // Create thumb
    const thumb = document.createElement('div');
    tag.$(thumb)(
      trait.style('position', 'absolute'),
      trait.style('top', '50%'),
      trait.style('left', '2px'),
      trait.style('transform', 'translateY(-50%)'),
      trait.style('borderRadius', '50%'),
      trait.style('backgroundColor', 'white'),
      trait.style('boxShadow', theme.$token('shadows', 'shadowButton')),
      trait.style('transition', 'all 0.2s ease-in-out'),
    );

    track.appendChild(thumb);
    track.appendChild(input);
    el.appendChild(track);

    // Apply default toggle styles
    tag.$(el)(
      trait.style('display', 'inline-flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', theme.$token('spacing', 'sm')),
      trait.style('cursor', 'pointer'),
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('fontSize', theme.$token('typography', 'fontSizeBase')),
      trait.style('color', theme.$token('colors', 'textPrimary')),
    );

    // Store references for appliers
    (el as any)._toggleInput = input;
    (el as any)._toggleTrack = track;
    (el as any)._toggleThumb = thumb;

    // Apply children (appliers)
    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  size: (size: Size) => (el: HTMLElement | SVGElement) => {
    const config = sizeConfig[size];
    const track = (el as any)._toggleTrack;
    const thumb = (el as any)._toggleThumb;

    tag.$(track)(trait.style('width', config.width), trait.style('height', config.height));

    tag.$(thumb)(trait.style('width', config.thumbSize), trait.style('height', config.thumbSize));

    // Store offset for checked state
    (el as any)._thumbOffset = config.thumbOffset;
  },

  color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
    (el as any)._toggleColor = color;
  },

  disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
    const input = (el as any)._toggleInput;
    const track = (el as any)._toggleTrack;

    tag.$(input)(trait.attr('disabled', 'true', $test(disabled)));
    tag.$(track)(
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('cursor', 'pointer', $test(!disabled)),
      trait.style('opacity', '0.6', $test(disabled)),
    );
    tag.$(el)(
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('cursor', 'pointer', $test(!disabled)),
      trait.style('opacity', '0.6', $test(disabled)),
    );
  },

  checked: (checked: boolean) => (el: HTMLElement | SVGElement) => {
    const input = (el as any)._toggleInput as HTMLInputElement;
    const track = (el as any)._toggleTrack;
    const thumb = (el as any)._toggleThumb;
    const color = (el as any)._toggleColor || 'primary';
    const thumbOffset = (el as any)._thumbOffset || '22px';

    input.checked = checked;

    tag.$(track)(
      trait.style('backgroundColor', theme.$token('colors', color), $test(checked)),
      trait.style('backgroundColor', theme.$token('colors', 'bgSecondary'), $test(!checked)),
    );

    tag.$(thumb)(
      trait.style('transform', `translateX(${thumbOffset}) translateY(-50%)`, $test(checked)),
      trait.style('transform', 'translateY(-50%)', $test(!checked)),
    );
  },

  onChange: (handler: (checked: boolean) => void) => (el: HTMLElement | SVGElement) => {
    const input = (el as any)._toggleInput;
    const track = (el as any)._toggleTrack;
    const thumb = (el as any)._toggleThumb;
    const color = (el as any)._toggleColor || 'primary';
    const thumbOffset = (el as any)._thumbOffset || '22px';

    tag.$(input)(
      trait.event('change', (e?: Event) => {
        if (!e) return;
        const target = e.target as HTMLInputElement;
        const checked = target.checked;

        // Update visual state
        tag.$(track)(
          trait.style('backgroundColor', theme.$token('colors', checked ? color : 'bgSecondary')),
        );

        tag.$(thumb)(
          trait.style(
            'transform',
            checked ? `translateX(${thumbOffset}) translateY(-50%)` : 'translateY(-50%)',
          ),
        );

        handler(checked);
      }),
    );
  },

  label: (label: string) => (el: HTMLElement | SVGElement) => {
    const labelText = document.createElement('span');
    tag.$(labelText)(trait.text(label));
    el.appendChild(labelText);
  },
};
