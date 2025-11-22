import { tag, trait } from '../config';

export const Code = (code: string, language: string = 'typescript') => {
  return tag.pre(trait.prism(language), code.trim());
};

export const InlineCode = (text: string) => {
  return tag.code(
    trait.style('backgroundColor', '#858585'),
    trait.style('color', '#d4d4d4'),
    trait.style('padding', '2px 6px'),
    trait.style('borderRadius', '3px'),
    trait.style('fontSize', '12px'),
    text,
  );
};
