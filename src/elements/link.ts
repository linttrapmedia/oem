import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type LinkVariant = 'default' | 'subtle' | 'unstyled';
type LinkColor = keyof DesignTokens['colors'];

type LinkProps = {
  href: string;
  content?: string;
  variant?: LinkVariant;
  color?: LinkColor;
  underline?: boolean;
  external?: boolean;
  disabled?: boolean;
  onClick?: (e: Event) => void;
  children?: HTMLElement[];
};

export const link = (props: LinkProps) => {
  const {
    href,
    content,
    variant = 'default',
    color,
    underline = true,
    external = false,
    disabled = false,
    onClick,
    children = [],
  } = props;

  // Determine color based on variant and color prop
  const getLinkColor = (): LinkColor => {
    if (color) return color;
    if (variant === 'subtle') return 'textSecondary';
    if (variant === 'unstyled') return 'textPrimary';
    return 'primary';
  };

  const linkColor = getLinkColor();

  const element = tag.a(
    // Base styles
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', 'inherit'),
    trait.style('lineHeight', 'inherit'),
    trait.style('transition', 'all 0.2s ease-in-out'),

    // Color
    trait.style('color', theme.$token('colors', linkColor), $test(!disabled)),
    trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),

    // Underline
    trait.style('textDecoration', 'underline', $test(underline && !disabled)),
    trait.style('textDecoration', 'none', $test(!underline || disabled)),

    // Cursor
    trait.style('cursor', 'pointer', $test(!disabled)),
    trait.style('cursor', 'not-allowed', $test(disabled)),

    // Disabled state
    trait.style('opacity', '0.6', $test(disabled)),
    trait.style('pointerEvents', 'none', $test(disabled)),

    // Hover state
    trait.style_on_event(
      'mouseenter',
      'color',
      theme.$token('colors', variant === 'default' ? 'primaryHover' : 'textPrimary'),
      $test(!disabled),
    ),
    trait.style_on_event(
      'mouseenter',
      'textDecoration',
      'underline',
      $test(!disabled && variant !== 'unstyled'),
    ),

    // Mouse leave
    trait.style_on_event('mouseleave', 'color', theme.$token('colors', linkColor), $test(!disabled)),
    trait.style_on_event(
      'mouseleave',
      'textDecoration',
      underline ? 'underline' : 'none',
      $test(!disabled),
    ),

    // Focus state
    trait.style_on_event('focus', 'outline', theme.$token('shadows', 'shadowFocus')),

    // Attributes
    trait.attr('href', href, $test(!disabled)),
    trait.attr('target', '_blank', $test(external)),
    trait.attr('rel', 'noopener noreferrer', $test(external)),

    // Click handler
    trait.event('click', onClick || (() => {}), $test(onClick !== undefined && !disabled)),

    // Content
    trait.text(content || '', $test(content !== undefined)),

    // Children
    ...children,
  );

  return element;
};
