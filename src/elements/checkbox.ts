import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type Size = 'sm' | 'md' | 'lg';

const sizeConfig: Record<Size, { size: string; fontSize: string }> = {
  sm: { size: '16px', fontSize: '12px' },
  md: { size: '20px', fontSize: '14px' },
  lg: { size: '24px', fontSize: '16px' },
};

export const checkbox = {
  create: (...children: Child[]) => {
    const el = document.createElement('input');

    // Apply default checkbox styles
    tag.$(el)(
      trait.attr('type', 'checkbox'),
      trait.style('margin', '0'),
      trait.style('cursor', 'pointer'),
      trait.style('accentColor', theme.$token('colors', 'primary')),
    );

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

    tag.$(el)(trait.style('width', config.size), trait.style('height', config.size));
  },

  disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('cursor', 'pointer', $test(!disabled)),
      trait.attr('disabled', 'true', $test(disabled)),
    );
  },

  checked: (checked: boolean) => (el: HTMLElement | SVGElement) => {
    (el as HTMLInputElement).checked = checked;
  },

  onChange: (handler: (checked: boolean) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.event('change', (e?: Event) => {
        if (!e) return;
        const target = e.target as HTMLInputElement;
        handler(target.checked);
      }),
    );
  },

  label:
    (label: string, size: Size = 'md') =>
    (el: HTMLElement | SVGElement) => {
      const config = sizeConfig[size];
      const wrapper = document.createElement('label');

      tag.$(wrapper)(
        trait.style('display', 'inline-flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', theme.$token('spacing', 'sm')),
        trait.style('cursor', 'pointer'),
        trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
        trait.style('fontSize', config.fontSize),
        trait.style('color', theme.$token('colors', 'textPrimary')),
      );

      const labelText = document.createElement('span');
      tag.$(labelText)(trait.text(label));

      if (el.parentNode) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.appendChild(labelText);
      }
    },
};
