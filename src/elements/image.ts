import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
type BorderRadiusToken = keyof DesignTokens['borders'];

export const image = {
  create: (...children: Child[]) => {
    const el = document.createElement('img');

    tag.$(el)(
      trait.style('display', 'block'),
      trait.style('maxWidth', '100%'),
      trait.style('height', 'auto'),
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

  src: (src: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('src', src));
  },

  alt: (alt: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('alt', alt));
  },

  width: (width: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('width', width));
  },

  height: (height: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('height', height));
  },

  objectFit: (fit: ImageFit) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('objectFit', fit));
  },

  borderRadius: (radius: BorderRadiusToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('borderRadius', theme.$token('borders', radius)));
  },

  loading: (loading: 'eager' | 'lazy') => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('loading', loading));
  },

  onLoad: (handler: () => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.event('load', handler));
  },

  onError: (handler: () => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.event('error', handler));
  },

  onClick: (handler: () => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('cursor', 'pointer'), trait.event('click', handler));
  },
};
