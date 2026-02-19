import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorToken = keyof DesignTokens['colors'];

const sizeConfig: Record<SpinnerSize, string> = {
  xs: '16px',
  sm: '24px',
  md: '32px',
  lg: '48px',
  xl: '64px',
};

// Inject keyframes once
const injectSpinKeyframes = () => {
  if (!document.querySelector('#spinner-keyframes')) {
    const style = document.createElement('style');
    style.id = 'spinner-keyframes';
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
};

export const spinner = {
  create: (...children: Child[]) => {
    const el = document.createElement('div');

    injectSpinKeyframes();

    tag.$(el)(
      trait.style('display', 'inline-block'),
      trait.style('borderRadius', '50%'),
      trait.attr('role', 'status'),
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

  size: (size: SpinnerSize) => (el: HTMLElement | SVGElement) => {
    const spinnerSize = sizeConfig[size];

    tag.$(el)(trait.style('width', spinnerSize), trait.style('height', spinnerSize));
  },

  color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('borderTopColor', theme.$token('colors', color)));
  },

  thickness: (thickness: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('border', `${thickness} solid ${theme.$token('colors', 'bgSecondary')}`));
  },

  speed: (speed: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('animation', `spin ${speed} linear infinite`));
  },

  label: (label: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('aria-label', label));
  },
};
