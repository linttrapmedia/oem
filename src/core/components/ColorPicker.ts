import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/theme';
import { Trait } from '@core/framework/Trait';

type ColorPickerProps = {
  color: Types.Atom<string>;
  size?: number;
};

export const ColorPicker = (props: ColorPickerProps) => {
  const id = Math.random().toString(36).substring(2, 15);

  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
    style_on_hover: Trait.StyleOnHover,
    style_on_color_change: Trait.Atom(props.color, Trait.Style),
    on_color_input: Trait.OnColorInput,
  });

  const pickerSize = `${props.size ?? 20}px`;

  return (label: string) =>
    html(
      'div',
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'row'],
      ['style', 'justifyContent', 'center'],
      ['style', 'alignItems', 'center'],
      ['style', 'marginRight', pickerSize],
    )(
      html(
        'div',
        ['style', 'fontFamily', Theme().font('Primary')],
        ['style', 'fontSize', '11px'],
        ['style', 'textTransform', 'uppercase'],
        ['style', 'color', Theme().color('white')],
        ['style', 'marginRight', '15px'],
      )(label),
      html(
        'label',
        ['attr', 'for', id.toString()],
        ['style_on_color_change', 'backgroundColor', props.color.get],
        ['style', 'backgroundColor', props.color.get()],
        ['style', 'border', `1px solid ${Theme().color('white', 0, 0.5)}`],
        ['style', 'color', Theme().color('white')],
        ['style', 'cursor', 'pointer'],
        ['style', 'height', pickerSize],
        ['style', 'width', pickerSize],
      )(
        html(
          'input',
          ['attr', 'id', id.toString()],
          ['attr', 'type', 'color'],
          ['on_color_input', props.color.set],
          ['style', 'visibility', 'hidden'],
          ['style', 'width', '0px'],
          ['style', 'border', 'none'],
        )(),
      ),
    );
};
