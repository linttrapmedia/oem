import { tag, theme, trait } from '../config';

export const Code = (code: string, language: string = 'typescript') => {
  return tag.pre(trait.prism(language), code.trim());
};

export const InlineCode = (text: string) => {
  return tag.code(
    trait.style('backgroundColor', '#858585', theme.$test('grey')),
    trait.style('backgroundColor', '#e0e0e0', theme.$test('ada')),
    trait.style('color', '#d4d4d4', theme.$test('grey')),
    trait.style('color', 'black', theme.$test('ada')),
    trait.style('padding', '2px 6px'),
    trait.style('borderRadius', '3px'),
    trait.style('fontSize', '12px'),
    text,
  );
};
