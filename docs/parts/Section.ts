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
    trait.html([
      props.type === 'main' ? tag.h2(props.title) : tag.h3(props.title),
      props.subtitle && tag.p(props.subtitle),
      props.content,
    ]),
  );
};
