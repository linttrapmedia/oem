import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

const html = Template.Html({
  attr: Trait.Attr,
  style: Trait.Style,
  style_on_hover: Trait.StyleOnHover,
});

const Text = (text: string, href: string, target: 'self' | 'blank' = 'self') => {
  console.log(text);
  return html(
    'a',
    ['attr', 'href', href],
    ['attr', 'target', target],
    [
      'style_on_hover',
      'borderBottom',
      `1px dashed ${Theme.Color('black')}`,
      `1px dashed ${Theme.Color('black', 0, 0.2)}`,
    ],
    ['style_on_hover', 'color', Theme.Color('black'), Theme.Color('black', 0, 0.5)],
    ['style', 'borderBottom', `1px dashed ${Theme.Color('black', 0, 0.2)}`],
    ['style', 'color', Theme.Color('black', 0, 0.5)],
    ['style', 'fontSize', '12px'],
    ['style', 'textDecoration', 'none'],
  )(text);
};

const Links = {
  text: Text,
};

export const link = <T extends keyof typeof Links>(type: T) => {
  return Links[type];
};
