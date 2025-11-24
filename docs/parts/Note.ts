import { tag, theme, trait } from 'docs/config';

export function Note(text: string) {
  return tag.div(
    trait.style('backgroundColor', 'rgba(255, 255, 255, 0.5)', theme.$test('grey')),
    trait.style('backgroundColor', 'rgba(0, 0, 0, 0.1)', theme.$test('ada')),
    trait.style('padding', '10px'),
    trait.style('padding', '5px 10px'),
    trait.style('fontSize', '0.9rem', theme.$test('grey')),
    trait.style('fontSize', '1rem', theme.$test('ada')),
    trait.style('borderRadius', '4px'),
    trait.style('lineHeight', '1.4'),
    text,
  );
}
