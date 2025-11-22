import { tag, trait } from '../config';

export const Box = (direction: 'row' | 'column', gap: number, ...children: any[]) => {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('flexDirection', direction),
    trait.style('gap', `${gap}px`),
    trait.style('width', '100%'),
    ...children
  );
};
