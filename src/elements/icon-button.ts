import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type IconButtonVariant = 'solid' | 'outline' | 'ghost';
type IconButtonSize = 'sm' | 'md' | 'lg';
type ColorToken = keyof DesignTokens['colors'];

type IconButtonProps = {
  icon: HTMLElement;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: ColorToken;
  disabled?: boolean;
  rounded?: boolean;
  'aria-label': string;
  onClick?: () => void;
};

const sizeConfig: Record<IconButtonSize, { size: string; iconSize: string }> = {
  sm: { size: '32px', iconSize: '16px' },
  md: { size: '40px', iconSize: '20px' },
  lg: { size: '48px', iconSize: '24px' },
};

export const iconButton = (props: IconButtonProps) => {
  const {
    icon,
    variant = 'ghost',
    size = 'md',
    color = 'primary',
    disabled = false,
    rounded = false,
    'aria-label': ariaLabel,
    onClick,
  } = props;

  const config = sizeConfig[size];

  const btnElement = tag.button(
    // Base styles
    trait.style('display', 'inline-flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('width', config.size),
    trait.style('height', config.size),
    trait.style('padding', '0'),
    trait.style('transition', 'all 0.2s ease-in-out'),
    trait.style('outline', 'none'),
    trait.style('border', 'none'),
    trait.style('userSelect', 'none'),
    trait.style('flexShrink', '0'),

    // Border radius
    trait.style('borderRadius', '50%', $test(rounded)),
    trait.style('borderRadius', theme.$token('borders', 'borderRadiusButton'), $test(!rounded)),

    // Cursor
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('cursor', 'pointer', $test(!disabled)),

    // Variant: solid
    trait.style('backgroundColor', theme.$token('colors', color), $test(variant === 'solid' && !disabled)),
    trait.style('color', theme.$token('colors', 'textInverse'), $test(variant === 'solid' && !disabled)),

    // Variant: outline
    trait.style('backgroundColor', 'transparent', $test(variant === 'outline')),
    trait.style('color', theme.$token('colors', color), $test(variant === 'outline' && !disabled)),
    trait.style(
      'border',
      `${theme.token('borders', 'borderWidthThin')} ${theme.token('borders', 'borderStyleSolid')} ${theme.token('colors', color)}`,
      $test(variant === 'outline' && !disabled),
      theme,
    ),

    // Variant: ghost
    trait.style('backgroundColor', 'transparent', $test(variant === 'ghost')),
    trait.style('color', theme.$token('colors', color), $test(variant === 'ghost' && !disabled)),

    // Disabled state
    trait.style('opacity', '0.6', $test(disabled)),
    trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),
    trait.style('backgroundColor', theme.$token('colors', 'bgDisabled'), $test(disabled && variant === 'solid')),

    // Hover state - enter
    trait.style_on_event(
      'mouseenter',
      'backgroundColor',
      theme.$token('colors', `${color}Hover` as ColorToken),
      $test(!disabled && variant === 'solid'),
    ),
    trait.style_on_event(
      'mouseenter',
      'backgroundColor',
      theme.$token('colors', 'bgHover'),
      $test(!disabled && (variant === 'outline' || variant === 'ghost')),
    ),
    trait.style_on_event('mouseenter', 'transform', 'scale(1.05)', $test(!disabled)),

    // Hover state - leave
    trait.style_on_event(
      'mouseleave',
      'backgroundColor',
      theme.$token('colors', color),
      $test(!disabled && variant === 'solid'),
    ),
    trait.style_on_event(
      'mouseleave',
      'backgroundColor',
      'transparent',
      $test(!disabled && (variant === 'outline' || variant === 'ghost')),
    ),
    trait.style_on_event('mouseleave', 'transform', 'scale(1)', $test(!disabled)),

    // Active state - press
    trait.style_on_event(
      'mousedown',
      'backgroundColor',
      theme.$token('colors', `${color}Active` as ColorToken),
      $test(!disabled && variant === 'solid'),
    ),
    trait.style_on_event(
      'mousedown',
      'backgroundColor',
      theme.$token('colors', 'bgActive'),
      $test(!disabled && (variant === 'outline' || variant === 'ghost')),
    ),
    trait.style_on_event('mousedown', 'transform', 'scale(0.95)', $test(!disabled)),

    // Active state - release
    trait.style_on_event(
      'mouseup',
      'backgroundColor',
      theme.$token('colors', `${color}Hover` as ColorToken),
      $test(!disabled && variant === 'solid'),
    ),
    trait.style_on_event(
      'mouseup',
      'backgroundColor',
      theme.$token('colors', 'bgHover'),
      $test(!disabled && (variant === 'outline' || variant === 'ghost')),
    ),
    trait.style_on_event('mouseup', 'transform', 'scale(1.05)', $test(!disabled)),

    // Focus state
    trait.style_on_event('focus', 'boxShadow', theme.$token('shadows', 'shadowFocus')),

    // Disabled attribute
    trait.attr('disabled', 'true', $test(disabled)),

    // Accessibility
    trait.attr('aria-label', ariaLabel),
    trait.attr('type', 'button'),

    // Click handler
    trait.event('click', onClick || (() => {}), $test(onClick !== undefined && !disabled)),

    // Icon (wrapped in a div to control size)
    tag.div(trait.style('width', config.iconSize), trait.style('height', config.iconSize), icon),
  );

  return btnElement;
};
