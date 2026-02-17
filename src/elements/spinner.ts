import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorToken = keyof DesignTokens['colors'];

type SpinnerProps = {
  size?: SpinnerSize;
  color?: ColorToken;
  thickness?: string;
  speed?: string;
  label?: string;
};

const sizeConfig: Record<SpinnerSize, string> = {
  xs: '16px',
  sm: '24px',
  md: '32px',
  lg: '48px',
  xl: '64px',
};

export const spinner = (props: SpinnerProps) => {
  const { size = 'md', color = 'primary', thickness = '3px', speed = '0.8s', label } = props;

  const spinnerSize = sizeConfig[size];

  const element = tag.div(
    // Base styles
    trait.style('display', 'inline-block'),
    trait.style('width', spinnerSize),
    trait.style('height', spinnerSize),
    trait.style('border', `${thickness} solid ${theme.token('colors', 'bgSecondary')}`, undefined, theme),
    trait.style(
      'borderTopColor',
      theme.$token('colors', color),
    ),
    trait.style('borderRadius', '50%'),
    trait.style('animation', `spin ${speed} linear infinite`),

    // Role for accessibility
    trait.attr('role', 'status'),
    trait.attr('aria-label', label || 'Loading'),

    // Add keyframes animation via style element (injected once)
    (() => {
      // Check if animation already exists
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
      return null;
    })(),
  ).filter(Boolean);

  return element;
};
