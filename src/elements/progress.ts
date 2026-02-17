import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressVariant = 'default' | 'striped';
type ColorToken = keyof DesignTokens['colors'];

type ProgressProps = {
  value: number;
  max?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  color?: ColorToken;
  bg?: ColorToken;
  showLabel?: boolean;
  animated?: boolean;
};

const sizeConfig: Record<ProgressSize, string> = {
  sm: '4px',
  md: '8px',
  lg: '12px',
};

export const progress = (props: ProgressProps) => {
  const {
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    color = 'primary',
    bg = 'bgSecondary',
    showLabel = false,
    animated = false,
  } = props;

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const height = sizeConfig[size];

  // Container
  const container = tag.div(
    trait.style('position', 'relative'),
    trait.style('width', '100%'),

    // Progress track
    tag.div(
      trait.style('width', '100%'),
      trait.style('height', height),
      trait.style('backgroundColor', theme.$token('colors', bg)),
      trait.style('borderRadius', theme.$token('borders', 'borderRadiusFull')),
      trait.style('overflow', 'hidden'),
      trait.style('position', 'relative'),

      // Progress bar
      tag.div(
        trait.style('height', '100%'),
        trait.style('width', `${percentage}%`),
        trait.style('backgroundColor', theme.$token('colors', color)),
        trait.style('transition', 'width 0.3s ease-in-out'),
        trait.style('position', 'relative'),

        // Striped variant
        trait.style(
          'backgroundImage',
          'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
          $test(variant === 'striped'),
        ),
        trait.style('backgroundSize', '1rem 1rem', $test(variant === 'striped')),

        // Animation
        trait.style(
          'animation',
          'progress-stripes 1s linear infinite',
          $test(animated && variant === 'striped'),
        ),

        // Add keyframes for animation
        (() => {
          if (animated && variant === 'striped' && !document.querySelector('#progress-keyframes')) {
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
          return null;
        })(),
      ),
    ),

    // Label
    showLabel
      ? tag.div(
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
        )
      : null,
  ).filter(Boolean);

  return container;
};
