import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type SpacingToken = keyof DesignTokens['spacing'];

type SpacerProps = {
  size?: SpacingToken;
  axis?: 'horizontal' | 'vertical' | 'both';
};

export const spacer = (props: SpacerProps) => {
  const { size = 'md', axis = 'vertical' } = props;

  const element = tag.div(
    // Base styles
    trait.style('flexShrink', '0'),

    // Vertical spacing (default)
    trait.style('width', '100%', $test(axis === 'vertical')),
    trait.style('height', theme.$token('spacing', size), $test(axis === 'vertical')),

    // Horizontal spacing
    trait.style('width', theme.$token('spacing', size), $test(axis === 'horizontal')),
    trait.style('height', '100%', $test(axis === 'horizontal')),

    // Both directions
    trait.style('width', theme.$token('spacing', size), $test(axis === 'both')),
    trait.style('height', theme.$token('spacing', size), $test(axis === 'both')),
  );

  return element;
};
