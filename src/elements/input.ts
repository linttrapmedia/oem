import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week';
type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'outline' | 'filled' | 'flushed';

type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

type InputProps = {
  type?: InputType;
  value?: string;
  placeholder?: string;
  size?: InputSize;
  variant?: InputVariant;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const sizeConfig: Record<
  InputSize,
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

export const input = (props: InputProps) => {
  const {
    type = 'text',
    value = '',
    placeholder,
    size = 'md',
    variant = 'outline',
    disabled = false,
    readOnly = false,
    required = false,
    fullWidth = false,
    error = false,
    onInput,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const sizeSettings = sizeConfig[size];

  const inputElement = tag.input(
    // Base styles
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', theme.$token('typography', sizeSettings.fontSize)),
    trait.style('lineHeight', theme.$token('typography', 'lineHeightNormal')),
    trait.style('color', theme.$token('colors', 'textPrimary')),
    trait.style('padding', theme.$token('spacing', sizeSettings.padding)),
    trait.style('height', theme.$token('spacing', sizeSettings.height)),
    trait.style('borderRadius', theme.$token('borders', 'borderRadiusInput')),
    trait.style('transition', 'all 0.2s ease-in-out'),
    trait.style('outline', 'none'),

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
    trait.style(
      'backgroundColor',
      theme.$token('colors', 'bgPrimary'),
      $test(variant === 'outline'),
    ),

    // Variant: filled
    trait.style('border', 'none', $test(variant === 'filled')),
    trait.style(
      'backgroundColor',
      theme.$token('colors', 'bgSecondary'),
      $test(variant === 'filled'),
    ),

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
    trait.style('cursor', 'text', $test(!disabled && !readOnly)),
    trait.style('cursor', 'default', $test(readOnly)),

    // Read-only state
    trait.style('backgroundColor', theme.$token('colors', 'bgDisabled'), $test(readOnly)),

    // Focus state
    trait.style_on_event(
      'focus',
      'borderColor',
      theme.$token('colors', error ? 'error' : 'primary'),
      $test(!disabled),
    ),
    trait.style_on_event(
      'focus',
      'boxShadow',
      theme.$token('shadows', 'shadowFocus'),
      $test(!disabled),
    ),

    // Hover state
    trait.style_on_event(
      'mouseenter',
      'borderColor',
      theme.$token('colors', error ? 'errorHover' : 'borderSecondary'),
      $test(!disabled && !readOnly),
    ),
    trait.style_on_event(
      'mouseleave',
      'borderColor',
      theme.$token('colors', error ? 'error' : 'borderPrimary'),
      $test(!disabled && !readOnly),
    ),

    // Attributes
    trait.attr('type', type),
    trait.attr('value', value),
    trait.attr('placeholder', placeholder || '', $test(placeholder !== undefined)),
    trait.attr('disabled', 'true', $test(disabled)),
    trait.attr('readonly', 'true', $test(readOnly)),
    trait.attr('required', 'true', $test(required)),

    // Event handlers
    trait.event(
      'input',
      (e: any) => {
        const target = e.target as HTMLInputElement;
        onInput?.(target.value);
      },
      $test(onInput !== undefined && !disabled && !readOnly),
    ),
    trait.event(
      'change',
      (e: any) => {
        const target = e.target as HTMLInputElement;
        onChange?.(target.value);
      },
      $test(onChange !== undefined && !disabled && !readOnly),
    ),
    trait.event('focus', onFocus || (() => {}), $test(onFocus !== undefined && !disabled)),
    trait.event('blur', onBlur || (() => {}), $test(onBlur !== undefined)),
  );

  return inputElement;
};
