import { tag, trait } from '../config';

export const Section = (props: {
  title: string;
  subtitle?: string;
  content: HTMLElement[] | HTMLElement | string;
  level?: 1 | 2 | 3;
}) => {
  const title =
    props.level === 1
      ? tag.h2(
          trait.style('textTransform', 'uppercase'),
          trait.style('display', 'flex'),
          trait.style('flexDirection', 'row'),
          trait.style('gap', '10px'),
          props.title,
          tag.a(
            trait.style('fontSize', '14px'),
            trait.style('textDecoration', 'none'),
            trait.style('border', '1px solid #a4a4a4ff'),
            trait.style('padding', '2px 6px'),
            trait.style('borderRadius', '4px'),
            trait.attr('href', `#`),
            '¶',
          ),
        )
      : props.level === 2
      ? tag.h3(props.title)
      : tag.h4(props.title);

  return tag.div(
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('gap', '5px'),
    trait.attr(
      'id',
      props.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    ),
    trait.html([
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', '10px'),
        title,
      ),
      props.subtitle ? tag.p(trait.style('marginBottom', '10px'), props.subtitle) : '',
      tag.div(
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('gap', '20px'),
        ...(Array.isArray(props.content) ? props.content : [props.content]),
      ),
    ]),
  );
};
