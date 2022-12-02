import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Types } from '@core/framework/types';

type TextAreaProps = {
  color?: string;
  text: Types.Atom<string>;
  placeholder?: string;
};

export const TextArea = ({ color, text, placeholder }: TextAreaProps) => {
  const reset = State.Atom<boolean>(false);
  const placeholderTxt = placeholder ?? '...Start typing';
  text.sub(() => (text.get() === '' ? reset.set(!reset.get()) : null));

  const { div } = Template.Html({
    style: Trait.Style,
    attr: Trait.Attr,
    on_text_change: Trait.OnTextContentInput,
    style_on_text_change: Trait.State(text, Trait.Style),
    text_on_reset_change: Trait.State(reset, Trait.InnerText),
  });

  return div(
    ['style', 'position', 'relative'],
    ['style', 'display', 'block'],
    ['style', 'alignItems', 'flex-start'],
    ['style', 'justifyContent', 'flex-start'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'height', '100%'],
    ['style', 'width', '100%'],
    ['style', 'overflowY', 'auto'],
    ['style', 'fontSize', '16px'],
    ['style', 'fontFamily', 'sans-serif'],
  )(
    div(
      ['style', 'border', '0'],
      ['style', 'whiteSpace', 'pre-wrap'],
      ['style', 'outline', 'none'],
      ['attr', 'contentEditable', 'true'],
      ['on_text_change', text.set],
      ['style', 'position', 'absolute'],
      ['style', 'top', '0'],
      ['style', 'width', '100%'],
      ['style', 'height', '100%'],
      ['style', 'boxSizing', 'border-box'],
      ['text_on_reset_change', text.get],
    )(text.get()),
    div(
      ['style', 'opacity', 0.3],
      ['style', 'position', 'absolute'],
      ['style', 'fontStyle', 'oblique'],
      ['style', 'display', 'block', text.get().length === 0],
      ['style', 'display', 'none', text.get().length > 1],
      ['style_on_text_change', 'display', () => (text.get().length === 0 ? 'flex' : 'none')],
      ['style', 'alignItems', 'flex-start'],
      ['style', 'justifyContent', 'flex-start'],
      ['style', 'pointerEvents', 'none'],
      ['style', 'color', color ?? 'inherit'],
    )(placeholderTxt),
  );
};
