import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';

type CheckboxSize = 'sm' | 'md' | 'lg';

type CheckboxProps = {
  checked?: boolean;
  size?: CheckboxSize;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
};

const sizeConfig: Record<CheckboxSize, { size: string; fontSize: string }> = {
  sm: { size: '16px', fontSize: '12px' },
  md: { size: '20px', fontSize: '14px' },
  lg: { size: '24px', fontSize: '16px' },
};

export const checkbox = (props: CheckboxProps) => {
  const { checked = false, size = 'md', disabled = false, label, onChange } = props;

  const config = sizeConfig[size];

  // Checkbox input element
  const inputElement = tag.input(
    trait.attr('type', 'checkbox'),
    trait.attr('checked', 'true', $test(checked)),
    trait.attr('disabled', 'true', $test(disabled)),

    trait.style('width', config.size),
    trait.style('height', config.size),
    trait.style('margin', '0'),
    trait.style('cursor', 'pointer', $test(!disabled)),
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('accentColor', theme.$token('colors', 'primary')),

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

  // If no label, return just the input
  if (!label) {
    return inputElement;
  }

  // Wrapper with label
  return tag.label(
    trait.style('display', 'inline-flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', theme.$token('spacing', 'sm')),
    trait.style('cursor', 'pointer', $test(!disabled)),
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', config.fontSize),
    trait.style('color', theme.$token('colors', 'textPrimary'), $test(!disabled)),
    trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),
    trait.style('opacity', '0.6', $test(disabled)),

    inputElement,
    tag.span(trait.text(label)),
  );
};
