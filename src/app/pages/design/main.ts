import { MPA } from '@core/modules/MPA';
import { Shell } from 'src/app/components/Layout/Shells';
import { ROUTES } from '../config';
import { Menu } from './components/Menu';
import { PAGES } from './config';

MPA({
  pages: PAGES,
  content: (page) =>
    Shell.Configurator({
      menu: Menu(),
      content: (page ? PAGES[page].page : PAGES.colors.page)(),
      selectors: [
        ['Design', ROUTES.DESIGN],
        ['Docs', ROUTES.DOCS],
      ],
    }),
});
