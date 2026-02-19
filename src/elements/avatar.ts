import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ColorToken = keyof DesignTokens['colors'];

const sizeConfig: Record<AvatarSize, { size: string; fontSize: string }> = {
  xs: { size: '24px', fontSize: '10px' },
  sm: { size: '32px', fontSize: '12px' },
  md: { size: '48px', fontSize: '16px' },
  lg: { size: '64px', fontSize: '20px' },
  xl: { size: '96px', fontSize: '32px' },
  '2xl': { size: '128px', fontSize: '48px' },
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const avatar = {
  create: (...children: Child[]) => {
    const el = document.createElement('div');

    tag.$(el)(
      trait.style('display', 'inline-flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('borderRadius', '50%'),
      trait.style('flexShrink', '0'),
      trait.style('userSelect', 'none'),
      trait.style('overflow', 'hidden'),
      trait.style('position', 'relative'),
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

  size: (size: AvatarSize) => (el: HTMLElement | SVGElement) => {
    const config = sizeConfig[size];

    tag.$(el)(
      trait.style('width', config.size),
      trait.style('height', config.size),
      trait.style('fontSize', config.fontSize),
    );
  },

  bg: (bg: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('backgroundColor', theme.$token('colors', bg)));
  },

  color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('color', theme.$token('colors', color)));
  },

  border: (borderColor: ColorToken, borderWidth: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('border', `${borderWidth} solid ${theme.$token('colors', borderColor)}`));
  },

  initials: (name: string) => (el: HTMLElement | SVGElement) => {
    const initials = getInitials(name);

    tag.$(el)(
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('fontWeight', theme.$token('typography', 'fontWeightMedium')),
      trait.text(initials),
    );
  },

  image: (src: string, alt: string) => (el: HTMLElement | SVGElement) => {
    const img = document.createElement('img');

    tag.$(img)(
      trait.attr('src', src),
      trait.attr('alt', alt),
      trait.style('width', '100%'),
      trait.style('height', '100%'),
      trait.style('objectFit', 'cover'),
    );

    el.appendChild(img);
  },

  onClick: (handler: () => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('cursor', 'pointer'), trait.event('click', handler));
  },
};
