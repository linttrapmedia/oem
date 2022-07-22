import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

const html = Template.Html({
  style: Trait.Style,
  style_on_hover: Trait.StyleOnHover,
  attr: Trait.Attr,
});

const TextMenu = (
  title: string,
  alignment: 'left' | 'center' = 'left',
  ...links: [text: string, link: string, isSelected?: boolean][]
) =>
  html(
    'div',
    ['style', 'textAlign', 'left', () => alignment === 'left'],
    ['style', 'textAlign', 'center', () => alignment === 'center'],
  )(
    html(
      'div',
      ['style', 'fontFamily', 'sans-serif'],
      ['style', 'fontSize', '14px'],
      ['style', 'textTransform', 'uppercase'],
      ['style', 'fontWeight', 'bold'],
      ['style', 'letterSpacing', '1px'],
      ['style', 'margin', '20px 0'],
      ['style', 'color', Theme.Color('black', 0, 0.75)],
    )(title),
    ...links.map(([link, href, isSelected]) =>
      html(
        'a',
        ['style', 'backgroundColor', Theme.Color('black'), () => isSelected],
        ['style', 'backgroundColor', Theme.Color('transparent'), () => !isSelected],
        ['style', 'display', 'block'],
        ['style', 'padding', '5px 10px'],
        ['style', 'fontSize', '16px'],
        ['style', 'color', Theme.Color('white'), () => isSelected],
        ['style', 'color', Theme.Color('black', 0, 0.5), () => !isSelected],
        ['style', 'textDecoration', 'none'],
        ['style', 'fontFamily', 'sans-serif'],
        ['style', 'fontWeight', 'bold', () => isSelected ?? false],
        ['style', 'whiteSpace', 'nowrap'],
        ['style', 'borderRadius', '5px'],
        ['attr', 'href', href],
      )(link),
    ),
  );

const Menus = {
  text: TextMenu,
};

export const menu = <T extends keyof typeof Menus>(type: T) => {
  return Menus[type];
};
