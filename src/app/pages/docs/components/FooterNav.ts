import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { ROUTES } from '../../config';
import { PAGES } from '../config';

const html = Template.Html({
  style: Trait.Style,
  style_on_hover: Trait.StyleOnHover,
  attr: Trait.Attr,
});

type FooterNavProps = {
  prev?: keyof typeof PAGES;
  next?: keyof typeof PAGES;
  nextText?: string;
  prevText?: string;
};

export const FooterNav = ({ prev = null, next = null, nextText = null, prevText = null }: FooterNavProps) =>
  html(
    'div',
    ['style', 'borderTop', `5px solid ${Theme.Color('black', 0, 0.1)}`],
    ['style', 'textAlign', 'center'],
    ['style', 'display', 'flex'],
    ['style', 'justifyContent', 'center'],
    ['style', 'alignItems', 'center'],
  )(
    prev
      ? html(
          'a',
          ['attr', 'href', `${ROUTES.DOCS}/?p=${prev}`],
          ['style_on_hover', 'color', Theme.Color('black', 0, 0.25), Theme.Color('black', 0, 0.5)],
          ['style', 'color', Theme.Color('black', 0, 0.5)],
          ['style', 'fontSize', '12px'],
          ['style', 'padding', '20px'],
          ['style', 'textDecoration', 'none'],
          ['style', 'transition', '0.25s'],
        )(`← `, prevText)
      : html('div')(),
    prev && next && html('span', ['style', 'color', Theme.Color('black', 0, 0.25)])(' | '),
    next
      ? html(
          'a',
          ['attr', 'href', `${ROUTES.DOCS}/?p=${next}`],
          ['style_on_hover', 'color', Theme.Color('black', 0, 0.25), Theme.Color('black', 0, 0.5)],
          ['style', 'color', Theme.Color('black', 0, 0.5)],
          ['style', 'fontSize', '16px'],
          ['style', 'padding', '20px'],
          ['style', 'textDecoration', 'none'],
          ['style', 'transition', '0.25s'],
        )(nextText, ` → `)
      : html('div')(),
  );
