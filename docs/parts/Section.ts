import { tag, trait } from '../config';

export const Section = (props: {
  title: string;
  subtitle?: string;
  content: any;
  type?: 'main' | 'sub';
}) => {
  return tag.div(
    trait.attr(
      'id',
      props.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    ),
    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', '10px'),
      props.type === 'main' ? tag.h2(props.title) : tag.h3(props.title),
      tag.a(
        trait.style('fontSize', '14px'),
        trait.style('textDecoration', 'none'),
        trait.style('border', '1px solid #a4a4a4ff'),
        trait.style('padding', '2px 6px'),
        trait.style('borderRadius', '4px'),
        trait.attr('href', `#`),
        '¶',
      ),
    ),
    props.subtitle ? tag.p(props.subtitle) : '',
    props.content,
  );
};
