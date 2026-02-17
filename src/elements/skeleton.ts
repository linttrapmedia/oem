import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type SkeletonVariant = 'text' | 'circle' | 'rectangle';
type ColorToken = keyof DesignTokens['colors'];
type BorderRadiusToken = keyof DesignTokens['borders'];

type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  bg?: ColorToken;
  borderRadius?: BorderRadiusToken;
  animated?: boolean;
};

export const skeleton = (props: SkeletonProps) => {
  const {
    variant = 'text',
    width,
    height,
    bg = 'bgSecondary',
    borderRadius,
    animated = true,
  } = props;

  const element = tag.div(
    // Base styles
    trait.style('backgroundColor', theme.$token('colors', bg)),
    trait.style('position', 'relative'),
    trait.style('overflow', 'hidden'),

    // Animation
    trait.style('animation', 'skeleton-pulse 2s ease-in-out infinite', $test(animated)),

    // Variant: text
    trait.style('width', width || '100%', $test(variant === 'text')),
    trait.style('height', height || '1em', $test(variant === 'text')),
    trait.style(
      'borderRadius',
      borderRadius ? theme.$token('borders', borderRadius) : theme.$token('borders', 'borderRadiusSm'),
      $test(variant === 'text'),
    ),

    // Variant: circle
    trait.style('width', width || '40px', $test(variant === 'circle')),
    trait.style('height', height || width || '40px', $test(variant === 'circle')),
    trait.style('borderRadius', '50%', $test(variant === 'circle')),

    // Variant: rectangle
    trait.style('width', width || '100px', $test(variant === 'rectangle')),
    trait.style('height', height || '100px', $test(variant === 'rectangle')),
    trait.style(
      'borderRadius',
      borderRadius ? theme.$token('borders', borderRadius) : theme.$token('borders', 'borderRadiusMd'),
      $test(variant === 'rectangle'),
    ),

    // Add keyframes for animation
    (() => {
      if (animated && !document.querySelector('#skeleton-keyframes')) {
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
      return null;
    })(),
  ).filter(Boolean);

  return element;
};
