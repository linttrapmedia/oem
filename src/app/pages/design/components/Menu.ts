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

const isCurrentPage = (page: keyof typeof PAGES) => {
  const currentPage = (new URLSearchParams(window.location.search).get('p') as keyof typeof PAGES) ?? 'colors';
  return page === currentPage;
};

export const Menu = () =>
  html('a')(
    ...Object.entries(PAGES).map(([k, { title }]) =>
      html(
        'a',
        ['style', 'color', Theme.Color('white', 0, isCurrentPage(k as keyof typeof PAGES) ? 1 : 0.4)],
        ['style', 'padding', '5px 0'],
        ['style', 'cursor', 'pointer'],
        ['style', 'display', 'block'],
        ['style_on_hover', 'color', Theme.Color('white')],
        ['attr', 'href', `${ROUTES.DESIGN}/?p=${k}`],
        ['style', 'textDecoration', 'none'],
      )(title),
    ),
  );
