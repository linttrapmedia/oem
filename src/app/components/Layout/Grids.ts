import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

type AutoProp = [number, number];

type AutoProps = {
  columns: AutoProp[];
  styles?: Types.CssDeclaration[];
};

export const Auto = ({ columns = [[1, 0]], styles = [] }: AutoProps) => {
  const html = Template.Html({
    style: Trait.Style,
    style_on_resize: Trait.StyleOnResize,
    styles: Trait.Styles,
  });

  const calcColumnStyle = (box: { height: number; width: number }) =>
    `repeat(${columns.filter(([_, w]) => w <= box.width).pop()[0]}, minmax(0, 1fr))`;

  return (...children: Types.HtmlChild[]) =>
    html(
      'div',
      ['style', 'display', 'grid'],
      ['style', 'width', '100%'],
      ['style_on_resize', 'gridTemplateColumns', calcColumnStyle],
      ['styles', styles],
    )(...children);
};

export const Grid = {
  Auto,
};
