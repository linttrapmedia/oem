import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ColorToken = keyof DesignTokens['colors'];

type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  bg?: ColorToken;
  color?: ColorToken;
  borderColor?: ColorToken;
  borderWidth?: string;
  onClick?: () => void;
};

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

export const avatar = (props: AvatarProps) => {
  const {
    src,
    alt,
    name,
    size = 'md',
    bg = 'primary',
    color = 'textInverse',
    borderColor,
    borderWidth = '2px',
    onClick,
  } = props;

  const config = sizeConfig[size];
  const initials = name ? getInitials(name) : '?';

  // If src is provided, show image
  if (src) {
    return tag.div(
      trait.style('display', 'inline-flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('width', config.size),
      trait.style('height', config.size),
      trait.style('borderRadius', '50%'),
      trait.style('overflow', 'hidden'),
      trait.style('flexShrink', '0'),
      trait.style('position', 'relative'),
      trait.style('userSelect', 'none'),

      // Border
      trait.style(
        'border',
        `${borderWidth} solid ${theme.token('colors', borderColor!)}`,
        $test(borderColor !== undefined),
        theme,
      ),

      // Click
      trait.style('cursor', 'pointer', $test(onClick !== undefined)),
      trait.event('click', onClick || (() => {}), $test(onClick !== undefined)),

      // Image
      tag.img(
        trait.attr('src', src),
        trait.attr('alt', alt || name || 'Avatar'),
        trait.style('width', '100%'),
        trait.style('height', '100%'),
        trait.style('objectFit', 'cover'),
      ),
    );
  }

  // Otherwise show initials
  return tag.div(
    trait.style('display', 'inline-flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('width', config.size),
    trait.style('height', config.size),
    trait.style('borderRadius', '50%'),
    trait.style('flexShrink', '0'),
    trait.style('userSelect', 'none'),
    trait.style('backgroundColor', theme.$token('colors', bg)),
    trait.style('color', theme.$token('colors', color)),
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', config.fontSize),
    trait.style('fontWeight', theme.$token('typography', 'fontWeightMedium')),

    // Border
    trait.style(
      'border',
      `${borderWidth} solid ${theme.token('colors', borderColor!)}`,
      $test(borderColor !== undefined),
      theme,
    ),

    // Click
    trait.style('cursor', 'pointer', $test(onClick !== undefined)),
    trait.event('click', onClick || (() => {}), $test(onClick !== undefined)),

    // Initials
    trait.text(initials),
  );
};
