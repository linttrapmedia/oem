import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { box } from 'src/app/components/Layout/Box';
import { menu } from 'src/app/components/Navigation/Menus';
import { ROUTES } from '../../config';
import { PAGES } from '../config';

const html = Template.Html({
  style: Trait.Style,
});

const section = box(['direction', 'row'], ['justify', 'flex-start']);
const link = (slug: keyof typeof PAGES) => `${ROUTES.DOCS}/?p=${slug}`;
const isCurrentPage = (page: keyof typeof PAGES) => {
  const currentPage = new URLSearchParams(window.location.search).get('p') as keyof typeof PAGES;
  return page === currentPage;
};

export const Menu = html('div')(
  section(
    menu('text')(
      'Start',
      'left',
      ['Overview', link('overview'), isCurrentPage('overview')],
      ['Concepts', link('concepts'), isCurrentPage('concepts')],
      ['Example', link('example'), isCurrentPage('example')],
    ),
  ),
  section(
    menu('text')(
      'Learn',
      'left',
      ['Templating', link('templating'), isCurrentPage('templating')],
      ['Traits', link('traits'), isCurrentPage('traits')],
      ['State', link('stateManagement'), isCurrentPage('stateManagement')],
    ),
  ),
  section(
    menu('text')(
      'Code',
      'left',
      ['Styling', link('styling'), isCurrentPage('styling')],
      ['Design System', link('designSystem'), isCurrentPage('designSystem')],
      ['Workflow', link('workflow'), isCurrentPage('workflow')],
    ),
  ),
  section(
    menu('text')(
      'Help',
      'left',
      ['FAQs', link('faqs'), isCurrentPage('faqs')],
      ['Contributing', link('contributing'), isCurrentPage('contributing')],
    ),
  ),
);
