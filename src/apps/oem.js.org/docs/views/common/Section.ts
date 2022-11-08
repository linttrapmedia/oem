import { Template } from '@core/framework/Template';
import { color, tags } from '../../../config';
const { div, a, section } = tags;

type SectionProps = {
  description?: string;
  title?: string;
  subtitle?: string;
  content?: HTMLElement | DocumentFragment | string;
};

export const Section = ({ title, subtitle, content }: SectionProps) =>
  section(['flex', 'column', 20], ['style', 'width', '100%'])(
    title &&
      a(
        ['attr', 'href', `#${title}`],
        ['attr', 'id', title],
        ['style', 'fontSize', '24px'],
        ['style', 'color', color('black')],
        ['style', 'textDecoration', 'none'],
      )(Template.Markdown(title, { styles: 'p {margin:0;}' })),
    subtitle &&
      div(
        ['style', 'color', color('black', 0.5)],
        ['style', 'fontSize', '16px'],
        ['style', 'fontStyle', 'oblique'],
      )(Template.Markdown(subtitle, { styles: 'p {margin:0;}' })),
    content &&
      div(
        ['style', 'color', color('black', 0.6)],
        ['style', 'fontSize', '16px'],
        ['style', 'position', 'relative'],
        ['style', 'width', '100%'],
      )(content),
  );
