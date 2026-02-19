import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type BadgeVariant = 'solid' | 'subtle' | 'outline';
type BadgeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

type ColorToken = keyof DesignTokens['colors'];
type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

const colorConfig: Record<
  BadgeColor,
  {
    solid: { bg: ColorToken; text: ColorToken };
    subtle: { bg: ColorToken; text: ColorToken };
    outline: { border: ColorToken; text: ColorToken };
  }
> = {
  primary: {
    solid: { bg: 'primary', text: 'textInverse' },
    subtle: { bg: 'primarySubtle', text: 'primary' },
    outline: { border: 'primary', text: 'primary' },
  },
  secondary: {
    solid: { bg: 'secondary', text: 'textInverse' },
    subtle: { bg: 'secondarySubtle', text: 'secondary' },
    outline: { border: 'secondary', text: 'secondary' },
  },
  success: {
    solid: { bg: 'success', text: 'textInverse' },
    subtle: { bg: 'successSubtle', text: 'success' },
    outline: { border: 'success', text: 'success' },
  },
  error: {
    solid: { bg: 'error', text: 'textInverse' },
    subtle: { bg: 'errorSubtle', text: 'error' },
    outline: { border: 'error', text: 'error' },
  },
  warning: {
    solid: { bg: 'warning', text: 'textPrimary' },
    subtle: { bg: 'warningSubtle', text: 'warning' },
    outline: { border: 'warning', text: 'warning' },
  },
  info: {
    solid: { bg: 'info', text: 'textInverse' },
    subtle: { bg: 'infoSubtle', text: 'info' },
    outline: { border: 'info', text: 'info' },
  },
  neutral: {
    solid: { bg: 'bgSecondary', text: 'textPrimary' },
    subtle: { bg: 'bgTertiary', text: 'textSecondary' },
    outline: { border: 'borderPrimary', text: 'textPrimary' },
  },
};

const sizeConfig: Record<
  BadgeSize,
  {
    paddingX: SpacingToken;
    paddingY: SpacingToken;
    fontSize: TypographyToken;
  }
> = {
  sm: {
    paddingX: 'xs',
    paddingY: '1',
    fontSize: 'fontSizeXs',
  },
  md: {
    paddingX: 'sm',
    paddingY: '1',
    fontSize: 'fontSizeSm',
  },
  lg: {
    paddingX: 'md',
    paddingY: 'xs',
    fontSize: 'fontSizeBase',
  },
};

export const badge = {
  create: (...children: Child[]) => {
    const el = document.createElement('span');

    tag.$(el)(
      trait.style('display', 'inline-flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('fontWeight', theme.$token('typography', 'fontWeightMedium')),
      trait.style('lineHeight', theme.$token('typography', 'lineHeightTight')),
      trait.style('whiteSpace', 'nowrap'),
      trait.style('userSelect', 'none'),
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

  variant: (variant: BadgeVariant, color: BadgeColor) => (el: HTMLElement | SVGElement) => {
    const config = colorConfig[color];

    tag.$(el)(
      // Variant: solid
      trait.style(
        'backgroundColor',
        theme.$token('colors', config.solid.bg),
        $test(variant === 'solid'),
      ),
      trait.style('color', theme.$token('colors', config.solid.text), $test(variant === 'solid')),
      trait.style('border', 'none', $test(variant === 'solid')),

      // Variant: subtle
      trait.style(
        'backgroundColor',
        theme.$token('colors', config.subtle.bg),
        $test(variant === 'subtle'),
      ),
      trait.style('color', theme.$token('colors', config.subtle.text), $test(variant === 'subtle')),
      trait.style('border', 'none', $test(variant === 'subtle')),

      // Variant: outline
      trait.style('backgroundColor', 'transparent', $test(variant === 'outline')),
      trait.style(
        'color',
        theme.$token('colors', config.outline.text),
        $test(variant === 'outline'),
      ),
      trait.style(
        'border',
        `1px solid ${theme.$token('colors', config.outline.border)}`,
        $test(variant === 'outline'),
      ),
    );
  },

  size: (size: BadgeSize) => (el: HTMLElement | SVGElement) => {
    const config = sizeConfig[size];

    tag.$(el)(
      trait.style('paddingLeft', theme.$token('spacing', config.paddingX)),
      trait.style('paddingRight', theme.$token('spacing', config.paddingX)),
      trait.style('paddingTop', theme.$token('spacing', config.paddingY)),
      trait.style('paddingBottom', theme.$token('spacing', config.paddingY)),
      trait.style('fontSize', theme.$token('typography', config.fontSize)),
      trait.style('borderRadius', theme.$token('borders', 'borderRadiusBadge')),
    );
  },

  pill: (isPill: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('borderRadius', '9999px', $test(isPill)));
  },

  text: (text: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.text(text));
  },
};
