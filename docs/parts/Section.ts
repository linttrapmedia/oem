import { tag, trait } from '../config';

export const Section = (props: { title: string; subtitle?: string; content: any }) => {
  return tag.div(
    trait.html([tag.h2(props.title), props.subtitle && tag.p(props.subtitle), props.content]),
  );
};
