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
  return tag.div(trait.html([tag.h1(title), tag.p(subtitle)]));
};
