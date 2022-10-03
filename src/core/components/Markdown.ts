import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

type MarkdownProps = {
  text: Types.Atom<string>;
};

export const Markdown = ({ text }: MarkdownProps) => {
  const html = Template.Html({
    style: Trait.Style,
    on_text_update: Trait.Atom(text, Trait.InnerHtml),
  });

  return html(
    'div',
    ['style', 'width', '100%'],
    ['style', 'height', '100%'],
    ['style', 'outline', '0'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'padding', '50px'],
    ['on_text_update', () => Template.Markdown(text.get())],
  )(Template.Markdown(text.get()));
};
