import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type SpacingToken = keyof DesignTokens['spacing'];
type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyItems = 'start' | 'center' | 'end' | 'stretch';

type GridProps = {
  columns?: number | string;
  rows?: number | string;
  gap?: SpacingToken;
  columnGap?: SpacingToken;
  rowGap?: SpacingToken;
  alignItems?: AlignItems;
  justifyItems?: JustifyItems;
  fullWidth?: boolean;
  children?: HTMLElement[];
};

export const grid = (props: GridProps) => {
  const {
    columns,
    rows,
    gap,
    columnGap,
    rowGap,
    alignItems = 'stretch',
    justifyItems = 'stretch',
    fullWidth = false,
    children = [],
  } = props;

  const element = tag.div(
    // Base styles
    trait.style('display', 'grid'),

    // Columns
    trait.style(
      'gridTemplateColumns',
      typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns!,
      $test(columns !== undefined),
    ),

    // Rows
    trait.style(
      'gridTemplateRows',
      typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows!,
      $test(rows !== undefined),
    ),

    // Gap
    trait.style('gap', theme.$token('spacing', gap!), $test(gap !== undefined)),
    trait.style('columnGap', theme.$token('spacing', columnGap!), $test(columnGap !== undefined && gap === undefined)),
    trait.style('rowGap', theme.$token('spacing', rowGap!), $test(rowGap !== undefined && gap === undefined)),

    // Alignment
    trait.style('alignItems', alignItems),
    trait.style('justifyItems', justifyItems),

    // Width
    trait.style('width', '100%', $test(fullWidth)),
    trait.style('width', 'auto', $test(!fullWidth)),

    // Children
    ...children,
  );

  return element;
};
