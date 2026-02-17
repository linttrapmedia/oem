import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
type BorderRadiusToken = keyof DesignTokens['borders'];

type ImageProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: ImageFit;
  borderRadius?: BorderRadiusToken;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;
};

export const image = (props: ImageProps) => {
  const {
    src,
    alt,
    width,
    height,
    objectFit = 'cover',
    borderRadius,
    loading = 'lazy',
    onLoad,
    onError,
    onClick,
  } = props;

  const element = tag.img(
    // Base styles
    trait.style('display', 'block'),
    trait.style('maxWidth', '100%'),
    trait.style('height', 'auto'),

    // Dimensions
    trait.style('width', width!, $test(width !== undefined)),
    trait.style('height', height!, $test(height !== undefined)),

    // Object fit
    trait.style('objectFit', objectFit),

    // Border radius
    trait.style('borderRadius', theme.$token('borders', borderRadius!), $test(borderRadius !== undefined)),

    // Click cursor
    trait.style('cursor', 'pointer', $test(onClick !== undefined)),

    // Attributes
    trait.attr('src', src),
    trait.attr('alt', alt),
    trait.attr('loading', loading),

    // Event handlers
    trait.event('load', onLoad || (() => {}), $test(onLoad !== undefined)),
    trait.event('error', onError || (() => {}), $test(onError !== undefined)),
    trait.event('click', onClick || (() => {}), $test(onClick !== undefined)),
  );

  return element;
};
