import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type SpacingToken = keyof DesignTokens['spacing'];
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type JustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type StackProps = {
  spacing?: SpacingToken;
  align?: AlignItems;
  justify?: JustifyContent;
  wrap?: boolean;
  fullWidth?: boolean;
  children?: HTMLElement[];
};

export const stack = (props: StackProps) => {
  const {
    spacing = 'md',
    align = 'stretch',
    justify = 'flex-start',
    wrap = false,
    fullWidth = false,
    children = [],
  } = props;

  const element = tag.div(
    // Flexbox
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('alignItems', align),
    trait.style('justifyContent', justify),

    // Wrap
    trait.style('flexWrap', 'wrap', $test(wrap)),
    trait.style('flexWrap', 'nowrap', $test(!wrap)),

    // Width
    trait.style('width', '100%', $test(fullWidth)),
    trait.style('width', 'auto', $test(!fullWidth)),

    // Gap for spacing between children
    trait.style('gap', theme.$token('spacing', spacing)),

    // Children
    ...children,
  );

  return element;
};
