import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type ToggleSize = 'sm' | 'md' | 'lg';
type ColorToken = keyof DesignTokens['colors'];

type ToggleProps = {
  checked?: boolean;
  size?: ToggleSize;
  color?: ColorToken;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
};

const sizeConfig: Record<
  ToggleSize,
  { width: string; height: string; thumbSize: string; thumbOffset: string }
> = {
  sm: { width: '32px', height: '18px', thumbSize: '14px', thumbOffset: '16px' },
  md: { width: '44px', height: '24px', thumbSize: '20px', thumbOffset: '22px' },
  lg: { width: '56px', height: '32px', thumbSize: '28px', thumbOffset: '28px' },
};

export const toggle = (props: ToggleProps) => {
  const { checked = false, size = 'md', color = 'primary', disabled = false, label, onChange } = props;

  const config = sizeConfig[size];

  // Hidden checkbox input for accessibility
  const inputElement = tag.input(
    trait.attr('type', 'checkbox'),
    trait.attr('checked', 'true', $test(checked)),
    trait.attr('disabled', 'true', $test(disabled)),
    trait.style('position', 'absolute'),
    trait.style('opacity', '0'),
    trait.style('width', '0'),
    trait.style('height', '0'),

    // Change event
    trait.event(
      'change',
      (e: Event) => {
        const target = e.target as HTMLInputElement;
        onChange?.(target.checked);
      },
      $test(onChange !== undefined && !disabled),
    ),
  );

  // Toggle track
  const trackElement = tag.div(
    trait.style('position', 'relative'),
    trait.style('width', config.width),
    trait.style('height', config.height),
    trait.style('borderRadius', '9999px'),
    trait.style('transition', 'all 0.2s ease-in-out'),
    trait.style('cursor', 'pointer', $test(!disabled)),
    trait.style('cursor', 'not-allowed', $test(disabled)),

    // Background color
    trait.style('backgroundColor', theme.$token('colors', color), $test(checked && !disabled)),
    trait.style('backgroundColor', theme.$token('colors', 'bgSecondary'), $test(!checked && !disabled)),
    trait.style('backgroundColor', theme.$token('colors', 'bgDisabled'), $test(disabled)),

    // Opacity
    trait.style('opacity', '0.6', $test(disabled)),

    // Thumb
    tag.div(
      trait.style('position', 'absolute'),
      trait.style('top', '50%'),
      trait.style('left', '2px'),
      trait.style('transform', 'translateY(-50%)', $test(!checked)),
      trait.style(
        'transform',
        `translateX(${config.thumbOffset}) translateY(-50%)`,
        $test(checked),
      ),
      trait.style('width', config.thumbSize),
      trait.style('height', config.thumbSize),
      trait.style('borderRadius', '50%'),
      trait.style('backgroundColor', 'white'),
      trait.style('boxShadow', theme.$token('shadows', 'shadowButton')),
      trait.style('transition', 'all 0.2s ease-in-out'),
    ),

    inputElement,
  );

  // If no label, return just the toggle
  if (!label) {
    return trackElement;
  }

  // Wrapper with label
  return tag.label(
    trait.style('display', 'inline-flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', theme.$token('spacing', 'sm')),
    trait.style('cursor', 'pointer', $test(!disabled)),
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', theme.$token('typography', 'fontSizeBase')),
    trait.style('color', theme.$token('colors', 'textPrimary'), $test(!disabled)),
    trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),
    trait.style('opacity', '0.6', $test(disabled)),

    trackElement,
    tag.span(trait.text(label)),
  );
};
