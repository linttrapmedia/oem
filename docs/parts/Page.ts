import pkg from '../../package.json';
import { tag, trait } from '../config';

export const Page = (...children: any[]) => {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('gap', '30px'),
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
  );
};
