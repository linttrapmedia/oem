import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type SelectSize = 'sm' | 'md' | 'lg';
type SelectVariant = 'outline' | 'filled' | 'flushed';

type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
};

const sizeConfig: Record<
  SelectSize,
  {
    padding: SpacingToken;
    fontSize: TypographyToken;
    height: SpacingToken;
  }
> = {
  sm: {
    padding: 'sm',
    fontSize: 'fontSizeSm',
    height: '8',
  },
  md: {
    padding: 'md',
    fontSize: 'fontSizeBase',
    height: '10',
  },
  lg: {
    padding: 'lg',
    fontSize: 'fontSizeLg',
    height: '12',
  },
};

export const select = (props: SelectProps) => {
  const {
    options,
    value = '',
    placeholder,
    size = 'md',
    variant = 'outline',
    disabled = false,
    required = false,
    fullWidth = false,
    error = false,
    onChange,
  } = props;

  const sizeSettings = sizeConfig[size];

  const selectElement = tag.select(
    // Base styles
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', theme.$token('typography', sizeSettings.fontSize)),
    trait.style('lineHeight', theme.$token('typography', 'lineHeightNormal')),
    trait.style('color', theme.$token('colors', 'textPrimary')),
    trait.style('padding', theme.$token('spacing', sizeSettings.padding)),
    trait.style('paddingRight', theme.$token('spacing', 'xl')),
    trait.style('height', theme.$token('spacing', sizeSettings.height)),
    trait.style('borderRadius', theme.$token('borders', 'borderRadiusInput')),
    trait.style('transition', 'all 0.2s ease-in-out'),
    trait.style('outline', 'none'),
    trait.style('appearance', 'none'),
    trait.style(
      'backgroundImage',
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='currentColor' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    ),
    trait.style('backgroundRepeat', 'no-repeat'),
    trait.style('backgroundPosition', 'right 0.75rem center'),
    trait.style('backgroundSize', '12px'),

    // Width
    trait.style('width', '100%', $test(fullWidth)),
    trait.style('width', 'auto', $test(!fullWidth)),

    // Variant: outline
    trait.style(
      'border',
      () =>
        `${theme.token('borders', 'borderWidthThin')} ${theme.token(
          'borders',
          'borderStyleSolid',
        )} ${theme.token('colors', error ? 'error' : 'borderPrimary')}`,
      $test(variant === 'outline'),
      theme,
    ),
    trait.style('backgroundColor', theme.$token('colors', 'bgPrimary'), $test(variant === 'outline')),

    // Variant: filled
    trait.style('border', 'none', $test(variant === 'filled')),
    trait.style('backgroundColor', theme.$token('colors', 'bgSecondary'), $test(variant === 'filled')),

    // Variant: flushed
    trait.style('border', 'none', $test(variant === 'flushed')),
    trait.style(
      'borderBottom',
      () =>
        `${theme.token('borders', 'borderWidthThin')} ${theme.token(
          'borders',
          'borderStyleSolid',
        )} ${theme.token('colors', error ? 'error' : 'borderPrimary')}`,
      $test(variant === 'flushed'),
      theme,
    ),
    trait.style('backgroundColor', 'transparent', $test(variant === 'flushed')),
    trait.style('borderRadius', '0', $test(variant === 'flushed')),
    trait.style('paddingLeft', '0', $test(variant === 'flushed')),

    // Disabled state
    trait.style('opacity', '0.6', $test(disabled)),
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('cursor', 'pointer', $test(!disabled)),

    // Focus state
    trait.style_on_event(
      'focus',
      'borderColor',
      theme.$token('colors', error ? 'error' : 'primary'),
      $test(!disabled),
    ),
    trait.style_on_event('focus', 'boxShadow', theme.$token('shadows', 'shadowFocus'), $test(!disabled)),

    // Hover state
    trait.style_on_event(
      'mouseenter',
      'borderColor',
      theme.$token('colors', error ? 'errorHover' : 'borderSecondary'),
      $test(!disabled),
    ),
    trait.style_on_event(
      'mouseleave',
      'borderColor',
      theme.$token('colors', error ? 'error' : 'borderPrimary'),
      $test(!disabled),
    ),

    // Attributes
    trait.attr('disabled', 'true', $test(disabled)),
    trait.attr('required', 'true', $test(required)),

    // Change handler
    trait.event(
      'change',
      (e: Event) => {
        const target = e.target as HTMLSelectElement;
        onChange?.(target.value);
      },
      $test(onChange !== undefined && !disabled),
    ),

    // Placeholder option
    placeholder
      ? tag.option(
          trait.attr('value', ''),
          trait.attr('disabled', 'true'),
          trait.attr('selected', 'true', $test(value === '')),
          trait.text(placeholder),
        )
      : null,

    // Options
    ...options
      .map((option) =>
        tag.option(
          trait.attr('value', option.value),
          trait.attr('disabled', 'true', $test(option.disabled === true)),
          trait.attr('selected', 'true', $test(value === option.value)),
          trait.text(option.label),
        ),
      )
      .filter(Boolean),
  ).filter(Boolean);

  return selectElement;
};
