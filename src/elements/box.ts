import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type SpacingToken = keyof DesignTokens['spacing'];
type ColorToken = keyof DesignTokens['colors'];
type BorderRadiusToken = keyof DesignTokens['borders'];

type BoxProps = {
  padding?: SpacingToken;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  margin?: SpacingToken;
  marginX?: SpacingToken;
  marginY?: SpacingToken;
  bg?: ColorToken;
  border?: ColorToken;
  borderRadius?: BorderRadiusToken;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  display?: 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  shadow?: keyof DesignTokens['shadows'];
  onClick?: () => void;
  children?: HTMLElement[];
};

export const box = (props: BoxProps) => {
  const {
    padding,
    paddingX,
    paddingY,
    margin,
    marginX,
    marginY,
    bg,
    border,
    borderRadius,
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    display = 'block',
    position = 'static',
    overflow = 'visible',
    shadow,
    onClick,
    children = [],
  } = props;

  const element = tag.div(
    // Display
    trait.style('display', display),

    // Position
    trait.style('position', position),

    // Padding
    trait.style('padding', theme.$token('spacing', padding!), $test(padding !== undefined)),
    trait.style(
      'paddingLeft',
      theme.$token('spacing', paddingX!),
      $test(paddingX !== undefined && padding === undefined),
    ),
    trait.style(
      'paddingRight',
      theme.$token('spacing', paddingX!),
      $test(paddingX !== undefined && padding === undefined),
    ),
    trait.style(
      'paddingTop',
      theme.$token('spacing', paddingY!),
      $test(paddingY !== undefined && padding === undefined),
    ),
    trait.style(
      'paddingBottom',
      theme.$token('spacing', paddingY!),
      $test(paddingY !== undefined && padding === undefined),
    ),

    // Margin
    trait.style('margin', theme.$token('spacing', margin!), $test(margin !== undefined)),
    trait.style(
      'marginLeft',
      theme.$token('spacing', marginX!),
      $test(marginX !== undefined && margin === undefined),
    ),
    trait.style(
      'marginRight',
      theme.$token('spacing', marginX!),
      $test(marginX !== undefined && margin === undefined),
    ),
    trait.style(
      'marginTop',
      theme.$token('spacing', marginY!),
      $test(marginY !== undefined && margin === undefined),
    ),
    trait.style(
      'marginBottom',
      theme.$token('spacing', marginY!),
      $test(marginY !== undefined && margin === undefined),
    ),

    // Background
    trait.style('backgroundColor', theme.$token('colors', bg!), $test(bg !== undefined)),

    // Border
    trait.style(
      'border',
      () =>
        `${theme.token('borders', 'borderWidthThin')} ${theme.token(
          'borders',
          'borderStyleSolid',
        )} ${theme.token('colors', border!)}`,
      $test(border !== undefined),
      theme,
    ),

    // Border radius
    trait.style('borderRadius', theme.$token('borders', borderRadius!), $test(borderRadius !== undefined)),

    // Dimensions
    trait.style('width', width!, $test(width !== undefined)),
    trait.style('height', height!, $test(height !== undefined)),
    trait.style('maxWidth', maxWidth!, $test(maxWidth !== undefined)),
    trait.style('maxHeight', maxHeight!, $test(maxHeight !== undefined)),
    trait.style('minWidth', minWidth!, $test(minWidth !== undefined)),
    trait.style('minHeight', minHeight!, $test(minHeight !== undefined)),

    // Overflow
    trait.style('overflow', overflow),

    // Shadow
    trait.style('boxShadow', theme.$token('shadows', shadow!), $test(shadow !== undefined)),

    // Click handler
    trait.style('cursor', 'pointer', $test(onClick !== undefined)),
    trait.event('click', onClick || (() => {}), $test(onClick !== undefined)),

    // Children
    ...children,
  );

  return element;
};
