import pkg from '../../package.json';
import { tag, theme, trait } from '../config';

export const Page = (...children: any[]) => {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('gap', '50px'),
    trait.style('maxWidth', '900px'),
    trait.style('margin', '0 auto'),
    trait.style('width', '100%'),
    ...children,
  );
};

Page.Header = (title: string, subtitle: string) => {
  return tag.div(
    trait.style('position', 'relative'),
    tag.h1(
      trait.style('fontFamily', 'Splash'),
      trait.style('fontSize', '64px'),
      trait.style('fontWeight', 'normal'),
      title,
      tag.small(
        trait.style('fontSize', '10px'),
        trait.style('fontFamily', 'Arial, sans-serif'),
        trait.style('top', '20px'),
        trait.style('position', 'absolute'),
        trait.style('marginLeft', '10px'),
        trait.style('opacity', '0.4'),
        pkg.version,
      ),
    ),
    tag.p(subtitle),
    tag.button(
      trait.style('backgroundColor', () => 'grey', theme.$test('ada'), theme),
      trait.style('backgroundColor', () => 'black', theme.$test('grey'), theme),
      trait.style('position', 'absolute'),
      trait.style('top', '0'),
      trait.style('right', 0),
      trait.style('color', 'white'),
      trait.style('border', 'none'),
      trait.style('borderRadius', '2px'),
      trait.style('padding', '5px 10px'),
      trait.style('cursor', 'pointer'),
      trait.style('fontSize', '12px'),
      trait.event('click', () => {
        if (theme.val() === 'ada') {
          theme.set('grey');
          document.documentElement.classList.remove('prism-ada');
          document.documentElement.classList.add('prism');
        } else {
          document.documentElement.classList.remove('prism');
          document.documentElement.classList.add('prism-ada');
          theme.set('ada');
        }
      }),
      trait.html('ADA Theme', theme.$test('grey')),
      trait.html('Switch to basic theme', theme.$test('ada')),
    ),
  );
};
